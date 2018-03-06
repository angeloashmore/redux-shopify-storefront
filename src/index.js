import { all } from 'redux-saga/effects'
import checkoutSagas from './checkout/sagas'
import { name as pkgName } from '../package.json'

// Action types and creators
export * from './checkout'

// Reducers
export { default as checkoutReducer } from './checkout'

// Middleware
export const createShopifyMiddleware = client => _store => next => action => {
  if (action.type.startsWith(pkgName + '/'))
    action.meta = { ...action.meta, client }

  return next(action)
}

// Saga
export function* shopifySaga() {
  yield all([...checkoutSagas])
}
