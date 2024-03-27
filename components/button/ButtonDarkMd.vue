<template>
    <button class="w-full min-h-[40px] bg-primary rounded-[5px] md:rounded-[15px] md:min-h-[60px]" :class="styleCss ?? ''" @click="onClick">
        <span class="text-third-color text-lg md:text-2xl">{{ title }}</span>
    </button>
</template>

<script setup lang="ts">
const { title }  = defineProps<{
    title: string,
    styleCss?: string
}>()

const emit = defineEmits<{
    onClick: []
}>()

const onClick = () => {
    emit('onClick')
}

</script>
