<script lang="ts" setup>
import { computed } from 'vue'

const props = defineProps<{
  styles?: {}
}>()
const defCardStyle = {
  padding: '1rem',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center'
}

const cardBodyStyle = computed(() => ({ ...defCardStyle, ...props }))
</script>

<template>
  <el-card :body-style="cardBodyStyle">
    <slot name="body"></slot>
  </el-card>
</template>

<style lang="scss" scoped></style>
