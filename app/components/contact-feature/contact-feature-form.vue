<template>
  <form
    class="contact-feature-form rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-xl shadow-slate-200 backdrop-blur"
    @submit.prevent="handleSendEmail"
    novalidate
  >
    <p class="mb-6 text-sm font-semibold text-tertiary">
      {{ t('description') }}
    </p>

    <div class="grid gap-6 md:grid-cols-2">
      <UFormGroup
        :label="t('formLabels.name')"
        :error="errors.name"
        name="fullName"
        required
      >
        <UInput
          v-model="state.name"
          name="fullName"
          size="lg"
          autocomplete="name"
          :placeholder="t('formLabels.name')"
          :disabled="state.isLoading"
          @blur="validateField('name')"
        />
      </UFormGroup>

      <UFormGroup
        :label="t('formLabels.email')"
        :error="errors.email"
        name="email"
        required
      >
        <UInput
          v-model="state.email"
          name="email"
          size="lg"
          type="email"
          autocomplete="email"
          :placeholder="t('formLabels.email')"
          :disabled="state.isLoading"
          @blur="validateField('email')"
        />
      </UFormGroup>
    </div>

    <UFormGroup
      class="mt-6"
      :label="t('formLabels.text')"
      :error="errors.text"
      name="description"
      required
    >
      <UTextarea
        v-model="state.text"
        name="description"
        :placeholder="t('formLabels.text')"
        :disabled="state.isLoading"
        class="min-h-[160px]"
        @blur="validateField('text')"
      />
    </UFormGroup>

    <div class="mt-8 flex justify-center">
      <UButton
        type="submit"
        color="primary"
        size="lg"
        block
        :loading="state.isLoading"
      >
        {{ t('formButtons.submit') }}
      </UButton>
    </div>
  </form>
</template>

<script setup lang="ts">
type FormField = 'name' | 'email' | 'text'

const state = reactive({
  isLoading: false,
  name: '',
  email: '',
  text: '',
})

const errors = reactive<Record<FormField, string | undefined>>({
  name: undefined,
  email: undefined,
  text: undefined,
})

const mail = useMail()
const toast = useToast()

const validateField = (field: FormField) => {
  const value = state[field]?.trim()
  let error: string | undefined

  if (!value) {
    error = t('formLabels.requiredRule') as string
  } else if (
    field === 'email' &&
    !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value)
  ) {
    error = t('formLabels.emailRule') as string
  }

  errors[field] = error
  return !error
}

const validateForm = () => {
  return (['name', 'email', 'text'] as FormField[]).every((field) =>
    validateField(field),
  )
}

const resetForm = () => {
  state.name = ''
  state.email = ''
  state.text = ''

  ;(['name', 'email', 'text'] as FormField[]).forEach(
    (field) => (errors[field] = undefined),
  )
}

const handleSendEmail = async () => {
  if (state.isLoading) return
  if (!validateForm()) return

  state.isLoading = true

  try {
    await mail.send({
      from: state.email,
      subject: t('formLabels.emailSubject', {
        name: state.name,
      }) as string,
      text: state.text,
    })

    toast.add({
      color: 'success',
      title: t('formSnackbars.success') as string,
    })

    resetForm()
  } catch (error) {
    toast.add({
      color: 'error',
      title: t('formSnackbars.error') as string,
    })
  } finally {
    state.isLoading = false
  }
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
