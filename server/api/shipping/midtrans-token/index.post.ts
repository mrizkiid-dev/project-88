import Midtrans from 'midtrans-client'
import { TSnapCreateTransaction } from '~/types/midtrans/midtrans-api'

let snap = new Midtrans.Snap({
    isProduction: false,
    serverKey: useRuntimeConfig().midtransServerKey,
    clientKey: useRuntimeConfig().midtransClientKey,
 })

export default defineEventHandler(async(event) => {
    const body = await readBody<TSnapCreateTransaction>(event)

    let paramter = {
      item_details: body.product,
      transaction_details: {
         order_id: body.id,
         gross_amount: body.gross_amount
      },
      customer_details: body.customer_detail,
      enabled_payments: ["bca_va", "bri_va", "gopay", "indomaret","other_qris" ],
    }

    const token = await snap.createTransactionToken(paramter)
    console.log(token);
    return {
        message: 'success',
        token: token
    }
})