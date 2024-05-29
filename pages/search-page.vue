<template>
    <AppbarSearchMobile :is-typing-active="true" :is-gray="true" in-style="bg-third-color border-b-[1px] border-primary" v-model="searchAppBar"/>
    <Loading v-if="isSearchLoading" />
    <div v-else class="px-2 flex flex-col gap-2 py-[100px]">
      <SearchSuggestion v-if="searchResult && searchResult.length > 0" v-for="card in searchResult" :key="card.id" :id="card.id" :title="card.title" :image-src="card.image" />
    </div>
    <Bottomnav />
</template>

<script setup lang="ts">
import type { TSearchResult } from '~/types/components/searchResult';
definePageMeta({
  layout: false
})

const supabaseClient = useSupabaseClient()

const {isSearchLoading, searchAppBar, searchResult} = useSearchProductAppBar()

</script>
