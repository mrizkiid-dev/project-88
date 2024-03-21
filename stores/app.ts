import { defineStore } from 'pinia'
export const useAppStore = defineStore('app-store', {
    state: () => {
        return {
            isMobile: false as Boolean,
        }
    }
})