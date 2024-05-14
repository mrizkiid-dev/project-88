import type { TCostResponseDetail } from "~/types/api/cost-post"

export const revertBoolean = (input: globalThis.Ref<boolean>) => {
    input.value = !input.value
  }

export const isNonEmptyArray = (array: unknown): array is unknown[] => (
  Array.isArray(array) && array.length > 0
)

export const isTCostResponseDetail = (object: object): object is TCostResponseDetail => (
  'value' in object && typeof object.value === 'number'
  && 'etd' in object && typeof object.etd === 'string'
)