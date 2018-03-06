import { name as pkgName } from '../package.json'

// Reducer
export checkoutReducer from './checkout'

// Action types and creators
export * from './checkout'

// Middleware
export const createShopifyMiddleware = client => _store => next => action => {
  if (action.type.startsWith(pkgName + '/'))
    action.meta = { ...action.meta, client }

  return next(action)
}
