<template>
    <div class="fixed z-[99] top-0 left-0 right-0 h-screen w-full bg-[#88888880] flex items-center justify-center px-5 cursor-pointer" @click.self="closePopUp">
        <div class="min-w-[300px] md:min-w-[500px] min-h-[300px] md:min-h-[300px] bg-third-color rounded-xl flex flex-col items-center justify-center gap-10">
            <div class="w-full text-right px-3 pt-1" @click="closePopUp"><Icon name="mingcute:close-circle-fill" size="30"/></div>
            <div class="flex flex-col justify-center items-center gap-10 p-10 mb-10">
                <NuxtImg src="/img/error-warning.svg" :width="isMobile ? '100px' : '200px'" height="isMobile ? '150px' : '300px'" class=""/>
                <h3 class="font-Inconsolata tracking-[0.2em] text-lg md:text-2xl text-center font-semibold">{{ title ?? 'Something went wrong we\'ll fix it soon' }}</h3>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { TErrorPopUp } from '~/types/components/errorPopUp';

const { isMobile } = useScreen()
const { title } = defineProps<TErrorPopUp>()

const emit = defineEmits<{
    closePopUp: []
}>()

const closePopUp = () => {
    emit('closePopUp')
}
</script>
