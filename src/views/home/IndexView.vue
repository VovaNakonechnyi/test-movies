<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'

import { useOMDBStore } from '@/store/omdb/index'

const router = useRouter()
const { fetchOMDBItems } = useOMDBStore()

const search = ref('')

watch(search, async () => {
  await fetchOMDBItems(search.value)
  router.push('/result')
})
</script>

<template>
  <el-main class="home">
    <el-row>
      <el-col>
        <el-input v-model="search" placeholder="Please enter title" clearable />
      </el-col>
    </el-row>
  </el-main>
</template>

<style lang="scss" scoped>
.home {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
