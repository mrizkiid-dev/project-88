<template>
    <li class="flex flex-row items-start border px-2 py-4 gap-2 rounded-lg shadow-[0px_4px_4px_0px_#CACACA40]">
        <input type="checkbox" :id="id?.toString()" :value="id" v-model="checked" :disabled="quantity === 0" @click="onClickCheckbox">
        <div><img :src="imageSrc" :alt="title" width="60px" height="60px" class="rounded-md"></div>
        <div class="flex flex-col gap-1 w-full">
            <h2 class="text-ellipsis line-clamp-1 text-xl font-semibold p-0 m-0">{{ title }}</h2>
            <p class=" font-medium" >Rp. {{ price }}</p>
            <div class="flex flex-row items-center justify-between w-full">
                <div id="qty" class="flex flex-row rounded-3xl border overflow-hidden">
                    <span @click="decrease()" class="px-3 bg-gray-darker border-r-[1px] cursor-pointer select-none">-</span>
                    <span class="px-3">{{ quantity }}</span>
                    <span @click="increase" class="px-3 bg-gray-darker border-l-[1px] cursor-pointer select-none">+</span>
                </div>
                <div class="" @click="deleteCart">
                    <Icon name="fa6-solid:trash-can" class="text-primary" />
                </div>
            </div>
        </div>
    </li>
</template>

<script setup lang="ts">
import type { ICart } from '~/types/pages/cart'
const {id, imageSrc, title, price, quantity } = defineProps<Partial<ICart>>()
const emit = defineEmits<{
    increase: [],
    decrease: [],
    deleteCart: [],
    click: []
}>()

const checked = defineModel<number[]>('checked')

const increase = () => {
    emit('increase')
}
const decrease = () => {
    emit('decrease')
}

const deleteCart = () => {
    emit('deleteCart')
}

const onClickCheckbox = () => {
    emit('click')
}
</script>
