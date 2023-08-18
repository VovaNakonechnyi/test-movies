<script lang="ts" setup>
import { onUnmounted, ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useOMDBStore } from '@/store/omdb/index'

import TheCreateModal from '@/components/create/TheCreateModal.vue'
import BaseError from '@/components/shared/BaseError.vue'

import { useCarouselType, useResizeListener } from '@/composables/shared'

const store = useOMDBStore()
const { omdbCreated } = storeToRefs(store)

const centerDialogVisible = ref(false)

window.addEventListener('resize', useResizeListener)

onUnmounted(() => {
  window.removeEventListener('resize', useResizeListener)
})
</script>

<template>
  <el-main>
    <el-row>
      <el-col class="add-movie-wrapper">
        <el-button @click="centerDialogVisible = !centerDialogVisible" type="primary"
          >Add Movie</el-button
        ></el-col
      >
    </el-row>
    <el-row v-if="omdbCreated.length">
      <el-col>
        <el-carousel :interval="5000" :type="useCarouselType" height="650px">
          <el-carousel-item v-for="item in omdbCreated" :key="item.ImdbID">
            <BaseCard v-if="item.Title">
              <template #body>
                <img :src="item.Poster" class="cover" />
                <el-text tag="b" size="large">{{ item.Title }}</el-text>
                <el-text size="large">{{ item.Year }}</el-text>
                <el-text size="large">Director: {{ item.Director }}</el-text>
                <el-text size="large">IMDB ID: {{ item.ImdbID }}</el-text>
                <el-button @click="store.removeCreatedMovie(item.ImdbID)" type="danger"
                  >Delete</el-button
                >
              </template>
            </BaseCard>
          </el-carousel-item>
        </el-carousel>
      </el-col>
    </el-row>
    <BaseError v-else>
      <template #text> Oops... Nothing here </template>
    </BaseError>
  </el-main>
  <TheCreateModal v-model:model-value="centerDialogVisible" />
</template>
<style lang="scss" scoped>
.add-movie-wrapper {
  display: flex;
  justify-content: center;
}
</style>
