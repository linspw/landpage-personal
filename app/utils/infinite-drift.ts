import {
  CanvasTexture,
  LinearFilter,
  Mesh,
  OrthographicCamera,
  PlaneGeometry,
  Scene,
  ShaderMaterial,
  SRGBColorSpace,
  Vector2,
  WebGLRenderer,
} from 'three'

export interface InfiniteDriftBand {
  images: readonly string[]
  speed?: number
  rotation?: number
  rotationType?: 'fromLeft' | 'fromCenter'
  offsetY?: number
  curveAmount?: number
  curveDirection?: 1 | -1
}

interface DriftTextureOptions {
  gap: number
  imageHeight: number
  imageRadius: number
}

// Curvature and tilt adapted from SonoJS Infinite Drift (MIT).
// Source: https://github.com/MiladJoodi/SonoJS/tree/56df23ee8df4c984349f1f65ebde5798b0581e1a/packages/ui/src/components/3d/infinite-drift
// The license is in app/components/effects/infinite-drift.LICENSE.
const vertexShader = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position.xy, 0.0, 1.0);
  }
`

const fragmentShader = /* glsl */ `
  varying vec2 vUv;
  uniform vec2 uSize;
  uniform sampler2D uStrip;
  uniform float uLength;
  uniform float uHeight;
  uniform float uScale;
  uniform float uCenterY;
  uniform float uAngle;
  uniform float uPivot;
  uniform float uCurve;
  uniform float uPhase;

  void main() {
    vec2 point = vUv * uSize;
    float distanceFromCenter = 2.0 * vUv.x - 1.0;
    float curve = (0.5 - distanceFromCenter * distanceFromCenter) * uCurve;
    vec2 pivot = vec2(uSize.x * uPivot, uCenterY);
    float c = cos(uAngle);
    float s = sin(uAngle);
    point = mat2(c, -s, s, c) * (point - pivot) + pivot;

    float bandY = (point.y - uCenterY - curve) / (uHeight * uScale) + 0.5;
    if (bandY < 0.0 || bandY > 1.0) discard;

    float stripX = mod(point.x / uScale + uPhase, uLength) / uLength;
    vec4 sampleColor = texture2D(uStrip, vec2(stripX, bandY));
    if (sampleColor.a < 0.025) discard;

    gl_FragColor = sampleColor;
    #include <colorspace_fragment>
  }
