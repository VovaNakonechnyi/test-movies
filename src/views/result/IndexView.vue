<script lang="ts" setup>
import { onUnmounted } from 'vue'
import { useRouter } from 'vue-router'

import BaseCard from '@/components/shared/BaseCard.vue'
import BaseError from '@/components/shared/BaseError.vue'

import { useOMDBStore } from '@/store/omdb/index'
import { useCarouselType, useResizeListener } from '@/composables/shared'

const router = useRouter()
const { omdbItems } = useOMDBStore()

window.addEventListener('resize', useResizeListener)

const goDetailPage = (id: string) => router.push(`/detail/${id}`)

onUnmounted(() => {
  window.removeEventListener('resize', useResizeListener)
})
</script>
<template>
  <el-main>
    <el-row v-if="omdbItems && omdbItems.length">
      <el-col :span="24">
        <el-carousel :interval="5000" :type="useCarouselType" height="600px">
          <el-carousel-item v-for="item in omdbItems" :key="item.imdbID">
            <BaseCard @click="goDetailPage(item.imdbID)" v-if="item.Title">
              <template #body>
                <img :src="item.Poster" class="cover" />
                <el-text tag="b" size="large">{{ item.Title }}</el-text>
                <el-text size="large">{{ item.Year }}</el-text>
                <el-text size="large">IMDB ID: {{ item.imdbID }}</el-text>
              </template>
            </BaseCard>
          </el-carousel-item>
        </el-carousel>
      </el-col>
    </el-row>
    <BaseError v-else>
      <template #text> Oops..Something went wrong </template>
    </BaseError>
  </el-main>
</template>

<style lang="scss" scoped></style>
