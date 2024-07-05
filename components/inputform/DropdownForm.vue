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
            <div v-if="isShowDropDown && (choose !== undefined && choose.length > 0)"
                class="border border-primary absolute z-[3] w-full max-h-[200px] mt-2 rounded-md overflow-y-scroll scroll-radius py-3 flex flex-col gap-1 drop-shadow-md" 
                :class="[{'bg-gray-darker': !isMandatory}, {'bg-third-color': isMandatory}]">
                <div v-for="item in choose" :key="item.id">
                    <div class="hover:bg-third-color cursor-pointer px-3 select-none" @click="vForm(item)" >{{ item.name }}</div>
                </div>
                <!-- <div v-if="choose !== undefined">
                    <div v-for="item in choose" :key="item.id">
                        <div class="hover:bg-third-color cursor-pointer px-3 select-none" @click="vForm(item)" >{{ item.name }}</div>
                    </div>
                </div>
                <div v-else>
                    <p class="py-4">Data Kosong</p>
                </div> -->
            </div>
            <div v-else-if="isShowDropDown && (choose === undefined || (choose !== undefined && choose.length === 0))" 
                class="border border-r-error-red absolute z-[3] w-full max-h-[200px] mt-2 rounded-md py-3 flex justify-center drop-shadow-md" 
                :class="[{'bg-gray-darker': !isMandatory}, {'bg-third-color': isMandatory}]">
                <p class="">{{ emptyWarning }}</p>
            </div>
        </div>
        <p class="text-error-red">{{ error?.message }}</p>
    </div>
</template>

<script setup lang="ts">
import type { IChoose, IDropdownForm } from '~/types/components/dropdownForm'
const { title, placeHolder, isMandatory, error, choose, loading, isShowDropDown, emptyWarning } = defineProps<IDropdownForm>()

const input = defineModel<IChoose | null>({ required: true})
// const isShowDropDown = ref<boolean>(false)
// const input = ref<string>()
const emit = defineEmits<{
    onTap: [],
    onTapDropDown: []
}>()

const vForm = (item: IChoose) => {
    input.value = item
    // isShowDropDown.value = false
    emit('onTapDropDown')
}

const showListOfValue = () => {
    // isShowDropDown.value = !isShowDropDown.value
    emit('onTap')
}

</script>

<style scoped>

</style>