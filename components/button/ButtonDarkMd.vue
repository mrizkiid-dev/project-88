<template>
    <button :disabled="disable" class="w-full min-h-[40px] rounded-[5px] md:rounded-[15px] md:min-h-[60px]" 
            :class="[
                styleCss, 
                {'bg-gray-darker text-primary': disable}, 
                {'bg-primary text-third-color': !disable}
            ]" 
            @click="onClick">
        <span class="text-lg md:text-2xl">{{ title }}</span>
    </button>
</template>

<script setup lang="ts">
const { title, styleCss, disable }  = defineProps<{
    title: string,
    styleCss?: string
    disable?: boolean
}>()

const emit = defineEmits<{
    onClick: []
}>()

const onClick = () => {
    emit('onClick')
}

</script>
