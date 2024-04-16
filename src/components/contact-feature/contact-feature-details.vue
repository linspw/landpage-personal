<template>
  <v-list class="contact-feature-details">
    <div class="mb-6 px-16">
      <nuxt-link
        to="/"
        class="font-bold text-secondary normal-case no-underline text-3xl mr-4 text-center"
      >
        Jessé Correia
      </nuxt-link>
    </div>

    <v-list-item class="font-bold">
      {{ t('directContacts') }}
    </v-list-item>

    <v-list-item>
      <template #prepend>
        <v-icon icon="fas fa-envelope" size="small" color="primary" />
      </template>

      linspw@live.com
    </v-list-item>

    <v-list-item>
      <template #prepend>
        <v-icon icon="fas fa-location-dot" size="small" color="primary" />
      </template>

      São José dos Campos - SP - Brasil
    </v-list-item>
  </v-list>
</template>

<script setup lang="ts">
const { t } = useI18n({
  useScope: 'local',
})
</script>

<style lang="scss">
.contact-feature-details {
  font-size: 14px;

  &.v-list-item__prepend > .v-badge .v-icon,
  .v-list-item__prepend > .v-icon,
  .v-list-item__append > .v-badge .v-icon,
  .v-list-item__append > .v-icon {
    opacity: 1;
  }
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
