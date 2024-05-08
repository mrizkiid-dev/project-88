export default defineNuxtRouteMiddleware((to, from) => {
    const user = useSupabaseUser()

    if(user.value === null && to.fullPath == '/checkout') {
        return navigateTo('/auth/login')
    }

    if(user.value === null && to.fullPath == '/cart') {
        return navigateTo('/auth/login')
    
    }
    if(user.value === null && to.fullPath == '/order') {
        return navigateTo('/auth/login')
    }

    if(user.value && (to.fullPath == '/auth/login' || to.fullPath == '/auth/signup')) {
        return navigateTo('/')
    }
})