import type { TCostResponseDetail } from "~/types/api/cost-post"
import type { TVoidCallback } from "~/types/type"

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

/**
 * @example
 * EXAMPLE HOW TO USE
 * const onCallAPI = (url: string) : void {
 *      ........
 * }
 * const onInput = onDebounce(onCallAPI,500)
 * use onInput to be handling typing
 * it will delay calling callback and reset delay when typing again
 * 
 **/
export const onDebounce = (callback: TVoidCallback, delay: number = 1000): TVoidCallback => {
  let timerId: any = null;
  return (...args: any[]): void => {
      if (timerId !== null) {
          clearTimeout(timerId);
      }
      timerId = window.setTimeout(() => callback(...args), delay);
  };
};