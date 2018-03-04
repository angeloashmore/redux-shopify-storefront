// @flow

import isEqual from 'lodash-es/isEqual'
import type { State, AttributeInput } from './types'

export const addLineItem = (
  variantId: string,
  quantity: number,
  customAttributes: AttributeInput[] = [],
) => (state: State): State => ({
  ...state,
  lineItems: state.lineItems.concat([
    { variantId, quantity, customAttributes },
  ]),
})

export const updateLineItem = (
  index: number,
  quantity: number,
  customAttributes?: AttributeInput[],
) => (state: State): State => ({
  ...state,
  lineItems: state.lineItems.map(
    (lineItem, i) =>
      i === index
        ? {
            ...lineItem,
            quantity: quantity || lineItem.quantity,
            customAttributes: customAttributes || lineItem.customAttributes,
          }
        : lineItem,
  ),
})

export const removeLineItem = (index: number) => (state: State): State => ({
  ...state,
  lineItems: state.lineItems
    .slice(0, index)
    .concat(state.lineItems.slice(index + 1)),
})

export const normalizeLineItems = (state: State): State => ({
  ...state,
  lineItems: [...state.lineItems].reduce((acc, curr) => {
    if (curr.quantity < 1) return acc

    const equalIndex = acc.findIndex(x =>
      isEqual({ ...x, quantity: undefined }, { ...curr, quantity: undefined }),
    )

    if (equalIndex > -1) {
      acc[equalIndex].quantity = acc[equalIndex].quantity + curr.quantity
    } else {
      acc.push(curr)
    }

    return acc
  }, []),
})
