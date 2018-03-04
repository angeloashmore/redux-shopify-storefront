import isEqual from 'lodash-es/isEqual'

export const addLineItem = (
  variantId,
  quantity,
  customAttributes,
) => state => ({
  ...state,
  lineItems: lineItems.concat([{ variantId, quantity, customAttributes }]),
})

export const updateLineItem = (index, quantity, customAttributes) => state => ({
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

export const removeLineItem = index => state => ({
  ...state,
  lineItems: lineItems.slice(0, index).concat(lineItems.slice(index + 1)),
})

export const normalizeLineItems = state => ({
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
