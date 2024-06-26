<template>
    <ClientOnly>
        <teleport v-if="isShow" to="#pop-up">
            <div class="fixed z-[99] w-full flex justify-center mt-[100px]">
                <div class="min-w-[200px] max-w-[300px] md:max-w-[500px] h-11 md:h-14 bg-primary rounded-xl 
                    text-third-color px-4 flex items-center justify-between border border-third-color gap-2
                ">
                    <p class="tracking-wider text-sm md:text-xl">Product has been added to cart</p>
                    <button class="rounded-full hover:bg-third-color hover:bg-opacity-30 cursor-pointer" @click="onTap">
                        <Icon name="ion:close" :size="isMobile ? '17' : '23'"/>
                    </button>
                </div>
            </div>
        </teleport>
    </ClientOnly>   
</template>

<script setup lang="ts">
const { isMobile } = useScreen()
// const isClose = ref<boolean>(false)
const { isShow } = defineProps<{
    isShow: boolean
}>()

const emit = defineEmits(['onTap'])

const onTap = () => {
    console.log('kena');
    
    emit('onTap')
}

</script>