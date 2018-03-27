// @flow

import guid from 'simple-guid'
import isEqual from 'lodash.isequal'
import type { State, AttributeInput } from './types'

/***
 * Helpers
 */

// Remove ID and quantity line item metadata. Use to check line item equality.
const anonymizeLineItem = lineItem => ({
  ...lineItem,
  id: undefined,
  quantity: undefined,
})

/***
 * Mutators
 */

// Add a line item with a given quantity.
export const addLineItem = (
  variantId: string,
  quantity: number = 1,
  customAttributes: AttributeInput[] = [],
) => (state: State): State => ({
  ...state,
  lineItems: state.lineItems.concat([
    { id: guid(), variantId, quantity, customAttributes },
  ]),
})

// Update an existing line item. Quantity and custom attributes can be updated.
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

// Remove a line item by line item ID.
export const removeLineItem = (id: string) => (state: State): State => ({
  ...state,
  lineItems: state.lineItems.filter(lineItem => lineItem.id !== id),
})

// Merge line items with the same metadata and remove line items with a
// quantity less than one. Use after performing a line item mutation.
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

// Set the checkout ID.
export const setCheckoutId = (checkoutId: string) => (state: State): State => ({
  ...state,
  checkoutId,
})

// Set the web URL.
export const setWebUrl = (webUrl: string) => (state: State): State => ({
  ...state,
  webUrl,
})
