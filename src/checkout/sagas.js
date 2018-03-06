import { call, put, select, takeEvery } from 'redux-saga/effects'
import pick from 'lodash.pick'
import {
  CREATE_CHECKOUT,
  UPDATE_CHECKOUT,
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

function* createCheckoutSaga({ client }) {
  const checkoutCreateInput = yield select(state => pick(state, ['lineItems']))

  const checkout = yield call(client.checkout.create)

  yield put(setCheckoutId(checkout.id))
  yield put(setWebUrl(checkout.webUrl))
}

function* updateCheckoutSaga({ client }) {
  const checkoutId = yield select(state => state.checkout.checkoutId)

  if (!checkoutId) yield put(createCheckout())

  const checkout = yield call(client.checkout.update)
}

const saga = [
  takeEvery(CREATE_CHECKOUT, createCheckoutSaga),
  takeEvery(UPDATE_CHECKOUT, updateCheckoutSaga),
]

export default saga
