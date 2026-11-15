<template>
  <UContainer class="skills-showcase">
    <div class="skills-layout">
      <article class="skills-focus">
        <h3>{{ t('focus.title') }}</h3>
        <p>{{ t('focus.description') }}</p>
        <p class="skills-focus-stack">TypeScript · Vue.js · Nuxt · Cloudflare</p>
        <a href="/projects#realizacoes" class="skills-focus-link">
          {{ t('focus.viewWork') }}
          <UIcon name="i-heroicons-arrow-up-right-20-solid" aria-hidden="true" />
        </a>
      </article>

      <ul class="skills-areas" role="list">
        <li v-for="area in areas" :key="area.key">
          <h3>{{ t(`areas.${area.key}.title`) }}</h3>
          <p>{{ t(`areas.${area.key}.description`) }}</p>
          <p class="skills-stack">{{ area.stack.join(' · ') }}</p>
        </li>
      </ul>
    </div>

    <details class="skills-inventory">
      <summary>{{ t('moreTechnologies') }}</summary>
      <dl class="skills-inventory-list">
        <div v-for="category in categoriesData" :key="category.title">
          <dt>{{ t(`titles.${category.title}`) }}</dt>
          <dd>
            {{ category.items.flatMap(group => group.items.map(skill => t(`${skill}.title`))).join(' · ') }}
          </dd>
        </div>
      </dl>
    </details>
  </UContainer>
</template>

<script setup lang="ts">
import { categoriesData } from '~/assets/data/categories-data'

const { t } = useI18n({ useScope: 'local' })

const areas = [
  { key: 'interfaces', stack: ['Vue.js', 'React', 'React Native', 'Storybook'] },
  { key: 'data', stack: ['Node.js', 'NestJS', 'PostgreSQL', 'Redis', 'Kafka', 'ClickHouse'] },
  { key: 'reliability', stack: ['OpenTelemetry', 'Vitest', 'Playwright', 'Docker', 'GitHub Actions'] },
]
</script>

<i18n lang="json" src="./translate-skills-items.json"></i18n>
<i18n lang="json" src="./translate-skills-categories.json"></i18n>
<i18n lang="json">
{
  "pt-BR": {
    "focus": {
      "title": "Arquitetura de plataformas web",
      "description": "Trabalho na arquitetura e operação de marketplaces e aplicações web, incluindo renderização no edge, SDKs compartilhados e autenticação entre sistemas.",
      "viewWork": "Ver realizações de plataforma"
    },
    "areas": {
      "interfaces": {
        "title": "Interfaces e design systems",
        "description": "Desenvolvo interfaces web e mobile e componentes reutilizáveis, com atenção à acessibilidade e à renderização no servidor."
      },
      "data": {
        "title": "Backend e dados",
        "description": "Desenvolvo APIs, integrações e pipelines de eventos que conectam aplicações e alimentam plataformas de dados."
      },
      "reliability": {
        "title": "Confiabilidade em produção",
        "description": "Cuido da observabilidade e da manutenção de aplicações com rastreamento distribuído, testes automatizados e integração contínua."
      }
    },
    "moreTechnologies": "Ver lista completa de tecnologias"
  },
  "en": {
    "focus": {
      "title": "Web platform architecture",
      "description": "I build and operate marketplaces and web applications, including edge rendering, shared SDKs, and cross-system authentication.",
      "viewWork": "See platform achievements"
    },
    "areas": {
      "interfaces": {
        "title": "Interfaces and design systems",
        "description": "I build web and mobile interfaces and reusable components, with attention to accessibility and server-side rendering."
      },
      "data": {
        "title": "Backend and data",
        "description": "I build APIs, integrations, and event pipelines that connect applications and feed data platforms."
      },
      "reliability": {
        "title": "Production reliability",
        "description": "I maintain and observe production applications with distributed tracing, automated tests, and continuous integration."
      }
    },
    "moreTechnologies": "See the full list of technologies"
  },
  "es": {
    "focus": {
      "title": "Arquitectura de plataformas web",
      "description": "Trabajo en la arquitectura y operación de marketplaces y aplicaciones web, con renderizado en el edge, SDK compartidos y autenticación entre sistemas.",
      "viewWork": "Ver logros de plataforma"
    },
    "areas": {
      "interfaces": {
        "title": "Interfaces y sistemas de diseño",
        "description": "Desarrollo interfaces web y móviles y componentes reutilizables, con atención a la accesibilidad y al renderizado en el servidor."
      },
      "data": {
        "title": "Backend y datos",
        "description": "Desarrollo API, integraciones y flujos de eventos que conectan aplicaciones y alimentan plataformas de datos."
      },
      "reliability": {
        "title": "Fiabilidad en producción",
        "description": "Mantengo aplicaciones en producción y trabajo en su observabilidad con trazado distribuido, pruebas automatizadas e integración continua."
      }
    },
    "moreTechnologies": "Ver la lista completa de tecnologías"
  }
}
</i18n>

