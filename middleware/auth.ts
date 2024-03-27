export default defineNuxtRouteMiddleware((from, to) => {
    const user = useSupabaseUser()

    if(!user.value && to.fullPath == '/checkout') {
        return navigateTo('/auth')
    }

    if(!user.value && to.fullPath == '/cart') {
        return navigateTo('/auth')
    }

    if(user.value && (to.fullPath == '/auth/login' || to.fullPath == '/auth/signup')) {
        return navigateTo('/')
    }
})