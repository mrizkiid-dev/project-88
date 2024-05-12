import { defineStore } from "pinia";
import type { TCheckout, TShipping } from "~/types/checkout";

export const useUserCheckout = defineStore('user-checkout', {
    state: () => {
        return {
            subTotal: 0 as number,
            totalPayment: 0 as number,
            shipping: {} as TShipping,
            products: [] as TCheckout[]
        }
    },
})