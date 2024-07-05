declare global {
  interface Window {
      snap: {
        pay: (transactionToken: string) => void
        embed: (transactionToken: string, options: {
          embedId: string
          onSuccess?: (result: any) => void
          onPending?: (result: any) => void
          onError?: (result: any) => void
          onClose?: () => void
        }) => void,
      }
  }
}

export {};
