import { defineStore } from 'pinia'
import { deleteCartItem, getCartItemProduts } from '~/data/repository/cart_item_impl'
import { getInitProfile } from '~/data/repository/profile_impl'
import { getInitUserAddress } from '~/data/repository/user_address_impl'
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
            subTotal: 0 as number,
            totalPayment: 0 as number 
        }
    },
    getters: {
        isAdressNotEmpty: (state) => (state.city.id !== '' && state.city.id !== null && state.city.id !== undefined),
        isUserEmpty: (state) => ( state.uuid === '' )
    },
    actions: {
        async initCart() {
            try {
                this.cart = []
                if (this.sessionId !== '') {
                    // -- old
                    // const {data , error} = await useSupabaseClient<IDatabase>().from('cart_item').select(`id,qty,product(id,name,price,product_image(image_url),qty,weight)`).eq('session_id',this.sessionId).returns<{id: any;
                    //     qty: any;
                    //     product: {
                    //         id: any
                    //         name: any;
                    //         price: any;
                    //         qty: any
                    //         weight: any
                    //         product_image: {
                    //             image_url: any;
                    //         }[];
                    //     };
                    // }[]>()

                    // -- new
                    const { data, error } = await getCartItemProduts(this.sessionId)
                    if(data !== null && error === null) {
                        let cart_temp: ICart
                        let ids = [] as number[]
                        data.forEach(cart => {
                            console.log('cart = ',cart);
                            ids.push(cart.product.id)
                            cart_temp = {} as ICart
                            cart_temp.cartId = cart.id
                            cart_temp.id = cart.product.id
                            cart_temp.maxQty = 0
                            // cart_temp.productId = cart.product.id
                            cart_temp.title = cart.product.name
                            cart_temp.price = cart.product.price
                            cart_temp.quantity = cart.qty
                            cart_temp.productQuantity = cart.product.qty
                            cart_temp.productWeight = cart.product.weight
                            cart_temp.checked = false
                            cart_temp.imageSrc = cart.product.product_image[0].image_url
                            this.cart.push(cart_temp)
                        });
                        await this.initMaxQts(ids)
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
                if (useSupabaseUser().value?.id !== undefined) {
                    // const {data , error} = await useSupabaseClient<IDatabase>().from('user')
                    //     .select(`uuid,name,email,shopping_session(id,sub_total,total_payment),user_address(whatsapp_number,province_id,province,city_id,city,district,additional_address)`)
                    //     .eq('uuid',useSupabaseUser().value?.id).limit(1)

                    const { data, error } = await getInitProfile(useSupabaseUser().value?.id)
                    if (error) {
                        throw JSON.stringify(error);
                    }

                    if (data !== null && data.length > 0 && error === null) {
                        this.uuid = data[0].uuid
                        this.sessionId = data[0].shopping_session[0].id
                        this.name = data[0].name
                        this.email = data[0].email
                        this.subTotal = data[0].shopping_session[0].sub_total
                        this.totalPayment = data[0].shopping_session[0].total_payment

                        if ('user_address' in data && isArray(data.user_address) && data.user_address.length > 0) {
                            this.phoneNumber = data[0].user_address[0].whatsapp_number
                            this.province.id = data[0].user_address[0].province_id ?? ''
                            
                            this.province.name = data[0].user_address[0].province ?? ''
                            this.city.id = data[0].user_address[0].city_id ?? ''
                            this.city.name = data[0].user_address[0].city ?? ''
                            this.district = data[0].user_address[0].district ?? ''
                            this.additionalAddress = data[0].user_address[0].additional_address ?? ''

                        }
                    }
                }

                await this.initCart()
            } catch (error) {
                console.log('error initProfile = ',error);
            }
        },
        async initAddress() {
            try {
                if (useSupabaseUser().value?.id !== undefined) {
                    // -- old
                    // const {data, error} = await useSupabaseClient<any>().from('user_address')
                    //     .select('whatsapp_number,province,province_id,city,city_id,district,additional_address').eq('user_uuid',useSupabaseUser().value?.id).limit(1)

                    // --new
                    const { data, error } = await getInitUserAddress(useSupabaseUser().value?.id)
                    if (data && data.length > 0) {
                        this.phoneNumber = data[0].whatsapp_number
                        this.province.id = data[0].province_id ?? ''
                        this.province.name = data[0].province ?? ''
                        this.city.id = data[0].city_id ?? ''
                        this.city.name = data[0].city ?? ''
                        this.district = data[0].district ?? ''
                        this.additionalAddress = data[0].additional_address ?? ''
                    }

                    if (error) {
                        throw error.message
                    }

                }
            } catch (error) {
                console.log('error ! initAddress profile store = ',error);
                
            }
        },
        async deleteCart(id: string | number) {
            const index = this.cart.findIndex(item => (
                item.id === id
            ))
            if (index && index >= 0) {
                this.cart.splice(index, 1)
            }

            // --old
            // const { error } = await useSupabaseClient()
            //     .from('cart_item')
            //     .delete()
            //     .eq('id', id)

            // --new
            const { error } = await deleteCartItem(id)
        },
        async initMaxQts(ids: number[]) {
            if(ids.length > 0) {
                let { data, error } = await useSupabaseClient<any>()
                .rpc('get_qtys', {
                ids
                }).returns<{
                    status: string,
                    message: string,
                    data: [{
                        id: number,
                        qty: number,
                    }]
                }>()

                // result := json_build_object('status', 'success', 'message', 'Quantity retrieved successfully', 'data', result_temp);

                if (error) console.error(error)
                else {
                    data?.data.forEach(qty => {
                        let cart_temp = this.cart.find((item) => item.id === qty.id)
                        if (cart_temp) cart_temp.maxQty = qty.qty
                    });
                }
            }
        }
    },
})