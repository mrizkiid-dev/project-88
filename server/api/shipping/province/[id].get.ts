import { getRajaOngkirData } from "~/utils/datasource/remote/getRajaongkir"

export default defineEventHandler(async(event) => {
    const x = getRouterParams(event)
    try {
        if ((typeof x.id === 'string' && !isNaN(Number(x.id))) || typeof x.id === 'number') {
          const {data, error} = await getRajaOngkirData(`https://api.rajaongkir.com/starter/province?id=${x.id}`)
          if (data) {
            return {
              data: data
            }
          }

          if(error) {
            throw new Error("error");
            
          }
        } else {
          setResponseStatus(event,400)
          return {
            message: 'params should be number'
          }
        }
    } catch (error) {
      setResponseStatus(event,500)
      return {
        message: 'something went wrong in the server'
      }
    }
  })