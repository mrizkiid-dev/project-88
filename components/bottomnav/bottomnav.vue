<template>
    <footer class="fixed z-50 bottom-0 left-0 right-0 w-full">
        <div class="bg-third-color flex justify-between px-[27px] py-[10px] text-primary shadow-[0px_-2px_2px_0px_#F3F2F2]">
            <NuxtLink to="/" class="cursor-pointer">
                <Icon name="heroicons:home-solid" size="36" />
            </NuxtLink>
            <NuxtLink to="/cart" class="cursor-pointer">
                <Icon name="uil:cart" size="36" />
                <!-- <Icon name="material-symbols:explore-rounded" size="36" /> -->
            </NuxtLink>
            <div class="cursor-pointer" @click="openProfile">
                <Icon name="iconamoon:profile-fill" size="36" />
            </div>

            <!-- Pop Up Bottom -->
            <div v-if="isProfileShow" class="fixed z-50 right-0 bottom-0 w-full h-screen bg-primary opacity-50" @click="closeProfile"></div>
            <Transition>
                <div v-if="isProfileShow" class="fixed z-50 right-0 bottom-0 w-full min-h-[40vh] rounded-t-2xl bg-third-color flex flex-col gap-3">
                    <div class="flex justify-end py-3 px-3" @click="closeProfile">
                        <Icon name="mingcute:close-fill"/>
                    </div>
                    <div v-if="user">
                        <div class="flex justify-center tracking-wider overflow-ellipsis">
                            <strong>Hello, </strong>
                            <strong>{{ userDetail.name }}</strong>
                        </div>
                        <div class="bg-white px-2 py-1 shadow-sm cursor-pointer" @click="navigateToProfile">
                            Profile
                        </div>
                        <div class="bg-white px-2 py-1 shadow-sm cursor-pointer" @click="navigateToOrder">
                            Order
                        </div>
                        <div class="text-third-color flex justify-center mt-4">
                            <button v-if="user" @click="signOut" class="bg-primary rounded-md px-3 py-1">
                                sign out
                            </button>
                        </div>
                    </div>
                    <div v-else class="flex justify-center">
                        <button @click="signIn" class="bg-primary rounded-md px-3 py-1 text-third-color">
                                sign in
                        </button>
                    </div>
                </div>
            </Transition>
        </div>
    </footer>
</template>

<script setup lang="ts">
const user = useSupabaseUser()
const profileStore = useProfileStore()
const isProfileShow = ref<boolean>(false)
const closeProfile = () => {
    isProfileShow.value = false
}
const openProfile = () => {
    isProfileShow.value = true
}

const userDetail = reactive<{
    name: string,
    address: {
        province: string,
        city: string,
        district: string,
    }
}>(
    {
        name: profileStore.name || 'world',
        address: {
            province: 'Jawa Barat',
            city: 'Kota Bandung',
            district: 'Arcamanik'
        }
    }
)

const signOut = async () => {
    isProfileShow.value = false
    const { error } = await useSupabaseClient().auth.signOut()
    if (error) {
        console.log('error signout = ',error);
    } else {
        profileStore.$reset()
    }
}
const signIn = async () => {
    isProfileShow.value = false
    await navigateTo('/auth/login')
}

const navigateToOrder = async () => {
    isProfileShow.value = false
    navigateTo('/order')
}

const navigateToProfile = async () => {
    isProfileShow.value = false
    navigateTo('/profile')
}


onBeforeUnmount(() => {
    isProfileShow.value = false
})

</script>

<style scoped>

.v-enter-active,
.v-leave-active {
    transition: all 0.5s ease-out;
    transform: translateY(0);
    opacity: 1;
}

.v-enter-from,
.v-leave-to {
    transition: all 0.5s ease-in;
    transform: translateY(130%);
}

</style>
