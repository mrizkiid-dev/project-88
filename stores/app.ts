import { defineStore } from 'pinia'
import type { IProduct } from '~/types/components/searchResult'
export const useAppStore = defineStore('app-store', {
    state: () => {
        return {
            isMobile: false as Boolean,
            searchResult: [] as IProduct[]
        }
    }
})