<template>
    <footer class="fixed bottom-0 w-full">
        <div class="flex justify-between px-[27px] py-[10px] text-primary shadow-[0px_-4px_4px_0px_#F3F2F2]">
            <NuxtLink to="" class="cursor-pointer">
                <Icon name="heroicons:home-solid" size="36" />
            </NuxtLink>
            <NuxtLink to="" class="cursor-pointer">
                <Icon name="material-symbols:explore-rounded" size="36" />
            </NuxtLink>
            <div class="cursor-pointer" @click="openProfile">
                <Icon name="iconamoon:profile-fill" size="36" />
            </div>

            <!-- Pop Up Bottom -->
            <div v-if="isProfileShow" class="fixed z-50 right-0 bottom-0 w-full h-screen bg-secondary opacity-50" @click="closeProfile"></div>
            <Transition>
                <div v-if="isProfileShow" class="fixed z-50 right-0 bottom-0 w-full h-[50vh] bg-secondary transition-all duration-1000 ease-in">
                    <div class="flex justify-end border" @click="closeProfile">X</div>
                </div>
            </Transition>
        </div>
    </footer>
</template>

<script setup lang="ts">

const isProfileShow = ref<boolean>(false)
const closeProfile = () => {
    isProfileShow.value = false
}
const openProfile = () => {
    isProfileShow.value = true
}

onBeforeUnmount(() => {
    isProfileShow.value = false
})

</script>

<style scoped>

.v-enter-active,
.v-leave-active {
    /* transition: opacity 0.5s ease; */
    /* opacity: 1; */
    transition: all .75s ease;
    width: 100%;
    height: 50vh
}

.v-enter-from,
.v-leave-to {
    /* opacity: 0; */
    width: 100%;
    height: 0px;
}

</style>
