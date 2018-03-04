import reducer, {
  _defaultState as defaultState,
  addLineItem,
  updateLineItem,
  removeLineItem,
} from './index'

const lineItem = {
  variantId: 'variantId',
  quantity: 1,
  customAttributes: [{ key: 'key', value: 'value' }],
}

const lineItemAlt = {
  variantId: 'variantId',
  quantity: 1,
  customAttributes: [{ key: 'key2', value: 'value2' }],
}

describe('checkout reducer', () => {
  test('should handle addLineItem', () => {
    const state = reducer(undefined, addLineItem(lineItem))
    expect(state.lineItems).toEqual([lineItem])
  })

  test('should handle addLineItem with an existing equal line item', () => {
    const state = reducer(
      { ...defaultState, lineItems: [lineItem] },
      addLineItem(lineItem),
    )
    expect(state.lineItems).toEqual([{ ...lineItem, quantity: 2 }])
  })

  test('should handle updateLineItem', () => {
    const updates = {
      quantity: 2,
      customAttributes: [{ key: 'key2', value: 'value2' }],
    }
    const state = reducer(
      { ...defaultState, lineItems: [lineItem] },
      updateLineItem({ index: 0, ...updates }),
    )
    expect(state.lineItems).toEqual([{ ...lineItem, ...updates }])
  })

  test('should handle updateLineItem with an existing equal line item', () => {
    const state = reducer(
      { ...defaultState, lineItems: [lineItem, lineItemAlt] },
      updateLineItem({
        index: 1,
        customAttributes: lineItem.customAttributes,
      }),
    )
    expect(state.lineItems).toEqual([{ ...lineItem, quantity: 2 }])
  })

  test('should handle removeLineItem', () => {
    const state = reducer(
      { ...defaultState, lineItems: [lineItem] },
      removeLineItem(0),
    )
    expect(state.lineItems).toEqual([])
  })
})
