import { call, put, select, takeEvery } from 'redux-saga/effects'
import pick from 'lodash.pick'
import {
  UPDATE_CHECKOUT,
  CREATE_CHECKOUT,
  setCheckoutId,
  setWebUrl,
} from './index'

function* createCheckoutSaga({ client }) {
  const checkoutCreateInput = yield select(state => pick(state, ['lineItems']))

  const checkout = yield call(client.checkout.create)

  yield put(setCheckoutId(checkout.id))
  yield put(setWebUrl(checkout.webUrl))
}

function* updateCheckoutSaga({ client }) {
  const checkoutId = yield select(state => state.checkout.checkoutId)

  if (!checkoutId) yield call(createCheckoutSaga)
}

const saga = [
  takeEvery(CREATE_CHECKOUT, createCheckoutSaga),
  takeEvery(UPDATE_CHECKOUT, updateCheckoutSaga),
]

export default saga
