import { call, put, select, takeEvery } from 'redux-saga/effects'
import { ensureState } from 'redux-optimistic-ui'
import {
  CREATE_CHECKOUT,
  UPDATE_CHECKOUT,
  ADD_LINE_ITEM,
  createCheckout,
  setCheckoutId,
  setWebUrl,
} from './index'

// TODO: Create sagas to support the following:
//
// - Immediately update the store with the product list item data
// - Use a saga to send the network request to update the checkout (e.g.
//   addListItem, updateListItem)
// - If an error is returned, roll back the action and provide the error to the
//   app via a queue

function* createCheckoutSaga({ meta: { client } }) {
  const checkout = yield call(client.checkout.create.bind(client))

  yield put(setCheckoutId(checkout.id))
  yield put(setWebUrl(checkout.webUrl))
}

function* updateCheckoutSaga({ meta: { client } }) {
  const checkoutId = yield select(
    state => ensureState(state.checkout).checkoutId,
  )

  if (!checkoutId) yield put(createCheckout())

  const checkout = yield call(client.checkout.update)
}

function* addLineItemSaga({ meta: { client } }) {
  const checkoutId = yield select(
    state => ensureState(state.checkout).checkoutId,
  )
  const lineItems = yield select(state => ensureState(state.checkout).lineItems)

  yield call(client.checkout.addLineItems.bind(client), checkoutId, lineItems)
}

const saga = [
  takeEvery(CREATE_CHECKOUT, createCheckoutSaga),
  takeEvery(UPDATE_CHECKOUT, updateCheckoutSaga),
  takeEvery(ADD_LINE_ITEM, addLineItemSaga),
]

export default saga
