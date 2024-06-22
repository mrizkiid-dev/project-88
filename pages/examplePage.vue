<template>
    <main class="pt-[60px]">
        
        <!-- <p>{{ result }}</p> -->
    </main>
</template>

<script setup lang="ts">
import type { TCostPost } from '~/types/api/cost-post';

const { isMobile } = useScreen()
const client = useSupabaseClient()

const isLoading = ref<boolean>(false)

onMounted(
    async () => {
        const input = {
            name: 'name test jun 21',
            nophone: 892222222222,
            provinceid: '21',
            province: 'jawa barat test jun 21',
            cityid: '21',
            city: 'bandung test jun 21',
            additionaladdress: 'rt 003 rw 004 test jun 21',
            postalcode: 45363,
        }


        let { data, error } = await useSupabaseClient<any>()
        .rpc('update_profile', {
            input
        })
        if (error) console.error(error)
        else console.log(data)
    }
)





</script>