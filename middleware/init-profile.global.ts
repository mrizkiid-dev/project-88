export default defineNuxtRouteMiddleware( async (to, from) => {
    const user = useSupabaseUser()
    const profileStore = useProfileStore()

    if (import.meta.server) return

    if(profileStore.uuid === '' || user.value?.id === null) {
        await profileStore.initProfile()
    }

    if(profileStore.city.id === undefined) {
        await profileStore.initAddress()
    }
    
})