<style scoped>
.skills-layout {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1.15fr);
  gap: clamp(1.5rem, 5vw, 4rem);
}

.skills-focus {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: clamp(1.4rem, 3.5vw, 2.6rem);
  border-radius: 1rem;
  background: var(--site-navy);
  color: #f5f8ff;
}

.skills-focus h3 {
  font-size: clamp(1.85rem, 3.1vw, 2.85rem);
  font-weight: 750;
  line-height: 1.05;
  letter-spacing: -0.035em;
  text-wrap: balance;
}

.skills-focus > p {
  max-width: 49ch;
  margin-top: 0.9rem;
  color: #d5e3fb;
  line-height: 1.6;
}

.skills-focus .skills-focus-stack {
  margin-top: 1rem;
  color: #e9f0ff;
  font-size: 0.83rem;
  font-weight: 650;
}

.skills-focus-link {
  display: inline-flex;
  min-height: 44px;
  align-items: center;
  gap: 0.5rem;
  margin-top: auto;
  padding-top: 0.5rem;
  color: #fff;
  font-size: 0.87rem;
  font-weight: 700;
  text-decoration: underline;
  text-decoration-color: #a6c3f1;
  text-underline-offset: 0.3em;
}

.skills-focus-link:focus-visible,
.skills-inventory summary:focus-visible {
  outline: 2px solid currentColor;
  outline-offset: 3px;
}

.skills-focus-link .iconify {
  flex: none;
}

.skills-areas {
  border-block-start: 1px solid var(--site-line);
}

.skills-areas li {
  padding-block: 0.95rem;
  border-block-end: 1px solid var(--site-line);
}

.skills-areas h3 {
  color: var(--site-navy);
  font-size: clamp(1.08rem, 2vw, 1.24rem);
  font-weight: 750;
  line-height: 1.25;
}

.skills-areas p {
  max-width: 66ch;
  margin-top: 0.35rem;
  color: var(--site-ink);
  font-size: 0.9rem;
  line-height: 1.55;
}

.skills-areas .skills-stack {
  color: var(--site-muted);
  font-size: 0.8rem;
}

.skills-inventory {
  margin-top: 0.65rem;
}

.skills-inventory summary {
  width: fit-content;
  min-height: 44px;
  padding-block: 0.75rem;
  color: var(--site-link);
  font-size: 0.85rem;
  font-weight: 700;
  cursor: pointer;
}

.skills-inventory-list {
  display: grid;
  gap: 0.8rem 1.4rem;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  padding: 1rem 0;
  border-top: 1px solid var(--site-line);
  color: var(--site-muted);
  font-size: 0.85rem;
  line-height: 1.6;
}

.skills-inventory-list dt {
  margin-bottom: 0.2rem;
  color: var(--site-navy);
  font-weight: 750;
}

@media (max-width: 720px) {
  .skills-layout,
  .skills-inventory-list {
    grid-template-columns: 1fr;
  }
}
</style>
