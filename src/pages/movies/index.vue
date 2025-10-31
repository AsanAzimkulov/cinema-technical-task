<template>
  <NuxtLayout>
    <template #title>
      <h1 class="text-xl">Фильмы / Главная</h1>
    </template>
    <MovieList/>
  </NuxtLayout>
</template>

<script setup lang="ts">
import MovieList from "~/features/movie-list/MovieList.vue";
</script>
