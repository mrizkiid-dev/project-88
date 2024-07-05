<template>
    <div class="marquee">
      <div class="marquee__inner">
        <span>Welcome to our store | We have a lot of merch design that perhaps suit with your preferences | These are our best seller |</span>
        <span>Welcome to our store | We have a lot of merch design that perhaps suit with your preferences | These are our best seller |</span>
      </div>
    </div>
  </template>
  
  
  
  
  <script setup>
  import { computed } from 'vue';
  definePageMeta({
    layout: false
})
  </script>
  
  <style scoped>
.marquee {
  overflow: hidden;
  white-space: nowrap;
  box-sizing: border-box;
  width: 100%;
}

.marquee__inner {
  display: inline-block;
  white-space: nowrap;
  will-change: transform;
  animation: marquee 30s linear infinite;
}



@keyframes marquee {
  0% {
    transform: translateX(0%);
  }
  100% {
    transform: translateX(-50%);
  }
}
</style>

  

  