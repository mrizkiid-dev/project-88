<template>
    <div id="pop-up" class="fixed z-50 top-0 left-0 right-0 h-screen w-full bg-[#88888880] flex items-center justify-center px-5 cursor-pointer" @click.self="closePopUp" >
        <div class="container max-w-[500px] justify-center bg-third-color border rounded-[15px] cursor-default md:min-w-[700px] md:mx-5">
            <div class="w-full text-right px-3 pt-1" @click="closePopUp"><b class="cursor-pointer">X</b></div>
            <div class="flex flex-col items-center justify-center md:min-h-[400px]">
                <div class="flex flex-col items-center justify-between gap-8 pt-6 pb-5">
                    <img :src="imageUrl" alt="email-confirmation" class="w-[30%] md:w-[50%]" />
                    <div class="flex flex-col justify-center items-center font-Inconsolata text-sm text-center md:text-xl ">
                        <slot name="title">
                        </slot>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
const { } = defineProps<{
    imageUrl: string
}>()

const emit = defineEmits<{
    closePopUp: []
}>()

const closePopUp = () => {
    emit('closePopUp')
}

</script>

<style scoped>

</style>