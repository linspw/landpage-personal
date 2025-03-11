<template>
  <app-page with-top-margin>
    <app-section
      :title="$t('pages.blog.title')"
      :description="$t('pages.blog.subtitle')"
      class="fill-height"
    >
      <v-container>
        <v-row>
          <v-col
            v-for="post in posts"
            :key="post.id"
            cols="12"
            md="6"
            lg="4"
          >
            <v-card class="blog-card">
              <v-img v-if="post.thumbImageUrl" :src="post.thumbImageUrl" height="200px" cover/>

              <v-card-title>{{ post.title }}</v-card-title>

              <v-card-subtitle>{{ formatDate(post.date) }}</v-card-subtitle>
              
              <v-card-text>{{ post.description }}</v-card-text>
              
              <v-card-actions class="d-flex justify-end">
                <v-btn :to="post.path" color="primary">
                  Leia mais
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </app-section>
  </app-page>
</template>

<script setup lang="ts">
import { formatDate } from '~/utils/date/formatDate';

const { data: posts } = await useAsyncData("posts", async () => await queryCollection('blog').order('date', 'DESC').all());


</script>

<style scoped>
.blog-card {
  transition: 0.3s;
}
.blog-card:hover {
  transform: scale(1.03);
}
</style>
