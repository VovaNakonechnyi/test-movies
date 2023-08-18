import { computed, ref } from 'vue'

// export const debounce = <F extends (...args: any[]) => any>(func: F, waitFor: number) => {
//   let timeout: NodeJS.Timeout

//   return (...args: Parameters<F>): Promise<ReturnType<F>> =>
//     new Promise((resolve) => {
//       if (timeout) {
//         clearTimeout(timeout)
//       }

//       timeout = setTimeout(() => resolve(func(...args)), waitFor)
//     })
// }

const screenWidth = ref(window.innerWidth)

export const useResizeListener = () => (screenWidth.value = window.innerWidth)

export const useCarouselType = computed(() => {
  if (screenWidth.value < 992) return ''
  return 'card'
})
