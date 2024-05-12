export const revertBoolean = (input: globalThis.Ref<boolean>) => {
    input.value = !input.value
  }