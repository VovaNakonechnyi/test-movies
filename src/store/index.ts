import { createPinia } from 'pinia'

declare module 'pinia' {
  interface DefineStoreOptionsBase<S, Store> {
    debounce?: Partial<Record<keyof StoreActions<Store>, number | [number, ...any[]]>>
  }
}

export default createPinia()
