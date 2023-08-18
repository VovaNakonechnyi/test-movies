import { useCustomFetch } from '@/composables/fetch'
import type { OMDBItem, OMDBResponse } from '@/interfaces/stores/omdb-store.int'
const omdbQuery: string = `http://www.omdbapi.com/?apikey=${import.meta.env.VITE_OMDB_KEY}`
export default () => ({
  apiOMDBItems(title: string): Promise<OMDBResponse> {
    return useCustomFetch<OMDBResponse>(`${omdbQuery}&s=${title}`, {
      method: 'GET'
    })
  },
  apiOMDBItem(title: string): Promise<OMDBItem> {
    return useCustomFetch<OMDBItem>(`${omdbQuery}&i=${title}`, {
      method: 'GET'
    })
  }
})
