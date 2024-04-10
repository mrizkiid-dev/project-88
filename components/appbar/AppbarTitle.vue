<template>
    <header v-if="isLogo" class="fixed z-50 h-[60px] bg-third-color border-b-[1px] border-primary py-5 px-5 flex flex-row items-baseline w-full">

        <button @click="backButton" class="absolute">
            <Icon name="eva:arrow-back-outline" size="30px" class="w-[30px] cursor-pointer"/>
        </button>

        <div class="flex justify-center w-full">
            <h1
                class="font-semibold text-xl"
                :class="[{'font-Dela-Gothic-One text-base tracking-wider': isLogo}]"
            >
                {{ title }}
            </h1>
        </div>

    </header>
    <header v-else class="fixed h-[60px] z-50 bg-third-color border-b-[1px] border-primary py-5 px-5 flex flex-row items-center w-full gap-3">

        <button @click="backButton">
            <Icon name="eva:arrow-back-outline" size="30px" class="w-[30px] cursor-pointer"/>
        </button>
        
        <h1 class="font-semibold text-xl">
            {{ title }}
        </h1>

    </header>
</template>

<script setup lang="ts">
const { title } = defineProps<{
    title: string,
    isLogo?: boolean
}>()
const router = useRouter()
const backButton = () => {
    router.go(-1)
}
</script>
