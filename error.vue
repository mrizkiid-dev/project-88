<template>
    <div>
        <b>aaa</b>
      <h2>error = {{ error?.message }}</h2>
      <button @click="handleError">Clear errors</button>
    </div>
</template>

<script setup lang="ts">
import type { NuxtError } from '#app';


const props = defineProps({
  error: Object as () => NuxtError
})

console.log(props);


const handleError = () => clearError({ redirect: '/product' })
</script>


