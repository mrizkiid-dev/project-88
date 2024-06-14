<template>
    <ClientOnly>
        <teleport v-if="isShow" to="#pop-up">
            <div class="fixed z-[99] w-full flex justify-center mt-[100px]">
                <div class="w-[500px] h-14 bg-primary rounded-xl text-third-color px-4 flex items-center justify-between border border-third-color">
                    <p class="tracking-wider text-xl">Product has been added to cart</p>
                    <button class="rounded-full hover:bg-third-color hover:bg-opacity-30 cursor-pointer" @click="onTap">
                        <Icon name="ion:close" size="23"/>
                    </button>
                </div>
            </div>
        </teleport>
    </ClientOnly>   
</template>

<script setup lang="ts">
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