`

function loadImage(source: string, signal: AbortSignal) {
  return new Promise<HTMLImageElement | null>((resolve) => {
    if (signal.aborted) {
      resolve(null)
      return
    }

    const image = new Image()
    const finish = (result: HTMLImageElement | null) => {
      signal.removeEventListener('abort', abort)
      image.onload = null
      image.onerror = null
      resolve(result)
    }
    const abort = () => finish(null)

    signal.addEventListener('abort', abort, { once: true })
    image.crossOrigin = 'anonymous'
    image.onload = () => finish(image)
    image.onerror = abort
    image.src = source
  })
}

function createStrip(
  images: HTMLImageElement[],
  { imageHeight, gap, imageRadius }: DriftTextureOptions,
  maxTextureSize: number,
) {
  const tileWidths = images.map((image) =>
    Math.min(
      imageHeight * 2.5,
      Math.max(1, (imageHeight * image.naturalWidth) / image.naturalHeight),
    ),
  )
  const length = tileWidths.reduce((sum, width) => sum + width + gap, 0)
  const ratio = Math.min(2, maxTextureSize / Math.max(length, imageHeight))
  const atlas = document.createElement('canvas')
  atlas.width = Math.max(1, Math.round(length * ratio))
  atlas.height = Math.max(1, Math.round(imageHeight * ratio))

  const context = atlas.getContext('2d')
  if (!context) return null

  context.scale(atlas.width / length, atlas.height / imageHeight)
  context.imageSmoothingQuality = 'high'

  let left = gap / 2
  for (const [index, image] of images.entries()) {
    const width = tileWidths[index]!
    const ratio = image.naturalWidth / image.naturalHeight
    const height = Math.min(imageHeight, width / ratio)
    const top = (imageHeight - height) / 2

    context.save()
    context.beginPath()
    context.roundRect(
      left,
      top,
      width,
      height,
      Math.min(imageRadius, width / 2, height / 2),
    )
    context.clip()
    context.drawImage(image, left, top, width, height)
    context.restore()
    left += width + gap
  }

  const texture = new CanvasTexture(atlas)
  texture.colorSpace = SRGBColorSpace
  texture.minFilter = LinearFilter
  texture.magFilter = LinearFilter
  texture.generateMipmaps = false
  return { texture, length }
}

interface DriftRenderer {
  draw: (width: number, height: number, offset: number) => void
  dispose: () => void
}

interface DriftStrip {
  band: InfiniteDriftBand
  index: number
  texture: CanvasTexture
  length: number
  material: ShaderMaterial
  uniforms: {
    uSize: { value: Vector2 }
    uScale: { value: number }
    uCenterY: { value: number }
    uAngle: { value: number }
    uCurve: { value: number }
    uPhase: { value: number }
  }
}

export async function createDriftRenderer(
  canvas: HTMLCanvasElement,
  bands: readonly InfiniteDriftBand[],
  options: DriftTextureOptions,
  signal: AbortSignal,
): Promise<DriftRenderer | null> {
  if (signal.aborted || !bands.length) return null

  let renderer: WebGLRenderer
  try {
    const context = canvas.getContext('webgl2', {
      alpha: true,
      antialias: false,
    })
    if (!context) return null
    renderer = new WebGLRenderer({
      canvas,
      context,
      alpha: true,
      antialias: false,
    })
  } catch {
    return null
  }

  renderer.setClearColor(0x000000, 0)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5))

  const scene = new Scene()
  const camera = new OrthographicCamera(-1, 1, 1, -1, 0, 2)
  camera.position.z = 1
  const geometry = new PlaneGeometry(2, 2)
  const sources = new Map<string, Promise<HTMLImageElement | null>>()
  const strips: DriftStrip[] = []
  for (const band of bands) {
    for (const source of band.images) {
      if (!sources.has(source)) sources.set(source, loadImage(source, signal))
    }
  }

  const dispose = () => {
    for (const strip of strips) {
      strip.texture.dispose()
      strip.material.dispose()
    }
    geometry.dispose()
    renderer.dispose()
  }

  try {
    for (const [index, band] of bands.entries()) {
      const images = (
        await Promise.all(band.images.map((source) => sources.get(source)))
      ).filter((image): image is HTMLImageElement => Boolean(image))

      if (signal.aborted || !images.length) {
        dispose()
        return null
      }

      const strip = createStrip(
        images,
        options,
        renderer.capabilities.maxTextureSize,
      )
      if (!strip) {
        dispose()
        return null
      }

      const uniforms = {
        uSize: { value: new Vector2() },
        uStrip: { value: strip.texture },
        uLength: { value: strip.length },
        uHeight: { value: options.imageHeight },
        uScale: { value: 1 },
        uCenterY: { value: 0 },
        uAngle: { value: 0 },
        uPivot: { value: band.rotationType === 'fromLeft' ? 0 : 0.5 },
        uCurve: { value: 0 },
        uPhase: { value: 0 },
      }

      const material = new ShaderMaterial({
        uniforms,
        vertexShader,
        fragmentShader,
        transparent: true,
        depthTest: false,
        depthWrite: false,
      })
      const mesh = new Mesh(geometry, material)
      mesh.frustumCulled = false
      mesh.renderOrder = index
      scene.add(mesh)
      strips.push({ ...strip, band, index, material, uniforms })
    }
  } catch {
    dispose()
    return null
  }

  let lastWidth = 0
  let lastHeight = 0
  return {
    draw(width, height, offset) {
      if (width <= 0 || height <= 0) return

      const laneSpacing = height / strips.length
      const scale = Math.min(
        1,
        Math.max(0.56, width / 760),
        laneSpacing / (options.imageHeight + 22),
      )

      if (lastWidth !== width || lastHeight !== height) {
        renderer.setSize(width, height, false)
        lastWidth = width
        lastHeight = height

        for (const { uniforms, band, index } of strips) {
          const autoOffset = ((strips.length - 1) / 2 - index) * laneSpacing
          const bandOffset =
            band.offsetY === undefined
              ? autoOffset
              : (band.offsetY * height) / 760
          uniforms.uSize.value.set(width, height)
          uniforms.uScale.value = scale
          uniforms.uCenterY.value = height / 2 + bandOffset
          // Fade the tilt in at narrow widths to leave room for the end tiles.
          uniforms.uAngle.value =
            (((band.rotation ?? 0) * Math.PI) / 180) * Math.min(1, width / 760)
          uniforms.uCurve.value =
            (band.curveAmount ?? 36) * (band.curveDirection ?? 1) * scale
        }
      }

      for (const { uniforms, band, index, length } of strips) {
        uniforms.uPhase.value =
          (offset * (band.speed ?? 1) + index * 52) % length
      }
      renderer.render(scene, camera)
    },
    dispose,
  }
}
