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
    const nextState = reducer(undefined, addLineItem(lineItem))
    expect(nextState.lineItems).toEqual([lineItem])
  })

  test('should handle addLineItem with an existing equal line item', () => {
    const state = { ...defaultState, lineItems: [lineItem] }
    const nextState = reducer(state, addLineItem(lineItem))
    expect(nextState.lineItems).toEqual([{ ...lineItem, quantity: 2 }])
  })

  test('should handle updateLineItem', () => {
    const updates = {
      quantity: 2,
      customAttributes: [{ key: 'key2', value: 'value2' }],
    }
    const state = { ...defaultState, lineItems: [lineItem] }
    const nextState = reducer(state, updateLineItem({ index: 0, ...updates }))
    expect(nextState.lineItems).toEqual([{ ...lineItem, ...updates }])
  })

  test('should handle updateLineItem with an existing equal line item', () => {
    const state = { ...defaultState, lineItems: [lineItem, lineItemAlt] }
    const nextState = reducer(
      state,
      updateLineItem({
        index: 1,
        customAttributes: state.lineItems[0].customAttributes,
      }),
    )
    expect(nextState.lineItems).toEqual([{ ...lineItem, quantity: 2 }])
  })

  test('should handle removeLineItem', () => {
    const state = { ...defaultState, lineItems: [lineItem] }
    const nextState = reducer(state, removeLineItem(0))
    expect(nextState.lineItems).toEqual([])
  })
})
