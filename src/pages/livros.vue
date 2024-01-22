<template>
  <div class="d-flex flex-column py-16 gap-16">
    <app-section
      :title="$t('pages.books.title')"
      :description="$t('pages.books.subtitle')"
      class="fill-height"
    >
      <v-container>
        <div class="d-flex mb-6">
          <v-card
            variant="outlined"
            class="pa-4 d-flex flex-column align-center"
          >
            <div class="text-h2 mb-2">{{ totalBooks }}</div>

            <div class="font-weight-semi-bold text-uppercase text-caption">
              Livros lidos
            </div>
          </v-card>
        </div>

        <v-row v-for="bookTopic in bookTopics" :key="bookTopic.title">
          <v-col cols="12" class="font-weight-bold">{{
            bookTopic.title
          }}</v-col>

          <v-col
            v-for="book in bookTopic.items"
            :key="book.title"
            cols="12"
            md="3"
          >
            <v-card class="pa-6">
              <div class="font-weight-medium mb-2">
                {{ book.title }}
              </div>

              <div class="mb-2 font-italic">{{ book.author }}</div>

              <div class="d-flex flex-wrap gap-1">
                <v-chip
                  v-for="theme in book.themes"
                  :key="theme"
                  variant="outlined"
                  density="compact"
                >
                  {{ theme }}
                </v-chip>
              </div>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </app-section>
  </div>
</template>

<script setup lang="ts">
useHead({
  title: 'pages.books.title',
})

