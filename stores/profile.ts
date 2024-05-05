import { defineStore } from 'pinia'
import type { city, province } from '~/types/database/profile'
import type { IDatabase } from '~/types/database/supabase'
import type { ICart } from '~/types/pages/cart'
export const useProfileStore = defineStore('profile-store', {
    state: () => {
        return {
            uuid: '' as string,
            sessionId: '' as string,
            name: '' as string,
            emal: '' as string,
            phoneNumber: '' as string,
            province: {} as province,
            city: {} as city,
            district: '' as string,
            additionalAddress: '' as string,
            cart: [] as ICart[]
        }
    },
    actions: {
        async initCart() {
            try {
                if (this.sessionId !== '') {
                    const {data , error} = await useSupabaseClient<IDatabase>().from('cart_item').select(`id,qty,product(name,price),product_image(image_url)`).eq('session_id',this.sessionId)
                    if(data !== null && error === null) {
                        let cart_temp: ICart
                        data.forEach(cart => {
                            cart_temp = {} as ICart
                            cart_temp.id = cart.id
                            cart_temp.imageSrc = cart.product_image[0].image_url
                            cart_temp.title = cart.product[0].name
                            cart_temp.price = cart.product[0].price
                            cart_temp.quantity = cart.qty
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
                const {data , error} = await useSupabaseClient<IDatabase>().from('user').select(`uuid,name,email,shopping_session(id),user_address(whatsapp_number,province,city,district,additonal_address)`).eq('uuid',useSupabaseUser().value?.id).limit(1)
                if (error) {
                    throw new Error(JSON.stringify(error));
                }

                if (data !== null && data.length > 0 && error === null) {
                    this.uuid = data[0].uuid
                    this.sessionId = data[0].shopping_session[0].id
                    this.name = data[0].shopping_session[0].id
                    // todo not yet done
                }

                await this.initCart()
            } catch (error) {
                console.log('error initProfile = ',error);
            }
        }
    },
})