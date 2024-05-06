import { defineStore } from 'pinia'
import type { city, province } from '~/types/database/profile'
import type { IDatabase } from '~/types/database/supabase'
import type { ICart } from '~/types/pages/cart'
export const useProfileStore = defineStore('profile-store', {
    state: () => {
        return {
            isLoading: false as boolean,
            uuid: '' as string,
            sessionId: '' as string,
            name: '' as string,
            email: '' as string,
            phoneNumber: 0 as number | string | null,
            province: {} as province,
            city: {} as city,
            district: '' as string,
            additionalAddress: '' as string,
            cart: [] as ICart[],
            totalPayment: 0 as number 
        }
    },
    actions: {
        async initCart() {
            try {
                if (this.sessionId !== '') {
                    const {data , error} = await useSupabaseClient<IDatabase>().from('cart_item').select(`id,qty,product(name,price,product_image(image_url))`).eq('session_id',this.sessionId).returns<{id: any;
                        qty: any;
                        product: {
                            name: any;
                            price: any;
                            product_image: {
                                image_url: any;
                            }[];
                        };
                    }[]>()
                    console.log('cart item = ',data);
                    
                    if(data !== null && error === null) {
                        let cart_temp: ICart
                        data.forEach(cart => {
                            console.log('cart = ',cart);
                            
                            cart_temp = {} as ICart
                            cart_temp.id = cart.id
                            cart_temp.title = cart.product.name
                            cart_temp.price = cart.product.price
                            cart_temp.quantity = cart.qty
                            cart_temp.checked = false
                            cart_temp.imageSrc = cart.product.product_image[0].image_url
                            this.cart.push(cart_temp)
                        });
                    }
        
                    if (error) {
                        throw new Error(JSON.stringify(error));  
                    }
                }
            } catch (error) {
                console.log('error initCart = ',error);
            }
        },
        async initProfile() {
            try {
                const {data , error} = await useSupabaseClient<IDatabase>().from('user').select(`uuid,name,email,shopping_session(id,total_price),user_address(whatsapp_number,province,city,district,additional_address)`).eq('uuid',useSupabaseUser().value?.id).limit(1)
                if (error) {
                    throw new Error(JSON.stringify(error));
                }

                if (data !== null && data.length > 0 && error === null) {
                    console.log('it is happen');
                    
                    this.uuid = data[0].uuid
                    this.sessionId = data[0].shopping_session[0].id
                    this.name = data[0].shopping_session[0].id
                    this.email = data[0].email
                    this.totalPayment = data[0].shopping_session[0].total_price

                    if ('user_address' in data && isArray(data.user_address) && data.user_address.length > 0) {
                        this.phoneNumber = data[0].user_address[0].whatsapp_number
                        this.province = data[0].user_address[0].province ?? ''
                        this.city = data[0].user_address[0].city ?? ''
                        this.district = data[0].user_address[0].district ?? ''
                        this.additionalAddress = data[0].user_address[0].additional_address ?? ''
                    }
                }

                await this.initCart()
            } catch (error) {
                console.log('error initProfile = ',error);
            }
        }
    },
})