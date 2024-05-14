import { TCostPost, TCostResponse, TCostResponseDetail } from "~/types/api/cost-post"
import { isNonEmptyArray, isTCostResponseDetail } from "~/utils/helper"

export default defineEventHandler(async(event) => {  
    try {
        let response: unknown
        let result: TCostResponse = {} as TCostResponse
        let a: boolean
        const body = await readBody<TCostPost>(event)
        console.log((body !== null && body !== undefined));
        if (body !== null && body !== undefined) {
            let error: any
            await $fetch('https://api.rajaongkir.com/starter/cost',{
                        method: 'POST',
                        headers : {
                            "content-type": 'application/x-www-form-urlencoded',
                            key: useRuntimeConfig().rajaOngkirApi
                        },
                        body: new URLSearchParams({
                            origin: '501',
                            destination: '114',
                            weight: '1700',
                            courier: 'jne'
                          })
                    })
                    .then((data) => {
                        response = data
                    })
                    .catch(err => {
                        throw JSON.stringify(err.data)
                    });
            

                if (response && typeof response === 'object' && 'rajaongkir' in response 
                    && response.rajaongkir && typeof response.rajaongkir === 'object' && 'results' in response.rajaongkir
                    && isNonEmptyArray(response.rajaongkir.results) 
                ) {
                    response.rajaongkir.results.forEach(item => {
                        if(
                            item && typeof item === 'object' && 'costs' in item 
                            && isNonEmptyArray(item.costs)
                        ) {
                            item.costs.forEach(detail => {
                                if (detail && typeof detail === 'object' && 'service' in detail && 'cost' in detail && isNonEmptyArray(detail.cost)) {
                                    if (
                                        detail.service && typeof detail.service === 'string' && detail.service === 'REG'
                                        &&  detail.cost[0] && typeof detail.cost[0] === 'object' 
                                        && 'value' in detail.cost[0] && typeof detail.cost[0].value === 'number'
                                        && 'etd' in detail.cost[0] && typeof detail.cost[0].etd === 'string'
                                    ) {
                                        result.service = 'JNE - '+detail.service
                                        result.price = detail.cost[0].value
                                        result.estimate = detail.cost[0].etd
                                    }
                                } else {
                                    throw 'error in response --- costs[]'
                                }
                            })
                        } else {
                            throw 'error in response rajaOngkirApi mapping -- costs[]'
                        }
                    })

                } else {
                    throw 'error in response rajaOngkirApi mapping -- results'
                }

            } else {
                setResponseStatus(event,400)
                return {
                    message: 'body is not valid'
                }
            }

            setResponseStatus(event,200)
            return {
                data: result
            }
    } catch (error) {
        console.log('error -- ',error);
        
        setResponseStatus(event,500)
        return {
            message: error
        }
    }
})