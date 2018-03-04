import { createAction, handleActions } from 'redux-actions'
import flow from 'lodash-es/flow'
import { createQualifyActionType } from '../util'
import * as mutators from './mutators'

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

// Reducer
export default handleActions(
  {
    [ADD_LINE_ITEM]: (
      state,
      { payload: { variantId, quantity, customAttributes } },
    ) =>
      flow(
        [
          mutators.addLineItem(variantId, quantity, customAttributes),
          mutators.normalizeLineItems,
        ],
        state,
      ),

    [UPDATE_LINE_ITEM]: (
      state,
      { payload: { index, quantity, customAttributes } },
    ) =>
      flow(
        [
          mutators.updateLineItem(index, quantity, customAttributes),
          mutators.normalizeLineItems,
        ],
        state,
      ),

    [REMOVE_LINE_ITEM]: (state, { payload: index }) =>
      mutators.removeLineItem(index)(state),
  },
  defaultState,
)
