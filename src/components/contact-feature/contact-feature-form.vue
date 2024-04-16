<template>
  <v-form ref="form" @submit.prevent="handleSendEmail">
    <v-row>
      <v-col cols="12" class="font-weight-bold">
        {{ t('description') }}
      </v-col>

      <v-col cols="12" md="6">
        <v-text-field
          name="fullName"
          :label="t('formLabels.name')"
          variant="solo-filled"
          color="primary"
          class="contact-feature-form__input"
          rounded="lg"
          :rules="[requiredRule]"
        />
      </v-col>

      <v-col cols="12" md="6">
        <v-text-field
          v-model="state.email"
          name="email"
          type="email"
          :label="t('formLabels.email')"
          variant="solo-filled"
          color="primary"
          class="contact-feature-form__input"
          rounded="lg"
          :rules="[requiredRule, emailRule]"
        />
      </v-col>

      <v-col cols="12">
        <v-textarea
          v-model="state.text"
          name="description"
          :label="t('formLabels.text')"
          variant="solo-filled"
          color="primary"
          class="contact-feature-form__input"
          rounded="lg"
          :rules="[requiredRule]"
        />
      </v-col>

      <v-col cols="12">
        <div class="flex items-center justify-center">
          <div class="w-50">
            <v-btn
              color="primary"
              block
              type="submit"
              rounded="xl"
              :loading="state.isLoading"
            >
              {{ t('formButtons.submit') }}
            </v-btn>
          </div>
        </div>
      </v-col>
    </v-row>

    <v-snackbar v-model="snackbarState.isOpen" :color="snackbarState.color">
      {{ snackbarState.text }}

      <template #actions>
        <v-btn
          variant="text"
          rounded="xl"
          @click="snackbarState.isOpen = false"
        >
          {{ t('formButtons.close') }}
        </v-btn>
      </template>
    </v-snackbar>
  </v-form>
</template>

<script setup lang="ts">
import { VForm } from 'vuetify/lib/components/index.mjs'

const state = reactive({
  isLoading: false,
  name: '',
  email: '',
  text: '',
  files: [] as File[],
})

const snackbarState = reactive({
  isOpen: false,
  text: '',
  color: '',
})

const form = ref<VForm>()
const mail = useMail()

const handleOpenSnackbar = (text: string, color: string = 'success') => {
  snackbarState.isOpen = true
  snackbarState.text = text
  snackbarState.color = color
}

const requiredRule = (value: string) => {
  if (value) return true

  return t('formLabels.requiredRule') as string
}

const emailRule = (value: string | undefined | null) => {
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

  if (!value || regex.test(value)) return true

  return t('formLabels.emailRule') as string
}

const handleSendEmail = async () => {
  if (state.isLoading) return
  const { valid } = await form.value!.validate()

  if (!valid) return

  state.isLoading = true

  mail
    .send({
      from: state.email,
      subject: t('contactForm.formLabels.emailSubject', {
        name: state.name,
      }) as string,
      text: state.text,
    })
    .then(() => {
      handleOpenSnackbar(t('formSnackbars.success') as string, 'success')

      form.value!.reset()
      state.files = []
    })
    .catch(() => {
      handleOpenSnackbar(t('formSnackbars.error') as string, 'error')
    })
    .finally(() => {
      state.isLoading = false
    })
}

const { t } = useI18n({
  useScope: 'local',
})
</script>

<i18n lang="json">
{
  "pt-BR": {
    "title": "Entre em contato",
    "description": "Entre em contato através dos dados ou enviando um e-mail por aqui.",
    "formLabels": {
      "name": "Seu nome",
      "email": "Seu email",
      "text": "Texto",
      "requiredRule": "Esse campo é obrigatório.",
      "emailRule": "O e-mail está incorreto.",
      "emailSubject": "Contato através do Site Pessoal - {name}"
    },
    "formButtons": {
      "submit": "Enviar",
      "close": "Fechar"
    },
    "formSnackbars": {
      "success": "E-mail enviado com sucesso, em breve retornaremos o contato. Obrigado!",
      "error": "Erro ao enviar o email. Entre em contato pelo WhatsApp ou pelas redes sociais."
    }
  },
  "en": {
    "title": "Get in touch",
    "description": "Get in touch via the details or send an email here.",
    "formLabels": {
      "name": "Your name",
      "email": "Your email",
      "text": "Text",

      "requiredRule": "This field is required.",
      "emailRule": "The email is incorrect.",
      "emailSubject": "Contact through Personal Website - {name}"
    },
    "formButtons": {
      "submit": "Send",
      "close": "Close"
    },
    "formSnackbars": {
      "success": "Email sent successfully, we'll get back to you shortly. Thank you!",
      "error": "Error sending the email. Please contact us via WhatsApp or social media."
    }
  },
  "es": {
    "title": "Ponte en contacto",
    "description": "Ponte en contacto a través de los datos o enviando un correo electrónico aquí.",
    "formLabels": {
      "name": "Tu nombre",
      "email": "Tu correo electrónico",
      "text": "Texto",
      "requiredRule": "Este campo es obligatorio.",
      "emailRule": "El correo electrónico no es correcto.",
      "emailSubject": "Contacto a través del sitio web personal - {name}"
    },
    "formButtons": {
      "submit": "Enviar",
      "close": "Cerrar"
    },
    "formSnackbars": {
      "success": "Correo electrónico enviado con éxito, pronto nos pondremos en contacto. ¡Gracias!",
      "error": "Error al enviar el correo electrónico. Ponte en contacto por WhatsApp o por las redes sociales."
    }
  }
}
</i18n>
