<template>
    <footer class="flex flex-col bg-[#EBEAEA]">
        <div class="flex flex-row justify-center">
            
            <div id="left" class="
                    container flex flex-col gap-4 border-r-2 border-b-2 border-primary justify-center items-center px-20 py-20 w-[50%] lg:px-32 lg:flex-row
                ">
                <div id="contact-us" class="flex-1 flex flex-col">
                    <h2 class="mb-4 font-black text-xl"> Contact Us </h2>
                    <p class="text-left mb-2">
                        If you have any question,<br>
                        please contact us at
                    </p>
                    <div id="phone-contact" class="flex flex-row gap-2 items-center">
                        <Icon name="solar:phone-bold" />
                        <p>082119777514</p>
                    </div>
                    <div id="email-contact" class="flex flex-row gap-2 items-center">
                        <Icon name="ic:outline-email" />
                        <p>project88@gmail.com</p>
                    </div>
                </div>

                <div id="wa" class="flex-1 flex flex-col gap-1">
                    <textarea rows="5" class="focus:outline-none border rounded-sm resize-none py-1 px-2" placeholder="hi ka ingin bertanya ..." v-model="inputWaMessage" />
                    <button class="bg-[#3A3A3A] w-full p-2 rounded-sm text-third-color" @click="submitWa">
                        chat us via whatsapp
                    </button>
                </div>
            </div>

            <div id="right" class="container flex flex-col border-b-2 border-primary justify-center items-start w-[50%] px-20 py-20 lg:px-32">
                <h2 class="mb-4 font-black text-xl"> Newsletter </h2>
                <p class="text-left mb-2">
                    Subscribe to our newsletter to receive<br>
                    the latest promotions and design updates from Project88
                </p>
                <input type="text" class="focus:outline-none border rounded-sm mb-2 w-full pl-3 py-2" placeholder="example@email.com" v-model="inputSubscriber" />
                <ButtonBgYellow title="Subscribe" sytle-css="px-4 py-1 rounded-sm" @on-tap="submitSubs"/>
            </div>
        </div>

        <div class="flex flex-row justify-start text-black py-3 gap-4 text-lg items-center pl-10">
            <Icon name="fa:facebook" />
            <Icon name="bi:instagram" />
            <Icon name="iconoir:x" />
            <Icon name="mdi:youtube" class="text-2xl"/>
        </div>

        <div id="copyright" class="text-xl font-medium text-third-color w-full text-center py-2 bg-primary">
            Copyright © 2024 Project88. All Rights Reserved
        </div>
    </footer>
</template>

<script setup lang="ts">
const profileStore = useProfileStore()

const inputSubscriber = ref<string>('')
if (profileStore.email !== '') {
    inputSubscriber.value = profileStore.email
}
const submitSubs = () => {
    console.log(inputSubscriber.value);
    
}

const inputWaMessage = ref<string>('')
watch(inputWaMessage , (a) => {
    console.log('a = ',a);
    
})
const submitWa = () => {
    const encodeParam = encodeURIComponent(inputWaMessage.value)
    const urlsWa = `https://wa.me/+6282119777514?text=${encodeParam}`
    
    window.open(urlsWa)

}

</script>
