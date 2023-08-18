import { defineStore } from 'pinia'
import type { CreatedOMDBItem, OMDBItem, OMDBState } from '@/interfaces/stores/omdb-store.int'

import api from '@/api'
const { omdb } = api

const { apiOMDBItems, apiOMDBItem } = omdb

export const useOMDBStore = defineStore('omdb', {
  state: (): OMDBState => ({
    omdbItem: {} as OMDBItem,
    omdbItems: [],
    omdbCreated: []
  }),
  getters: {
    getDestructuringOMDBItem: ({ omdbItem }) => {
      if (!omdbItem.Title) return false
      return {
        title: omdbItem.Title || '-',
        poster: omdbItem.Poster || '-',
        director: omdbItem.Director || '-',
        year: omdbItem.Year || '-',
        genre: omdbItem.Genre || '-',
        rate: omdbItem.Rated || '-',
        runTime: omdbItem.Runtime || '-',
        languages: omdbItem.Language || '-',
        country: omdbItem.Country || '-',
        plot: omdbItem.Plot || '-'
      }
    }
  },
  actions: {
    async fetchOMDBItems(title: string) {
      const { Search: res } = await apiOMDBItems(title)
      this.omdbItems = res
      return res
    },
    async fetchOMDBItem(title: string) {
      const res = await apiOMDBItem(title)
      this.omdbItem = res
      return this.getDestructuringOMDBItem
    },
    addCreatedMovie(movie: CreatedOMDBItem) {
      this.omdbCreated.push(movie)
    },
    removeCreatedMovie(id: string) {
      this.omdbCreated = this.omdbCreated.filter((item) => item.ImdbID !== id)
    }
  },
  debounce: {
    fetchOMDBItems: 1500
  },
  persist: true
})