const bookTopics = [
  {
    title: 'Livros Profissionais',
    items: [
      {
        title: 'Inspirado',
        author: 'Marty Cagan',
        themes: ['Desenvolvimento de Produtos'],
      },
      {
        title: 'Clean Code',
        author: 'Robert C. Martin',
        themes: ['Programação', 'Boas Práticas'],
      },
      {
        title: 'Faça tempo',
        author: 'Jake Knapp e John Zeratsky',
        themes: ['Produtividade'],
      },
    ],
  },

  {
    title: 'Liderança e Desenvolvimento Pessoal',
    items: [
      {
        title: 'Os 7 Hábitos das Pessoas Altamente Eficazes',
        author: 'Stephen R. Covey',
        themes: ['Liderança', 'Desenvolvimento Pessoal'],
      },
      {
        title: 'Como fazer Amigos e Influenciar pessoas',
        author: 'Dale Carnegie',
        themes: ['Relacionamentos', 'Comunicação'],
      },
      {
        title: 'Como falar em público e encantar as pessoas',
        author: 'Dale Carnegie',
        themes: ['Comunicação'],
      },
      {
        title: '12 Regras pra vida',
        author: 'Jordan B. Peterson',
        themes: ['Filosofia', 'Autoajuda'],
      },
      {
        title: '8 Regras do líder de pequenos grupos',
        author: 'John C. Maxwell',
        themes: ['Liderança'],
      },
      {
        title: 'Responsabilidade Extrema',
        author: 'Jocko Willink',
        themes: ['Liderança', 'Disciplina'],
      },
      {
        title: '21 irrefutáveis leis da liderança',
        author: 'John C. Maxwell',
        themes: ['Liderança'],
      },
      {
        title: 'O poder do Hábito',
        author: 'Charles Duhigg',
        themes: ['Psicologia', 'Hábitos'],
      },
      {
        title: 'O monge e o executivo',
        author: 'James C. Hunter',
        themes: ['Liderança', 'Desenvolvimento Pessoal'],
      },
      {
        title: 'O líder que brilha',
        author: 'Rick Warren',
        themes: ['Liderança', 'Desenvolvimento Pessoal'],
      },
    ],
  },

  {
    title: 'Espiritualidade',
    items: [
      {
        title: 'Poder e o Impacto de uma visão: O alfabeto de um líder',
        author: 'Marcelo Bigardi',
        themes: ['Autoajuda'],
      },
      {
        title: 'Bíblia',
        author: 'Vários Autores',
        themes: ['Religião', 'Espiritualidade'],
      },
      {
        title: 'Coração Selvagem',
        author: 'John Eldredge',
        themes: ['Cristianismo'],
      },
      {
        title: 'Enraizados',
        author: 'Banning Liebscher',
        themes: ['Cristianismo'],
      },
      {
        title: 'A grande aventura masculina',
        author: 'John Eldredge',
        themes: ['Cristianismo'],
      },
      {
        title: 'Um mestre fora da Lei',
        author: 'John Eldredge',
        themes: ['Cristianismo'],
      },
      {
        title: 'Santidade que liberta',
        author: 'John Eldredge',
        themes: ['Cristianismo'],
      },
      {
        title: 'Cristianismo puro e simples',
        author: 'C.S. Lewis',
        themes: ['Cristianismo'],
      },
      {
        title: 'Os 4 amores',
        author: 'C.S. Lewis',
        themes: ['Cristianismo'],
      },
      {
        title: 'O peso da glória',
        author: 'C.S. Lewis',
        themes: ['Cristianismo'],
      },
      {
        title: 'A abolição do homem',
        author: 'C.S. Lewis',
        themes: ['Cristianismo'],
      },
      {
        title: 'Minha vida não é cinema',
        author: 'Marcos Madaleno e Mariana Madaleno',
        themes: ['Cristianismo'],
      },
      {
        title: 'Homens imparáveis',
        author: 'Carlito Paes',
        themes: ['Cristianismo'],
      },
      {
        title: 'Uma vida com propósitos',
        author: 'Rick Warren',
        themes: ['Cristianismo'],
      },
      {
        title: 'Mate o Dragão: A batalha pela pureza sexual',
        author: 'Israel subirá',
        themes: ['Cristianismo'],
      },
      {
        title: 'O caminho do Guerreiro',
        author: 'Erwin Raphael McManus',
        themes: ['Masculinidade'],
      },
      {
        title: 'A Batalha de Todo Homem',
        author: 'Stephen Arterburn e Fred Stoeker',
        themes: ['Masculinidade'],
      },
      {
        title: 'Homens de verdade: O chamado de Deus para masculinidade',
        author: 'Richard D. Phillips',
        themes: ['Masculinidade'],
      },
      {
        title: 'O Mistério Macho & Fêmea',
        author: 'Fábio Damasceno',
        themes: ['Relacionamentos'],
      },
      {
        title: 'As 5 linguagens do amor',
        author: 'Gary Chapman',
        themes: ['Relacionamentos'],
      },
      {
        title: 'As 5 linguagens do perdão',
        author: 'Gary Chapman',
        themes: ['Relacionamentos'],
      },
      {
        title:
          'Um leão por dia: Os desafios do homem em busca de sua afirmação',
        author: 'John Eldredge e Samuel Eldredge',
        themes: ['Masculinidade'],
      },
      {
        title: 'Derrote Mamom: Estratégias para sua vitória financeira',
        author: 'Fabiano Ribeiro',
        themes: ['Finanças'],
      },
      {
        title:
          'Feche a Matraca - Ouvindo a voz de Deus acima de todas as outras!',
        author: 'Steven Furtick',
        themes: ['Cristianismo'],
      },
    ],
  },

  {
    title: 'Literatura, fantasia e ficção',
    items: [
      {
        title: 'O Senhor dos Anéis: Sociedade do Anel',
        author: 'J.R.R. Tolkien',
        themes: ['Fantasia'],
      },
      {
        title: 'O Senhor dos Anéis: As Duas Torres',
        author: 'J.R.R. Tolkien',
        themes: ['Fantasia'],
      },
      {
        title: 'O Senhor dos Anéis: O Retorno do Rei',
        author: 'J.R.R. Tolkien',
        themes: ['Fantasia'],
      },
      {
        title: 'Cartas de um diabo a seu aprendiz',
        author: 'C.S. Lewis',
        themes: ['Fantasia Cristã'],
      },
      {
        title: 'As crônicas de Nárnia',
        author: 'C.S. Lewis',
        themes: ['Fantasia'],
      },
      {
        title: 'Memórias póstumas de Brás Cubas',
        author: 'Machado de Assis',
        themes: ['Ficção Clássica Brasileira'],
      },
      {
        title: 'Dom Casmurro',
        author: 'Machado de Assis',
        themes: ['Ficção Clássica Brasileira'],
      },
    ],
  },
]

function countTotalBooks(topics) {
  return topics.reduce((total, section) => total + section.items.length, 0)
}

const totalBooks = computed(() => countTotalBooks(bookTopics))
</script>

<style lang="scss">
.about-us-page__content {
  & p.initial-paragraph {
    text-indent: 50px;
  }
}
</style>
