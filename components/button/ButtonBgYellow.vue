<template>
    <button :disabled="disabled" @click="onTap" class="rounded-md text-primary " 
            :class="[
                sytleCss,
                {'bg-gray-darker': disabled}, 
                {'bg-secondary border border-primary': !disabled}
            ]">
        {{ title }}
        <slot>
            
        </slot>
    </button>
</template>

<script setup lang="ts">
const { disabled, sytleCss, title } = defineProps<{
    disabled?: boolean,
    sytleCss?: string,
    title?: string
}>()

const emit = defineEmits<{
    onTap: []
}>()

const onTap = () => {
    emit('onTap')
}


</script>
