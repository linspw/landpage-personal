<template>
  <section
    class="contact-feature-details rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-xl shadow-slate-200 backdrop-blur"
  >
    <div class="mb-6 flex flex-col items-center text-center">
      <NuxtLink
        to="/"
        class="text-2xl font-bold uppercase tracking-wide text-secondary no-underline"
      >
        Jessé Correia
      </NuxtLink>
    </div>

    <p class="text-xs font-semibold uppercase tracking-wide text-slate-500">
      {{ t('directContacts') }}
    </p>

    <ul class="mt-4 space-y-4 text-sm text-secondary">
      <li class="flex items-center gap-3">
        <span class="contact-feature-details__icon text-primary">
          <i class="fas fa-envelope" aria-hidden="true" />
        </span>
        <span class="font-medium">linspw@live.com</span>
      </li>

      <li class="flex items-center gap-3">
        <span class="contact-feature-details__icon text-primary">
          <i class="fas fa-location-dot" aria-hidden="true" />
        </span>
        <span class="font-medium">São José dos Campos - SP - Brasil</span>
      </li>
    </ul>
  </section>
</template>

<script setup lang="ts">
const { t } = useI18n({
  useScope: 'local',
})
</script>

<style scoped>
.contact-feature-details__icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 2.5rem;
  width: 2.5rem;
  border-radius: 9999px;
  background-color: rgba(1, 83, 255, 0.08);
  font-size: 1rem;
}
</style>

<i18n lang="json">
{
  "pt-BR": {
    "directContacts": "Contato direto",
    "socialMedia": "Midia social"
  },
  "en": {
    "directContacts": "Direct Contacts",
    "socialMedia": "Social Media"
  },
  "es": {
    "directContacts": "Contactos directos",
    "socialMedia": "Redes sociales"
  }
}
</i18n>
