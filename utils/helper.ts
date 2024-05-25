import type { TCostResponseDetail } from "~/types/api/cost-post"

export const revertBoolean = (input: globalThis.Ref<boolean>) => {
    input.value = !input.value
  }

export const isNonEmptyArray = (array: unknown): array is unknown[] => {
  return Array.isArray(array) && array.length > 0
}

export const isTCostResponseDetail = (object: object): object is TCostResponseDetail => (
  'value' in object && typeof object.value === 'number'
  && 'etd' in object && typeof object.etd === 'string'
)

export type Prettify<T> = {
  [K in keyof T]: T[K];
} & {};


export const isObjectNotNull = <T>(value: unknown): value is T => {
  return value !== null && value !== undefined && typeof value === 'object';
};

export const isANumber = (input: number | string | null | undefined) => {
  if (input === null || input === undefined || input === '') {
    return false;
  }
  
  return !isNaN(Number(input));
}