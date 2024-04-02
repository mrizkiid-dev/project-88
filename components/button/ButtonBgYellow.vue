<template>
    <button :disabled="disabled" @click="onTap" class="bg-secondary border border-primary rounded-md text-primary " :class="sytleCss">
        {{ title }}
    </button>
</template>

<script setup lang="ts">
const { disabled, sytleCss, title } = defineProps<{
    disabled?: boolean,
    sytleCss?: string,
    title: string
}>()

const emit = defineEmits<{
    onTap: []
}>()

const onTap = () => {
    emit('onTap')
}


</script>
