<template>
    <Appbar>
        <div class="flex items-center justify-between text-primary w-full">
            <div class="flex flex-[2] items-baseline gap-3">
                <div id="logo" class="flex-initial">
                    <NuxtLink to="">
                        <h1 class="font-Dela-Gothic-One text-xl">Project 88</h1>
                    </NuxtLink>
                </div>
                <div id="explore" class="">
                    <NuxtLink>
                        <h1 class="font-Dela-Gothic-One text-base">Explore</h1>
                    </NuxtLink>
                </div>
            </div>
            <div id="searcbar" class="flex-[7]">
                <div class="min-w-[300px] border-4 border-primary rounded-full flex pl-6">
                    <input type="text"
                        class="
                            w-full
                            focus:outline-none
                            font-Inconsolata
                        "
                        placeholder="Case Iphone Javascript"
                        :v-model="searchAppBar"
                    >
                    <div class="flex items-center gap-2">
                        <Icon v-if="isSearching" name="eos-icons:loading" size="25"/>
                        <div class="flex items-center justify-center p-2 px-3 bg-primary rounded-r-[15px]">
                            <icon name="ion:search" size="25" color="#ffffffff"/>
                        </div>
                    </div>
                </div>
            </div>
            <div class="flex flex-[2] gap-3 justify-end">
                <div id="cart" class="first-of-type:">
                    <NuxtLink to="">
                        <Icon name="uil:cart" class="text-[40px] "/>
                    </NuxtLink>
                </div>
                <div id="profile" class="">
                    <NuxtLink to="">
                        <Icon name="iconamoon:profile-fill" class="text-[40px]"/>
                    </NuxtLink>
                </div>
                <div id="chat" class="">
                    <NuxtLink to="">
                        <Icon name="lets-icons:chat" class="text-[40px]"/>
                    </NuxtLink>
                </div>
            </div>
        </div>
    </Appbar>      

</template>

<script setup lang="ts">
// const searchAppBar = ref<String>('')
const isSearching = ref<boolean>(true)

const searchAppBar = defineModel<string>()
</script>