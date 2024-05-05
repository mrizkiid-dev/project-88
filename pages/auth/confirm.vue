
<template>
  <div>
    <p class="u-text-black">
      Redirecting...
    </p>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: false
})
const user = useSupabaseUser()

watch(user, () => {
  if (user.value) {
    return navigateTo('/')
  }
}, { immediate: true })
</script>