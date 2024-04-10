<template>
    <footer class="fixed z-50 h-[60px] bottom-0 left-0 right-0 w-full bg-third-color border-t flex justify-center">
        <div class="flex flex-row w-full px-5">
            <div id="left" class="basis-full flex justify-center items-start flex-col">
                <h3 class="font-medium">{{ title }}</h3>
                <p class="font-black">Rp. {{ totalPayment }}</p>
            </div>
            <div id="right" class="basis-full flex items-center justify-center">
                <ButtonBgYellow :title="titleButton" sytle-css="w-full py-2 border-2 font-semibold" @on-tap="onTap"/>
            </div>
        </div>
    </footer>
</template>

<script setup lang="ts">
const { title, totalPayment, titleButton } = defineProps<{
    title: string,
    totalPayment: number,
    titleButton: string,
}>()

const emit = defineEmits<{
    onTap: []
}>()

const onTap = () => {
    emit('onTap')
}
</script>