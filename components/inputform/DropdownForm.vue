<template>
    <div class="flex flex-col ">
        <div class="flex gap-1">
            <label v-if="title" class="text-base md:text-xl select-none">{{ title }}</label>
            <span v-if="isMandatory" class="text-[#CC0202]">*</span>
        </div>
        <div class="relative">
            <div class="w-full border rounded-[5px] min-h-[60px] px-3 flex items-center justify-between cursor-pointer" :class="[{'bg-gray-darker': !isMandatory}, {'bg-third-color': isMandatory}]"
                @click="showListOfValue"
                >
                <div v-if="!input" class="text-[#A5ABB6] select-none">{{ placeHolder }}</div>
                <div v-else class="select-none">{{ input.name }}</div>
                <div class="flex items-center">
                    <Icon v-if="loading" name="eos-icons:loading" size="25" class="text-[#828282] "/>
                    <div class="" >
                        <Icon v-if="isShowDropDown" name="ri:arrow-drop-down-line" size="40" class="text-[#828282] rotate-180"/>
                        <Icon v-else name="ri:arrow-drop-down-line" size="40" class="text-[#828282] "/>
                    </div>
                </div>
            </div>
            <div v-if="isShowDropDown" 
                class="border border-primary absolute z-[2] w-full h-[200px] mt-2 rounded-md overflow-y-scroll py-3 flex flex-col gap-1" 
                :class="[{'bg-gray-darker': !isMandatory}, {'bg-third-color': isMandatory}]">
                <div v-for="item in choose" :key="item.id">
                    <div class="hover:bg-third-color cursor-pointer px-3 select-none" @click="vForm(item)" >{{ item.name }}</div>
                </div>
            </div>
        </div>
        <p class="text-error-red">{{ error?.message }}</p>
    </div>
</template>

<script setup lang="ts">
import type { IChoose, IDropdownForm } from '~/types/components/dropdownForm'
const { title, placeHolder, isMandatory, error, choose, loading } = defineProps<IDropdownForm>()

const input = defineModel<IChoose | null>({ required: true})
const isShowDropDown = ref<boolean>(false)
// const input = ref<string>()
const emit = defineEmits<{
    onTap: []
}>()

const vForm = (item: IChoose) => {
    input.value = item
    isShowDropDown.value = false
}

const showListOfValue = () => {
    isShowDropDown.value = !isShowDropDown.value
    emit('onTap')
}

</script>

<style scoped>

</style>