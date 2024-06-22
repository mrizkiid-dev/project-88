<template>
    <AppbarSearchMobile :is-typing-active="true" :is-gray="true" in-style="bg-third-color border-b-[1px] border-primary" v-model="searchAppBar"/>
    <!-- <Loading v-if="isSearchLoading" /> -->
    <div class="px-2 flex flex-col gap-2 py-[100px]">
      <div v-show="isSearchLoading" class="flex justify-center">
          <Icon name="eos-icons:loading" size="25" />
      </div>
      <SearchSuggestion v-show="!isSearchLoading && searchResult && searchResult.length > 0" v-for="card in searchResult" :key="card.id" :id="card.id" :title="card.title" :image-src="card.image" />
    </div>
    <Bottomnav />
</template>

<script setup lang="ts">
definePageMeta({
  layout: false
})

const supabaseClient = useSupabaseClient()

const {isSearchLoading, searchAppBar, searchResult} = useSearchProductAppBar()

</script>
