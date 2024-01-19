<template>
  <v-form ref="form" @submit.prevent="handleSendEmail">
    <v-row>
      <v-col cols="12" class="font-weight-bold">
        Faça seu orçamento online sem custo ou esclareça suas dúvidas
        gratuitamente agora.
      </v-col>

      <v-col cols="12" md="6">
        <v-text-field
          name="fullName"
          label="Seu nome"
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
          label="Seu email"
          variant="solo-filled"
          color="primary"
          class="contact-feature-form__input"
          rounded="lg"
          :rules="[requiredRule, emailRule]"
        />
      </v-col>

      <v-col cols="12">
        <v-select
          v-model="state.subject"
          name="subject"
          label="Assunto"
          variant="solo-filled"
          color="primary"
          class="contact-feature-form__input"
          rounded="lg"
          :items="['Orçamento', 'Dúvidas']"
        />
      </v-col>

      <v-col cols="12">
        <v-textarea
          v-model="state.text"
          name="description"
          label="Texto"
          variant="solo-filled"
          color="primary"
          class="contact-feature-form__input"
          rounded="lg"
          :rules="[requiredRule]"
        />
      </v-col>

      <v-col cols="12">
        <p class="text-subtitle-2 mb-2">Arquivos para o orçamento</p>

        <app-drop-zone
          rounded="lg"
          elevation="2"
          @drop-files="handleSelectFiles"
        />
      </v-col>

      <v-col cols="12">
        <p class="text-subtitle-2 mb-2">Lista de arquivos:</p>

        <v-list nav class="text-caption">
          <v-list-item
            v-for="(file, index) in state.files"
            :key="file.name + file.size"
          >
            <template #prepend>
              <v-icon icon="fas fa-file" />
            </template>

            {{ file.name }}

            <template #append>
              <v-btn
                icon
                size="x-small"
                variant="flat"
                @click="state.files.splice(index, 1)"
              >
                <v-icon icon="fas fa-trash" />
              </v-btn>
            </template>
          </v-list-item>

          <v-list-item v-if="!state.files.length" class="font-italic">
            <template #prepend>
              <v-icon icon="fas fa-circle-info" />
            </template>

            Nenhum arquivo.
          </v-list-item>
        </v-list>
      </v-col>

      <v-col cols="12">
        <div class="d-flex align-center justify-center">
          <div class="w-50">
            <v-btn
              color="primary"
              block
              type="submit"
              rounded="xl"
              :loading="state.isLoading"
            >
              Enviar
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
          Fechar
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
  subject: 'Orçamento',
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

  return 'Esse campo é obrigatório.'
}

const emailRule = (value: string | undefined | null) => {
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

  if (!value || regex.test(value)) return true

  return 'O e-mail está incorreto.'
}

const handleSelectFiles = ($event: File[] = []) => {
  state.files = $event
}

const handleSendEmail = async () => {
  if (state.isLoading) return
  const { valid } = await form.value!.validate()

  if (!valid) return

  state.isLoading = true

  const toBase64 = (file: File) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => resolve(reader.result)
      reader.onerror = (error) => reject(error)
    })

  const attachments = await Promise.all(
    state.files.map(async (file) => {
      const fileBase64 = await toBase64(file)

      return {
        filename: file.name,
        path: fileBase64,
        contentType: file.type,
      }
    }),
  )

  mail
    .send({
      from: state.email,
      subject: `${state.subject} - ${state.name}`,
      text: state.text,
      attachments,
    })
    .then(() => {
      handleOpenSnackbar(
        'E-mail enviado com sucesso, embreve retornaremos o contato, obrigado!',
        'success',
      )

      form.value!.reset()
      state.files = []
    })
    .catch(() => {
      handleOpenSnackbar(
        'Erro ao enviar o email, por favor entre em contado pelo WhatsApp ou pelas redes sociais.',
        'error',
      )
    })
    .finally(() => {
      state.isLoading = false
    })
}
</script>

<style lang="scss"></style>
