<template>
    <main class="py-[80px] min-h-[47svh] flex flex-col items-center pb-10 h-full w-full font-Inconsolata min-w-[320px] gap-10">
        <h1 class="text-third-color tracking-wider text-xl flex justify-center">
            <strong class="bg-primary px-3 py-2">
                Profile
            </strong>
        </h1>

        <!-- <ClientOnly> -->
        <section id="content" class="min-w-[60vw] p-7 bg-third-color rounded-[25px] border-2 border-primary relative flex flex-col gap-2 justify-center mx-2 md:mx-0">
            <div class="absolute top-3 right-5 text-primary text-base flex flex-row items-center gap-2 tracking-wider cursor-pointer" @click="navigateToProfileEdit">
                <span class="hidden md:inline-block">edit</span>
                <Icon name="mynaui:edit-one" size="25"/>
            </div>
            <RowProfileDetail title="name" :value="profileStore.name"/>
            <RowProfileDetail title="Phone Number" :value="`+62${profileStore.phoneNumber}`"/>
            <RowProfileDetail title="Province" :value="profileStore.province.name"/>
            <RowProfileDetail title="City" :value="profileStore.city.name"/>
            <RowProfileDetail title="Detail Address" :value="profileStore.additionalAddress"/>
        </section>
        <!-- </ClientOnly> -->
    </main>

    <!-- <teleport v-if="state.loading" to="#pop-up">
        <Loading />
    </teleport> -->
    
</template>

<script setup lang="ts">

//  TODO URGENT error circular reference
const profileStore = useProfileStore()

const RowProfileDetail = defineComponent({
    props: {
        title: String,
        value: String,
    },
    setup(props) {
        return {}
    },
    render() {
        return h('div', { class: 'flex flex-row' }, [
            h('h3', { class: 'w-[100px] flex justify-between font-bold' }, [
                h('span', {}, this.title),
                h('span', {}, ':'),
            ]),
            h('span', { class: 'w-[20px]' }),
            h('span', { class: '' }, this.value)
        ]);
    }
});

const navigateToProfileEdit = () => {
    navigateTo('/profile/edit')
}

</script>
