<template>
    <nav id="header-mobile" 
        class="fixed z-50 w-full h-min-[60px] flex flex-col items-center border"
        :class="[ bg , inStyle ]"
    >
        <div class="relative w-full px-[20px] py-3">
            <div class="flex items-center gap-2 justify-center ">
                <div id="cart-mobile"
                    class="rounded-full p-2 border border-primary cursor-pointer"
                    :class="isGray ? 'bg-[#ECECEC]' : 'bg-third-color'"
                >
                    <div id="back-button" @click="onTapBack">
                        <Icon name="eva:arrow-back-outline" size="30" color="#3A3A3A" />
                    </div>
                </div>
                <div v-if="isTypingActive" id="text-input-mobile" class="border border-primary flex items-baseline justify-between rounded-full w-full min-w-[20px]" :class="isGray ? 'bg-[#ECECEC]' : 'bg-third-color'" >
                    <input ref="inputRef" ype="text" class="w-full ml-3 bg-transparent focus:outline-none placeholder:font-Inconsolata" v-model="searchAppBar" @keyup.enter="onPressEnter" autocomplete="off"/>
                    <div class="p-2 pr-3 cursor-pointer" @click="onPressEnter">
                        <Icon name="ph:magnifying-glass" size="25" color="#3A3A3A" />
                    </div>
                </div>
                <div v-else id="text-input-mobile" class="border border-primary flex items-baseline justify-end rounded-full w-full min-w-[20px]" :class="isGray ? 'bg-[#ECECEC]' : 'bg-third-color'" @click="onTapSearchBar">
                    <div class="p-2 pr-3 cursor-pointer" >
                        <Icon name="ph:magnifying-glass" size="25" color="#3A3A3A" />
                    </div>
                </div>
            </div>
            <!-- searchResult -->
            <!-- <div v-if="searchResult && searchResult.length > 0" id="search-result"
                class="absolute border-2 border-primary bg-third-color rounded-lg p-4 min-w-[200px] w-[90vw] flex flex-col gap-4 px-6 mt-1 max-h-[240px] overflow-y-scroll scroll-radius-8px">
                <SearchSuggestion v-for="card in searchResult" :key="card.id" :id="card.id" :is-mobile="true" :title="card.title" :image-src="card.image" />
            </div> -->
        </div>

    </nav>
</template>

<script setup lang="ts">

const { isGray, bg, inStyle } = defineProps<{
    isGray?: boolean,
    bg?: string,
    inStyle?: string,
    isTypingActive?: boolean,
}>()

const emit = defineEmits(['onInput'])

const searchAppBar = defineModel<string>()

onMounted(() => {
    inputRef.value?.focus()
})

const inputRef = ref<HTMLInputElement|null>()

const onTapSearchBar = () => {
    navigateTo('search-page')
}

const router = useRouter()
const onTapBack = () => {
    router.back()
}

const onPressEnter = async () => {
    await navigateTo({
        path: '/search-result',
        query: {
            search: searchAppBar.value
        }
    })
}


</script>