import { defineStore } from "pinia";
import type { TCheckout, TShipping } from "~/types/checkout";

export const useUserCheckout = defineStore('user-checkout', {
    state: () => {
        return {
            subTotal: 0 as number,
            totalWeight: 0 as number,
            totalPayment: 0 as number,
            shipping: {} as TShipping,
            products: [] as TCheckout[]
        }
    },
    actions: {
        async initShipping( origin: number | string | null ) {
            if (this.totalWeight && origin) {
                const response = await $fetch('/api/shipping/cost', {
                    method: 'POST',
                    body: {
                        origin: origin,
                        destination: '427',
                        weight: this.totalWeight,
                    }
                })

                if (response && typeof response === 'object' 
                    && 'service' in response && 'price' in response && 'estimate' in response) {
                    this.shipping.service = response.service
                    this.shipping.price = response.price
                    this.shipping.estimate = response.estimate
                }
            }
        },
        async initCheckout(subTotal: number, totalWeight: number, totalPayment: number , origin: number | null) {
            this.subTotal = subTotal
            this.totalWeight = totalWeight
            this.totalPayment = totalPayment
            if (origin) {
                await this.initShipping(origin)
            }
        }
    }
})