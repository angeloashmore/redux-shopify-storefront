import { createAction, handleActions } from 'redux-actions'
import flow from 'lodash-es/flow'
import isEqual from 'lodash-es/isEqual'
import { createQualifyActionType } from '../util'

const qualifyActionType = createQualifyActionType('checkout')

// Action Types
export const ADD_LINE_ITEM = qualifyActionType('ADD_LINE_ITEM')
export const UPDATE_LINE_ITEM = qualifyActionType('UPDATE_LINE_ITEM')
export const REMOVE_LINE_ITEM = qualifyActionType('REMOVE_LINE_ITEM')

// Action Creators
export const addLineItem = createAction(ADD_LINE_ITEM)
export const updateLineItem = createAction(UPDATE_LINE_ITEM)
export const removeLineItem = createAction(REMOVE_LINE_ITEM)

// Default State
const defaultState = {
  lineItems: [],
}

// Mutations
const mutAddLineItem = (variantId, quantity, customAttributes) => state => ({
  ...state,
  lineItems: lineItems.concat([{ variantId, quantity, customAttributes }]),
})

const mutUpdateLineItem = (index, quantity, customAttributes) => state => ({
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

const mutRemoveLineItem = index =>
  state({
    ...state,
    lineItems: lineItems.slice(0, index).concat(lineItems.slice(index + 1)),
  })

const mutNormalizeLineItems = state => ({
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

// Reducer
export default handleActions(
  {
    [ADD_LINE_ITEM]: (
      state,
      { payload: { variantId, quantity, customAttributes } },
    ) =>
      flow(
        [
          mutAddLineItem(variantId, quantity, customAttributes),
          mutNormalizeLineItems,
        ],
        state,
      ),

    [UPDATE_LINE_ITEM]: (
      state,
      { payload: { index, quantity, customAttributes } },
    ) =>
      flow(
        [
          mutUpdateLineItem(index, quantity, customAttributes),
          mutNormalizeLineItems,
        ],
        state,
      ),

    [REMOVE_LINE_ITEM]: (state, { payload: index }) =>
      mutRemoveLineItem(index)(state),
  },
  defaultState,
)
