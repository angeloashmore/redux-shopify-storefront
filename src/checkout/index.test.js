import { ensureState } from 'redux-optimistic-ui'
import reducer, {
  _defaultState as defaultState,
  addLineItem,
  updateLineItem,
  removeLineItem,
  setCheckoutId,
  setWebUrl,
} from './index'

jest.mock('simple-guid', () => {
  let count = 0
  return () => count++
})

const lineItem = {
  id: 0,
  variantId: 'variantId',
  quantity: 1,
  customAttributes: [{ key: 'key', value: 'value' }],
}

const lineItemAlt = {
  id: 1,
  variantId: 'variantId',
  quantity: 1,
  customAttributes: [{ key: 'key2', value: 'value2' }],
}

describe('checkout reducer', () => {
  beforeEach(() => jest.resetAllMocks())

  test('should handle addLineItem', () => {
    const state = reducer(undefined, addLineItem(lineItem))
    expect(ensureState(state).lineItems).toEqual([lineItem])

    const nextState = reducer(state, addLineItem(lineItemAlt))
    expect(ensureState(nextState).lineItems).toEqual([lineItem, lineItemAlt])
  })

  test('should handle addLineItem with an existing equal line item', () => {
    const state = reducer(
      { ...defaultState, lineItems: [lineItem] },
      addLineItem(lineItem),
    )
    expect(ensureState(state).lineItems).toEqual([{ ...lineItem, quantity: 2 }])
  })

  test('should handle updateLineItem', () => {
    const updates = {
      quantity: 2,
      customAttributes: [{ key: 'key2', value: 'value2' }],
    }
    const state = reducer(
      { ...defaultState, lineItems: [lineItem] },
      updateLineItem({ id: 0, ...updates }),
    )
    expect(ensureState(state).lineItems).toEqual([{ ...lineItem, ...updates }])
  })

  test('should handle updateLineItem with an existing equal line item', () => {
    const state = reducer(
      { ...defaultState, lineItems: [lineItem, lineItemAlt] },
      updateLineItem({
        id: 1,
        customAttributes: lineItem.customAttributes,
      }),
    )
    expect(ensureState(state).lineItems).toEqual([{ ...lineItem, quantity: 2 }])
  })

  test('should handle removeLineItem', () => {
    const state = reducer(
      { ...defaultState, lineItems: [lineItem] },
      removeLineItem(0),
    )
    expect(ensureState(state).lineItems).toEqual([])
  })

  test('should handle setCheckoutId', () => {
    const state = reducer(undefined, setCheckoutId('checkoutId'))
    expect(ensureState(state).checkoutId).toEqual('checkoutId')
  })

  test('should handle setWebUrl', () => {
    const state = reducer(undefined, setWebUrl('webUrl'))
    expect(ensureState(state).webUrl).toEqual('webUrl')
  })
})
