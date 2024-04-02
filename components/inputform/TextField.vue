<template>
    <div class="flex flex-col">
        <div class="flex gap-1">
            <label v-if="title" class="text-base md:text-xl">{{ title }}</label>
            <span v-if="isMandatory" class="text-[#CC0202]">*</span>
        </div>
        <div class="w-full border rounded-[5px] min-h-[60px] px-3 flex items-center justify-between" :class="[{'bg-gray-darker': !isMandatory},{'border-error-red': error?.value || false}]">
            <input v-if="!isPassword" :type="inputType ?? 'text'" :id="title" :name="title" class="w-full focus:outline-none text-base md:text-lg" 
                    :class="{'bg-gray-darker': !isMandatory}" :placeholder="placeHolder" v-model="input" autocomplete="new-password">

            <div v-else class="flex flex-row w-full">
                <input v-if="isHide" type="password" :id="title" :name="title" class="w-full focus:outline-none text-base md:text-lg" 
                        :class="{'bg-gray-darker': !isMandatory}" :placeholder="placeHolder" v-model="input" autocomplete="new-password">

                <input v-else type="text" :id="title" :name="title" class="w-full focus:outline-none text-base md:text-lg" 
                        :class="{'bg-gray-darker': !isMandatory}" :placeholder="placeHolder" v-model="input" autocomplete="new-password">
                <div v-if="isPassword" @click="isHide = !isHide" class="cursor-pointer">
                    <Icon v-if="isHide" name="mdi:eye" size="20" />
                    <Icon v-else name="mdi:eye-off" size="20"/>
                </div>
            </div>
        </div>
        <p class="text-error-red">{{ error?.message }}</p>
    </div>
</template>

<script setup lang="ts">
import type { ITextField } from '~/types/components/textfield';

const { title, placeHolder, isPassword, isMandatory, error } = defineProps<ITextField>()

const isHide = ref<boolean>(true)
const input = defineModel<string | number>({ required: true})
// const input = ref<string>()

</script>

<style scoped>

</style>