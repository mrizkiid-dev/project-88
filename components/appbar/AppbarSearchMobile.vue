<template>
    <nav class="fixed h-[60px] flex items-center gap-2 justify-center w-full px-[20px]" :class="bg ? bg : 'bg-none'">
        <div id="text-input-mobile" class=" border border-primary flex items-baseline rounded-full w-full min-w-[20px]" :class="isGray ? 'bg-[#ECECEC]' : 'bg-third-color'">
            <input type="text" 
                class="
                    w-full
                    placeholder-gray-400
                    text-sm
                    pl-3
                    focus:outline-none
                    rounded-full"
                :class="isGray ? 'bg-[#ECECEC]' : 'bg-third-color'"
                v-model="searchAppBar"    
                >
            <div class="p-2 pr-3 cursor-pointer" >
                <Icon name="ph:magnifying-glass" size="25" color="#3A3A3A" />
            </div>
        </div>
        <div id="cart-mobile" 
            class="rounded-full p-2 border border-primary cursor-pointer"
            :class="isGray ? 'bg-[#ECECEC]' : 'bg-third-color'"
        >
            <NuxtLink to="">
                <Icon name="uil:cart" size="30" color="#3A3A3A" />
            </NuxtLink>
        </div>
    </nav>
</template>

<script setup lang="ts">
const { isGray, bg } = defineProps<{
    isGray?: boolean,
    bg?: string
}>()


const searchAppBar = defineModel<string>()



</script>