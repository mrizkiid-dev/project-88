<template>
    <div class="flex flex-col items-center justify-center mt-4">
        <div class="flex flex-col w-full container px-5 pt-10 md:py-0">
            <h3 class="font-bold">Result of '{{ keyword }}'</h3>
            <h5>{{ itemsLength }} items found</h5>
        </div>

        <div id="items-found" class="py-10">
            <ol class="
                grid grid-cols-2 gap-4 justify-items-center max-w-[1319px]
                md:grid-cols-3
                lg:grid-cols-4    
            ">
                <li v-for="item in items">
                    <Catalogue />
                </li>
            </ol>
        </div>

        <div id="pagination" class="flex w-full justify-center items-center gap-4 py-10">
            <ButtonBgYellow sytle-css="rounded-[5px] text-bold p-1">
                <Icon name="ic:outline-arrow-back-ios" size="27" />
            </ButtonBgYellow>

            <p class="font-semibold text-lg">
                Page {{ page }} of {{ pages }}
            </p>

            <ButtonBgYellow sytle-css="rounded-[5px] text-bold p-1">
                <Icon name="ic:outline-arrow-back-ios" size="27" class="rotate-180"/>
            </ButtonBgYellow>
        </div>        
    </div>
</template>

<script setup lang="ts">
const keyword = ref<string>('Javascript')
const items = ref([
        { title: 'title-test' },
        { title: 'title-test' },
        { title: 'title-test' },
        { title: 'title-test' },
        { title: 'title-test' },
        { title: 'title-test' },
        { title: 'title-test' },
        { title: 'title-test' },
        { title: 'title-test' },
        { title: 'title-test' },
        { title: 'title-test' },
        { title: 'title-test' },
]) 
const itemsLength = items.value.length

const pages = ref<number>(10)
const page = ref<number>(2)

</script>