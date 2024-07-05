import { getRajaOngkirData } from "~/utils/datasource/remote/getRajaongkir"

export default defineEventHandler(async(event) => {    
    const query = getQuery(event)
    try {
        if ((query.id && typeof query.id === 'string' && isNaN(Number(query.id))) ||
            (query.province && typeof query.province === 'string' && isNaN(Number(query.province)))) {
            setResponseStatus(event,400)
            return {
                message: 'id and province should be number'
            }
        }

        if ((query.id && (typeof query.id === 'string' && !isNaN(Number(query.id))) || typeof query.id === 'number') &&
            (query.province && (typeof query.province === 'string' && !isNaN(Number(query.id))) || typeof query.province === 'number')) {
            const {data, error} = await getRajaOngkirData(`https://api.rajaongkir.com/starter/city?id=${query.id}&province=${query.province}`)
            if (data) {
                return {
                    data: data
                }
            }

            if (error && typeof error === 'string') {
                throw new Error(error);   
            }
        } 

        if ((query.id && (typeof query.id === 'string' && !isNaN(Number(query.id))) || typeof query.id === 'number') && !query.province) {
            const {data, error} = await getRajaOngkirData(`https://api.rajaongkir.com/starter/city?id=${query.id}`)
            if (data) {
                return {
                    data: data
                }
            }

            if (error && typeof error === 'string') {
                throw new Error(error);   
            }
        }

        if ((query.province && (typeof query.province === 'string' && !isNaN(Number(query.province))) || typeof query.province === 'number') && !query.id) {
            const {data, error} = await getRajaOngkirData(`https://api.rajaongkir.com/starter/city?province=${query.province}`)
            if (data) {
                return {
                    data: data
                }
            }

            if (error && typeof error === 'string') {
                throw new Error(error);   
            }
        }
        
        const {data, error} = await getRajaOngkirData(`https://api.rajaongkir.com/starter/city`)
        if (data) {
            return {
                data: data
            }
        }

        if (error && typeof error === 'string') {
            throw new Error(error);   
        }
    } catch (error) {
        if (error instanceof Error) {
            setResponseStatus(event, 400)
            return {
                message: error.message
            }
        }
        return {
            message: 'something went wrong in the server'
        }
    }

})