import {
  BufferAttribute,
  BufferGeometry,
  Color,
  PerspectiveCamera,
  Points,
  Scene,
  ShaderMaterial,
  WebGLRenderer,
} from 'three'

export interface ScrollLandscapeRenderer {
  draw: (width: number, height: number, progress: number, elapsed: number) => void
  dispose: () => void
}

const vertexShader = /* glsl */ `
  attribute vec3 aTerrain;
  attribute float aSeed;
  attribute float aRock;
  attribute float aFeather;
  uniform float uMorph;
  uniform float uTime;
  uniform float uPixelRatio;
  varying float vLight;
  varying float vOpacity;

  void main() {
    float orbit = uTime * 0.25;
    vec3 sphere = position;
    sphere.xz = mat2(cos(orbit), -sin(orbit), sin(orbit), cos(orbit)) * sphere.xz;
    float pulse = sin(sphere.y * 4.2 + sphere.x - uTime * 1.65);
    sphere *= 1.0 + pulse * 0.055;

    float arc = sin(uMorph * 3.14159265);
    vec3 point = mix(sphere, aTerrain, uMorph);
    float wave = sin(dot(point.xz, vec2(1.65, 1.25)) - uTime * 1.55);
    point.y += arc * 0.35 + wave * mix(0.025, 0.11, max(arc, uMorph));

    vec4 viewPosition = modelViewMatrix * vec4(point, 1.0);
    gl_Position = projectionMatrix * viewPosition;
    gl_PointSize = uPixelRatio * (1.32 + aSeed * 0.97) * clamp(5.8 / -viewPosition.z, 0.68, 1.45);

    float shell = clamp(0.47 + sphere.x * 0.22 - sphere.y * 0.18 - sphere.z * 0.1 + pulse * 0.12, 0.0, 1.0);
    vLight = mix(shell, aRock + wave * 0.06, uMorph);
    vOpacity = mix(0.32 + aSeed * 0.58, (0.6 + aSeed * 0.3) * aFeather, uMorph);
  }
`

const fragmentShader = /* glsl */ `
  uniform vec3 uDeep;
  uniform vec3 uSnow;
  varying float vLight;
  varying float vOpacity;

  void main() {
    float distanceFromCenter = length(gl_PointCoord - 0.5);
    float edge = 1.0 - smoothstep(0.19, 0.5, distanceFromCenter);
    gl_FragColor = vec4(mix(uDeep, uSnow, vLight), edge * vOpacity);
    #include <colorspace_fragment>
  }
`

const peaks = [
  { x: -1.38, z: 0.1, height: 1.24, width: 1.12, depth: 0.95 },
  { x: -0.46, z: -0.42, height: 1.91, width: 1.18, depth: 1.24 },
  { x: 0.3, z: -0.67, height: 2.16, width: 1.18, depth: 1.13 },
  { x: 1.37, z: -0.18, height: 1.53, width: 1.05, depth: 1.04 },
  { x: 0.86, z: 0.42, height: 0.99, width: 0.95, depth: 0.91 },
]

function terrainHeight(x: number, z: number) {
  let summit = 0
  for (const peak of peaks) {
    const dx = (x - peak.x) / peak.width
    const dz = (z - peak.z) / peak.depth
    const distance = Math.hypot(dx, dz)
    const ridge = 1 + 0.12 * Math.sin(Math.atan2(dz, dx) * 5 + peak.z * 6)
    summit = Math.max(summit, peak.height * Math.max(0, 1 - distance * ridge) ** 1.12)
  }

  const stone = Math.sin(x * 14 + z * 8) * Math.cos(z * 17 - x * 3)
  const folds = Math.sin(x * 5 - z * 9) * Math.cos(z * 6 + x * 2)
  return summit + (stone * 0.048 + folds * 0.085) * Math.min(1, summit + 0.35)
}

