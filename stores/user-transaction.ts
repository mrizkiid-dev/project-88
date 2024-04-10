import { defineStore } from "pinia";
import type { ICart } from "~/types/pages/cart";
export const useUserTransactionStore = defineStore('user-transaction', {
    state: () => ({
        cartCount: 0 as number,
        cartItems: [
            {
              id: 'id1',
              title: 'title1 asdfjlasfjlaksfj adfaljlajdf adfajl',
              imageSrc: '/img/products/product-example-1.png',
              price: 100000,
              quantity: 1,
              checked: false,
            },
            {
              id: 'id2',
              title: 'title2',
              imageSrc: '/img/products/product-example-1.png',
              price: 100000,
              quantity: 1,
              checked: false,
            },
            {
              id: 'id3',
              title: 'title2',
              imageSrc: '/img/products/product-example-1.png',
              price: 100000,
              quantity: 1,
              checked: false,
            },
            {
              id: 'id4',
              title: 'title3',
              imageSrc: '/img/products/product-example-1.png',
              price: 100000,
              quantity: 1,
              checked: false,
            },
            {
              id: 'id5',
              title: 'title4',
              imageSrc: '/img/products/product-example-1.png',
              price: 100000,
              quantity: 1,
              checked: false,
            },
          ] as ICart[],
        totalPayment: 0 as number
    }),
    actions: {

    }
})