type TLoadScriptMidtrans = {
  src: string
  clientKey: string
  isAsync?: boolean
  success?: (...args: any[]) => void
  error?: (error: string,...args: any[]) => void
}

export const loadScriptMidtrans = (input: TLoadScriptMidtrans): Promise<void> => {
  return new Promise<void>((resolve, reject) => {
    try {
      const script = document.createElement('script')
      script.src = input.src
      script.setAttribute('data-client-key', input.clientKey)
      script.async = input.isAsync ?? false
      
      script.onload = () => {
        if (input.success) {
          input.success()
        }
        resolve()
      };
      
      script.onerror = () => {
        if (input.error) {
          input.error(`Failed to load script: ${input.src}`);
        } else {
          reject(new Error(`Failed to load script: ${input.src}`));
        }
      }

      document.body.appendChild(script);
    } catch (error) {
      reject(new Error(`Failed to load script: ${input.src}`))
    }
  });
};