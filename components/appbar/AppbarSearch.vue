<template>
    <Appbar>
        <div class="flex items-center justify-between text-primary container">

            <div class="flex flex-[2] items-baseline gap-3">
                <div id="logo" class="flex-initial">
                    <NuxtLink to="/">
                        <h1 class="font-Dela-Gothic-One text-xl">Project 88</h1>
                    </NuxtLink>
                </div>
                <!-- Feature Future -->
                <!-- <div id="explore" class="">
                    <NuxtLink>
                        <h1 class="font-Dela-Gothic-One text-base">Explore</h1>
                    </NuxtLink>
                </div> -->
            </div>

            <div id="searcbar" class="flex-[7] relative" >
                <div class="min-w-[300px] border-4 border-primary rounded-full flex pl-6">
                    <input type="text"
                        class="
                            w-full
                            focus:outline-none
                            font-Inconsolata
                        "
                        placeholder="Case Iphone Javascript"
                        v-model="searchAppBar"
                    >
                    <div class="flex items-center gap-2">
                        <Icon v-if="isSearchLoading" name="eos-icons:loading" size="25"/>
                        <div class="flex items-center justify-center p-2 px-3 bg-primary rounded-r-[15px]">
                            <icon name="ion:search" size="25" color="#ffffffff"/>
                        </div>
                    </div>
                </div>

                <!-- searchResult -->
                <div v-if="searchResult && searchResult.length > 0" id="search-result" class="absolute border-2 border-primary bg-third-color rounded-lg p-4 w-full flex flex-col gap-4 px-6 mt-1 max-h-[300px] overflow-y-scroll scroll-radius">
                    <SearchSuggestion v-for="card in searchResult" :key="card.id" :id="card.id" :title="card.title" :image-src="card.image" />
                </div>
            </div>

            <div class="flex flex-[2] gap-3 justify-end">
                <div id="cart" class="first-of-type:">
                    <NuxtLink to="/cart">
                        <Icon name="uil:cart" class="text-[40px] "/>
                    </NuxtLink>
                </div>
                <div id="profile" class="" @mouseenter="isProfileShow = true" @mouseleave="isProfileShow = false">
                    <Icon name="iconamoon:profile-fill" class="text-[40px]"/>
                    <div v-if="isProfileShow" class="absolute min-w-[200px] rounded-[10px] -translate-x-[5rem] bg-third-color border flex flex-col gap-2 justify-start px-1 py-5">
                        <div v-if="user">
                            <div class="flex justify-center tracking-wider">
                                <strong>Hello, </strong>
                                <strong>{{ userDetail.name }}</strong>
                            </div>
                            <div class="bg-white px-2 py-1 shadow-sm cursor-pointer" @click="">
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
const supabaseClient = useSupabaseClient()
const user = useSupabaseUser()
const profileStore = useProfileStore()

const { searchResult } = defineProps<{
    searchResult?: any,
    isSearchLoading? : boolean
}>()

const isProfileShow = ref<boolean>(false)

const signOut = async () => {
    profileStore.$reset()
    const { error } = await supabaseClient.auth.signOut()
}
const signIn = async () => {
    await navigateTo('/auth/login')
}

const searchAppBar = defineModel<string>()

const userDetail = reactive<{
    name: string,
    address: {
        province: string,
        city: string,
        district: string,
    },
    order: []
}>(
    {
        name: 'Muhammad Rizki',
        address: {
            province: 'Jawa Barat',
            city: 'Kota Bandung',
            district: 'Arcamanik'
        },
        order: []
    }
)

const navigateToOrder = () => {
    navigateTo('/order')
}

</script>