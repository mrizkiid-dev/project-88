<template>
    <div class="background-grid bg-secondary">
        <AppbarLogo/>
        
        <slot>

        </slot>
    </div>
</template>

<script setup lang="ts">
const store = useAppStore()
const { isMobile, width } = useScreen()
store.isMobile = isMobile.value

</script>