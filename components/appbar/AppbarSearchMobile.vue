<template>
    <div id="header-mobile" 
        class="fixed z-50 w-full h-min-[60px]"
        :class="[ bg , inStyle ]"
    >
        <nav class="flex items-center gap-2 justify-center w-full px-[20px] py-3">
            <div id="cart-mobile"
                class="rounded-full p-2 border border-primary cursor-pointer"
                :class="isGray ? 'bg-[#ECECEC]' : 'bg-third-color'"
            >
                <div id="back-button" @click="onTapBack">
                    <Icon name="eva:arrow-back-outline" size="30" color="#3A3A3A" />
                </div>
            </div>
            <div id="text-input-mobile" class="border border-primary flex items-baseline justify-end rounded-full w-full min-w-[20px]" :class="isGray ? 'bg-[#ECECEC]' : 'bg-third-color'" @click="onTapSearchBar">
                <div class="p-2 pr-3 cursor-pointer" >
                    <Icon name="ph:magnifying-glass" size="25" color="#3A3A3A" />
                </div>
            </div>
        </nav>
    </div>
</template>

<script setup lang="ts">

const { isGray, bg } = defineProps<{
    isGray?: boolean,
    bg?: string,
    inStyle?: string,
}>()

const searchAppBar = defineModel<string>()
const onTapSearchBar = () => {
    navigateTo('search-page')
}

const router = useRouter()
const onTapBack = () => {
    router.go(-1)
}

</script>