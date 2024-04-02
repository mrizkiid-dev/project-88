<template>
    <article class="border border-primary rounded-3xl w-[150px] sm:w-[200px] md:w-[220px] xl:w-[270px] flex flex-col overflow-hidden">
        <img src="/img/product-example-1.png" alt="" class="w-full border-b-2 border-primary">
        <div id="product-detail" class="text-primary bg-third-color flex flex-col items-start justify-start px-4 py-1 gap-0 md:gap-2">
            <h2 id="title-product" class="overflow-hidden text-ellipsis line-clamp-2 text-base">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </h2>
            <h3 id="price" class="font-bold text-base md:text-xl">
                Rp.{{ price }}
            </h3>
            <div id="see-more" class="flex w-full justify-end">
                <button class="rounded-md border bg-secondary text-primary font-bold text-base py-1 px-2 mt-5 mb-3 md:text-xl">
                    see more ...
                </button>
            </div>
        </div>
    </article>
</template>

<script setup lang="ts">

const price = ref<string>('787.500')

</script>