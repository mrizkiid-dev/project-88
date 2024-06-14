import { ref } from "vue"

export const useScreen = () => {
    const width = ref<number>(0)
    const isMobile = ref<boolean>(false)

    const setMobileScreen = (width: number) => {
        if(width <= 760) {
            isMobile.value = true
        } else {
            isMobile.value = false
        }
    }

    onMounted(() => {
        width.value = window.innerWidth
        window.addEventListener('resize' , function() {
          width.value = window.innerWidth
        })
        setMobileScreen(width.value)
    })
    

    watch(width,() => {
        setMobileScreen(width.value)
    })

    onBeforeUnmount(() => {
        window.removeEventListener('resize' , function() {
            width.value = window.innerWidth
          })
    })

    return {
        width,
        isMobile
    }
}
