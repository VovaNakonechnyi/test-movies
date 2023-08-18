<script setup lang="ts"></script>

<template>
  <Suspense>
    <el-container class="container-def">
      <BaseHeader />
      <RouterView />
      <BaseFooter />
    </el-container>
  </Suspense>
</template>

<style lang="scss" scoped>
.container-def {
  height: 100%;
  flex-direction: column;
  justify-content: space-between;
}
</style>
