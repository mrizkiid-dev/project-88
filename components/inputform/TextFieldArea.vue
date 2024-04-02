<template>
    <div class="flex flex-col">
        <div class="flex gap-1">
            <label v-if="title" class="text-base md:text-xl">{{ title }}</label>
            <span v-if=isMandatory class="text-[#CC0202]">*</span>
        </div>
        <div class="w-full border rounded-[5px] min-h-[60px] px-3 flex items-center justify-between" :class="{'bg-gray-darker': !isMandatory}">
            <textarea
                :id="title" :name="title" rows="6" :placeholder="placeHolder"
                class="w-full resize-none p-2 focus:outline-none"
                :class="{'bg-gray-darker': !isMandatory}"
                v-model="input"
            />
        </div>
    </div>
</template>

<script setup lang="ts">
const { title, placeHolder, isMandatory } = defineProps<{
    title?: string,
    placeHolder?: string,
    isMandatory?: boolean,
}>()



const isHide = ref<boolean>(true)
const input = defineModel<string>({ required: true})
// const input = ref<string>()

</script>

<style scoped>

</style>