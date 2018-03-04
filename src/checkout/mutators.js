// @flow

import guid from 'simple-guid'
import isEqual from 'lodash.isequal'
import type { State, AttributeInput } from './types'

const anonymizeLineItem = lineItem => ({
  ...lineItem,
  id: undefined,
  quantity: undefined,
})

export const addLineItem = (
  variantId: string,
  quantity: number,
  customAttributes: AttributeInput[] = [],
) => (state: State): State => ({
  ...state,
  lineItems: state.lineItems.concat([
    { id: guid(), variantId, quantity, customAttributes },
  ]),
})

export const updateLineItem = (
  id: string,
  quantity: number,
  customAttributes?: AttributeInput[],
) => (state: State): State => ({
  ...state,
  lineItems: state.lineItems.map(
    lineItem =>
      lineItem.id === id
        ? {
            ...lineItem,
            quantity: quantity || lineItem.quantity,
            customAttributes: customAttributes || lineItem.customAttributes,
          }
        : lineItem,
  ),
})

export const removeLineItem = (id: string) => (state: State): State => ({
  ...state,
  lineItems: state.lineItems.filter(lineItem => lineItem.id !== id),
})

export const normalizeLineItems = (state: State): State => ({
  ...state,
  lineItems: [...state.lineItems].reduce((acc, curr) => {
    if (curr.quantity < 1) return acc

    const equalIndex = acc.findIndex(x =>
      isEqual(anonymizeLineItem(x), anonymizeLineItem(curr)),
    )

    if (equalIndex > -1) {
      acc[equalIndex].quantity = acc[equalIndex].quantity + curr.quantity
    } else {
      acc.push({ ...curr })
    }

    return acc
  }, []),
})
