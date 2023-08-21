<script lang="ts" setup>
import { ref } from 'vue'
import { storeToRefs } from 'pinia'

import BaseCard from '@/components/shared/BaseCard.vue'
import BaseError from '@/components/shared/BaseError.vue'

import { useOMDBStore } from '@/store/omdb/index'

interface Props {
  id: string
}
const props = withDefaults(defineProps<Props>(), {
  id: ''
})

const storeOmdb = useOMDBStore()
const reactiveStoreOmdb = storeToRefs(storeOmdb)

const item = reactiveStoreOmdb.getDestructuringOMDBItem

const fetchOMDBItem = storeOmdb.fetchOMDBItem
const loading = ref(true)
await fetchOMDBItem(props.id)
loading.value = false
</script>

<template>
  <el-main>
    <el-row v-if="loading">
      <el-col class="d-flex justify-center">
        <BaseLoader />
      </el-col>
    </el-row>
    <el-row v-else>
      <el-col :span="24">
        <BaseCard v-if="item">
          <template #body>
            <img :src="item.poster" class="cover" />
            <el-text tag="b" size="large">{{ item.title }}</el-text>
            <el-text size="large">Year: {{ item.year }}</el-text>
            <el-text size="large">Director: {{ item.director }}</el-text>
            <el-text size="large">Genre: {{ item.genre }}</el-text>
            <el-text size="large">Rate: {{ item.rate }}</el-text>
            <el-text size="large">Run time: {{ item.runTime }}</el-text>
            <el-text size="large">Languages: {{ item.languages }}</el-text>
            <el-text size="large">Country: {{ item.country }}</el-text>
            <el-text size="large">Plot: {{ item.plot }}</el-text>
          </template>
        </BaseCard>
        <BaseError v-else>
          <template #text> Oops... Nothing here </template>
        </BaseError>
      </el-col>
    </el-row>
  </el-main>
</template>

<style lang="scss" scoped></style>
