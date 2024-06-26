declare module 'midtrans-client' {
  interface SnapResponse{
      token?:string;
      redirect_url?:string;
      error_messages?:[]
  }

  interface CoreApiResponse{
      status_code?: string
      status_message?: string
      token_id?: string
      hash?: string
      transaction_id?: string
      order_id?: string
      merchant_id?: string
      gross_amount?: string
      currency?: string
      payment_type?: string
      transaction_time?: string
      transaction_status?: string
      fraud_status?: string
      actions?:  CoreApiAction[]
      qr_string?: string
      acquirer?: string
      expire_time?: string
      id?: string
      validation_messages?: string[]
      bank?: string
      masked_card?: string
      refund_chargeback_id?: number
      refund_amount?: string
      refund_key?: string
      approval_code?: string
      signature_key?: string
      channel_response_code?: string
      channel_response_message?: string
      card_type?: string
      payment_option_type?: string
      shopeepay_reference_number?: string
      reference_id?: string
      refunds?: CoreApiRefund[]
      transactions?: CoreApiTransaction[]
      account_id?: string
      account_status?: string
      point_balance_amount?: string
      data?: CoreApiData
  }

  export interface CoreApiData {
    country_name: string
    country_code: string
    brand: string
    bin_type: string
    bin_class: string
    bin: string
    bank_code: string
    bank: string
  }


  export interface CoreApiTransaction {
    payment_type: string
    bill_key: string
    transaction_time: string
    gross_amount: string
    order_id: string
    signature_key: string
    status_code: string
    transaction_id: string
    transaction_status: string
    fraud_status: string
    status_message: string
  }


  export interface CoreApiRefund {
    refund_chargeback_id: number
    refund_amount: string
    created_at: string
    reason: string
    refund_key: string
    refund_method: string
    bank_confirmed_at: string
  }


  export interface  CoreApiAction {
    name: string
    method: string
    url: string
  }


  export class CoreApi {
      constructor(...args: any[]);

      capture(...args: any[]): Promise<CoreApiResponse>;

      cardPointInquiry(...args: any[]): Promise<CoreApiResponse>;

      cardRegister(...args: any[]): Promise<CoreApiResponse>;

      cardToken(...args: any[]): Promise<CoreApiResponse>;

      charge(...args: any[]): Promise<CoreApiResponse>;

      createSubscription(...args: any[]): Promise<CoreApiResponse>;

      disableSubscription(...args: any[]): Promise<CoreApiResponse>;

      enableSubscription(...args: any[]): Promise<CoreApiResponse>;

      getPaymentAccount(...args: any[]): Promise<CoreApiResponse>;

      getSubscription(...args: any[]): Promise<CoreApiResponse>;

      linkPaymentAccount(...args: any[]): Promise<CoreApiResponse>;

      unlinkPaymentAccount(...args: any[]): Promise<CoreApiResponse>;

      updateSubscription(...args: any[]): Promise<CoreApiResponse>;

  }

  export class Iris {
      constructor(...args: any[]);

      approvePayouts(...args: any[]): Promise<any>;

      createBeneficiaries(...args: any[]): Promise<any>;

      createPayouts(...args: any[]): Promise<any>;

      getBalance(...args: any[]): Promise<any>;

      getBeneficiaries(...args: any[]): Promise<any>;

      getBeneficiaryBanks(...args: any[]): Promise<any>;

      getFacilitatorBalance(...args: any[]): Promise<any>;

      getFacilitatorBankAccounts(...args: any[]): Promise<any>;

      getPayoutDetails(...args: any[]): Promise<any>;

      getTopupChannels(...args: any[]): Promise<any>;

      getTransactionHistory(...args: any[]): Promise<any>;

      ping(...args: any[]): Promise<any>;

      rejectPayouts(...args: any[]): Promise<any>;

      updateBeneficiaries(...args: any[]): Promise<any>;

      validateBankAccount(...args: any[]): Promise<any>;

  }

  export class Snap {
      constructor(...args: any[]);

      createTransaction(...args: any[]): Promise<SnapResponse>;

      createTransactionRedirectUrl(...args: any[]): Promise<string>;

      createTransactionToken(...args: any[]): Promise<string>;

  }

  export function MidtransError(...args: any[]): void;

  export namespace MidtransError {
      const stackTraceLimit: number;

      function captureStackTrace(p0: any, p1: any): any;

  }
}