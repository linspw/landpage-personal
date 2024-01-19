<template>
  <div class="d-flex flex-column py-16 gap-16">
    <v-container>
      <app-section
        id="section-sobre-nós"
        title="Sobre nós"
        description="Conheça mais sobre o nosso trabalho."
      >
        <div class="d-flex flex-column flex-md-row gap-6">
          <div
            class="about-us-page__content text-body-1 d-flex flex-column gap-6"
          >
            <p class="initial-paragraph">
              Na MainProject, nossa paixão é impulsionar a inovação e criar
              tecnologia de ponta. Fundada com a visão de transformar ideias em
              soluções digitais excepcionais, nossa equipe é movida pela
              criatividade e comprometida com a excelência.
            </p>

            <p>
              Nós acreditamos que a tecnologia tem o poder de moldar o futuro e
              simplificar a vida das pessoas. Com essa crença em mente,
              dedicamo-nos a desenvolver soluções de software personalizadas que
              atendam às necessidades específicas de nossos clientes.
            </p>

            <p>
              Nossa jornada é marcada por anos de experiência, aprendizado
              contínuo e inovação constante. Trabalhamos de perto com nossos
              clientes para entender seus objetivos e desafios, proporcionando
              soluções sob medida que os ajudam a ter sucesso no mundo digital.
            </p>

            <p>
              Na MainProject, estamos comprometidos em construir parcerias
              sólidas, proporcionando soluções tecnológicas que elevam o nível e
              agregam valor. Seja qual for o seu projeto, estamos aqui para
              transformar suas visões em realidade digital.
            </p>

            <p>
              Junte-se a nós nesta emocionante jornada tecnológica, onde a
              excelência é a norma e a inovação é constante. Seja bem-vindo à
              MainProject.
            </p>
          </div>

          <div class="d-flex align-center">
            <app-image
              src="/about-us/company.png"
              :height="400"
              :width="300"
              class="rounded-lg"
            />
          </div>
        </div>
      </app-section>
    </v-container>
  </div>
</template>

<script setup lang="ts">
useHead({
  title: 'Sobre nós',
})
</script>

<style lang="scss">
.about-us-page__content {
  & p.initial-paragraph {
    text-indent: 50px;
  }
}
</style>
