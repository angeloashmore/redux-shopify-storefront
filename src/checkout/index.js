// @flow

import { createAction, handleActions } from 'redux-actions'
import flow from 'lodash.flow'
import { createQualifyActionType } from '../util'
import * as mutators from './mutators'
import type { State } from './types'

const qualifyActionType = createQualifyActionType('checkout')

// Action Types
export const ADD_LINE_ITEM = qualifyActionType('ADD_LINE_ITEM')
export const UPDATE_LINE_ITEM = qualifyActionType('UPDATE_LINE_ITEM')
export const REMOVE_LINE_ITEM = qualifyActionType('REMOVE_LINE_ITEM')

export const CREATE_CHECKOUT = qualifyActionType('CREATE_CHECKOUT')
export const UPDATE_CHECKOUT = qualifyActionType('UPDATE_CHECKOUT')

export const SET_CHECKOUT_ID = qualifyActionType('SET_CHECKOUT_ID')
export const SET_WEB_URL = qualifyActionType('SET_WEB_URL')

// Action Creators
export const addLineItem = createAction(ADD_LINE_ITEM)
export const updateLineItem = createAction(UPDATE_LINE_ITEM)
export const removeLineItem = createAction(REMOVE_LINE_ITEM)

export const createCheckout = createAction(CREATE_CHECKOUT)
export const updateCheckout = createAction(UPDATE_CHECKOUT)

export const setCheckoutId = createAction(SET_CHECKOUT_ID)
export const setWebUrl = createAction(SET_WEB_URL)

// Default State
const defaultState: State = {
  checkoutId: null,
  lineItems: [],
  webUrl: null,
}
export const _defaultState = defaultState

// Reducer
export default handleActions(
  {
    [ADD_LINE_ITEM]: (
      state,
      { payload: { variantId, quantity, customAttributes } },
    ): State =>
      flow([
        mutators.addLineItem(variantId, quantity, customAttributes),
        mutators.normalizeLineItems,
      ])(state),

    [UPDATE_LINE_ITEM]: (
      state,
      { payload: { id, quantity, customAttributes } },
    ): State =>
      flow([
        mutators.updateLineItem(id, quantity, customAttributes),
        mutators.normalizeLineItems,
      ])(state),

    [REMOVE_LINE_ITEM]: (state, { payload: id }): State =>
      mutators.removeLineItem(id)(state),

    [SET_CHECKOUT_ID]: (state, { payload: checkoutId }): State =>
      mutators.setCheckoutId(checkoutId)(state),

    [SET_WEB_URL]: (state, { payload: url }): State =>
      mutators.setWebUrl(url)(state),
  },
  defaultState,
)
