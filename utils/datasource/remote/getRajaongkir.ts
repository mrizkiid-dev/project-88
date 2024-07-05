import type { response } from "../../../types/response/response"

export const getRajaOngkirData = async (url: string): Promise<response> => {
    try {
        let response: unknown = {}
        const results = await $fetch(url,{
            headers: {
            key: useRuntimeConfig().rajaOngkirApi
            },
            parseResponse: JSON.parse,
        })
        response = results
        if (response && typeof response === 'object' && 'rajaongkir' in response 
            && response.rajaongkir && typeof response.rajaongkir === 'object' && 'results' in response.rajaongkir) {

            if (Array.isArray(response.rajaongkir.results) && response.rajaongkir.results.length < 1) {
                throw new Error('city id or params id are not valid');
            }

            return {
                data: response.rajaongkir.results,
                error: null
            }
        } else {
            return {
                data: null,
                error: 'something went wrong in the server'
            }
        }    
    } catch (error) {
        if (error instanceof Error) {
            return {
                data: null,
                error: error.message
            }
        }
        return {
            data: null,
            error: error
        }
    }
} 