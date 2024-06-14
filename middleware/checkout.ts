export default defineNuxtRouteMiddleware((to, from) => {
    const user = useSupabaseUser()
    const checkoutStore = useUserCheckout()

    if (user.value?.id === null) {
        return navigateTo('/auth/login')
    }

    if(to.fullPath === '/checkout' && checkoutStore.products.length < 1 ) {
        console.log('excute');
        return navigateTo('/cart')
    } 
})