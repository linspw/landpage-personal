<template>
  <v-list class="contact-feature-details">
    <div class="mb-6 px-16">
      <app-image
        src="/logo/logo.svg"
        :height="60"
        width="100%"
        alt="Main Project logo"
      />
    </div>

    <v-list-item class="font-weight-bold">Contatos diretos</v-list-item>

    <v-list-item target="_blank">
      <template #prepend>
        <v-icon icon="fas fa-phone-volume" size="small" color="primary" />
      </template>

      + 55 (12) 99627-7432
    </v-list-item>

    <v-list-item>
      <template #prepend>
        <v-icon icon="fas fa-envelope" size="small" color="primary" />
      </template>

      contato@mainproject.one
    </v-list-item>

    <v-list-item>
      <template #prepend>
        <v-icon icon="fas fa-location-dot" size="small" color="primary" />
      </template>

      São José dos Campos - SP - Brasil
    </v-list-item>
  </v-list>

  <v-list class="contact-feature-details">
    <v-list-item class="font-weight-bold">Social Media</v-list-item>

    <v-list-item>
      <div class="d-flex gap-4">
        <nuxt-link
          to="https://www.instagram.com/linspw/"
          external
          target="_blank"
        >
          <v-icon icon="fab fa-instagram" size="small" color="primary" />
        </nuxt-link>

        <nuxt-link to="https://wa.link/8qsaou" external target="_blank">
          <v-icon icon="fab fa-whatsapp" size="small" color="primary" />
        </nuxt-link>
      </div>
    </v-list-item>
  </v-list>
</template>

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
