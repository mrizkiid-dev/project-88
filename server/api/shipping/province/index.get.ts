export default defineEventHandler(async(event) => {
    try {
      const response = await $fetch(`https://api.rajaongkir.com/starter/province`,{
        headers: {
          key: useRuntimeConfig().rajaOngkirApi
        },
        parseResponse: JSON.parse,
      })
      if (response && typeof response === 'object' && 'rajaongkir' in response 
          && response.rajaongkir && typeof response.rajaongkir === 'object' && 'results' in response.rajaongkir) {
          return {
            data: response.rajaongkir.results
          }
      }
    } catch (error) {
      // setResponseStatus(event,500)
      // return {
      //   message: 'something wrong in the server'
      // }
      throw createError({
        statusCode: 500,
        statusMessage: 'something wrong in the server',
      })
    }
})