function landscapeGeometry(columns: number, rows: number) {
  const count = columns * rows
  const sphere = new Float32Array(count * 3)
  const terrain = new Float32Array(count * 3)
  const seed = new Float32Array(count)
  const rock = new Float32Array(count)
  const feather = new Float32Array(count)
  let state = 13613
  function random() {
    state = (Math.imul(state, 1664525) + 1013904223) >>> 0
    return state / 4294967296
  }

  for (let index = 0; index < count; index++) {
    const column = index % columns
    const row = Math.floor(index / columns)
    const u = (column + (random() - 0.5) * 0.62) / (columns - 1)
    const v = (row + (random() - 0.5) * 0.62) / (rows - 1)
    const latitude = 1 - 2 * (row + random()) / rows
    const radius = Math.sqrt(1 - latitude * latitude)
    const angle = (column + random()) / columns * Math.PI * 2
    const shell = random()
    const distance = shell < 0.08
      ? 1.37 + random() * 0.29
      : 1.34 * (0.45 + 0.55 * Math.cbrt(random()))
    const offset = index * 3
    sphere[offset] = Math.cos(angle) * radius * distance
    sphere[offset + 1] = latitude * distance
    sphere[offset + 2] = Math.sin(angle) * radius * distance

    const x = (u - 0.5) * 4.65
    const z = (v - 0.5) * 3.05
    const lift = terrainHeight(x, z)
    terrain[offset] = x
    terrain[offset + 1] = lift - 0.74
    terrain[offset + 2] = z
    seed[index] = random()

    const slope = (terrainHeight(x + 0.04, z - 0.03) - lift) * 3.1
    rock[index] = Math.min(0.94, Math.max(0.05, 0.32 + lift * 0.28 + slope + random() * 0.13))
    feather[index] = ease(0, 0.16, Math.min(u, 1 - u, v, 1 - v))
  }

  const geometry = new BufferGeometry()
  geometry.setAttribute('position', new BufferAttribute(sphere, 3))
  geometry.setAttribute('aTerrain', new BufferAttribute(terrain, 3))
  geometry.setAttribute('aSeed', new BufferAttribute(seed, 1))
  geometry.setAttribute('aRock', new BufferAttribute(rock, 1))
  geometry.setAttribute('aFeather', new BufferAttribute(feather, 1))
  return geometry
}

function ease(start: number, end: number, progress: number) {
  const amount = Math.min(1, Math.max(0, (progress - start) / (end - start)))
  return amount * amount * (3 - 2 * amount)
}

export function createScrollLandscape(canvas: HTMLCanvasElement): ScrollLandscapeRenderer | null {
  let renderer: WebGLRenderer
  try {
    const context = canvas.getContext('webgl2', { alpha: true, antialias: false })
    if (!context) return null
    renderer = new WebGLRenderer({ canvas, context, alpha: true, antialias: false })
  } catch {
    return null
  }

  const pixelRatio = Math.min(window.devicePixelRatio || 1, 1.5)
  renderer.setPixelRatio(pixelRatio)
  renderer.setClearColor(0x000000, 0)

  const isCompact = canvas.clientWidth < 440
  const geometry = isCompact ? landscapeGeometry(97, 65) : landscapeGeometry(134, 90)
  const uniforms = {
    uMorph: { value: 0 },
    uTime: { value: 0 },
    uPixelRatio: { value: pixelRatio },
    uDeep: { value: new Color('#17335b') },
    uSnow: { value: new Color('#80a9e7') },
  }
  const material = new ShaderMaterial({
    uniforms,
    vertexShader,
    fragmentShader,
    transparent: true,
    depthWrite: false,
  })
  const sculpture = new Points(geometry, material)
  sculpture.frustumCulled = false

  const scene = new Scene()
  const camera = new PerspectiveCamera(33, 1, 0.1, 25)
  scene.add(sculpture)

  let lastWidth = 0
  let lastHeight = 0
  return {
    draw(width, height, progress, elapsed) {
      if (width <= 0 || height <= 0) return
      if (width !== lastWidth || height !== lastHeight) {
        renderer.setSize(width, height, false)
        camera.aspect = width / height
        camera.updateProjectionMatrix()
        lastWidth = width
        lastHeight = height
      }

      const morph = ease(0.12, 0.81, progress)
      uniforms.uMorph.value = morph
      uniforms.uTime.value = elapsed
      sculpture.rotation.y = -0.24 + progress * 0.53
      sculpture.rotation.z = -0.06 + morph * 0.04
      camera.position.set(0, 0.34 + morph * 1.83, 5.85 + morph * 0.75)
      camera.lookAt(0, -morph * 0.08, 0)
      renderer.render(scene, camera)
    },
    dispose() {
      geometry.dispose()
      material.dispose()
      renderer.dispose()
    },
  }
}
