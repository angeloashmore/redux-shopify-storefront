# redux-shopify-storefront

Redux modules for interacting with the Shopify Storefront API.

**Status**: Planning

## Purpose

Provide Shopify Storefront functionality to Redux-enabled applications, namely
static sites. All initial development will be based on providing functionality
for a Gatsby generated static site.

## Setup

Integrating `redux-shopify-storefront` consists of two parts:

1.  Adding the reducers
2.  Adding the sagas

The following basic setup handles both. If your application is using sagas, a
slightly different setup is needed to merge the provided saga with yours.

```js
import { createStore, combineReducers, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { checkoutReducer, checkoutSaga } from 'redux-shopify-storefront'

import reducers from '<project-path>/reducers'

const sagaMiddleware = createSagaMiddleware()

// Add the reducer to your store on the `checkout` key
const store = createStore(
  combineReducers({
    ...reducers,
    checkout: checkoutReducer,
  }),
  applyMiddleware(sagaMiddleware),
)

// Run the saga.
sagaMiddleware.run(checkoutSaga)
```

# Notes

## Reducer

All data is held in single reducer. This includes checkout line items and
customer information.

Much of the data should match what is required by Shopify's GraphQL
`checkoutCreate` mutation as the data is passed directly to `shopify-buy`.

### State Shape

```js
type State {
  email: String,
  lineItems: CheckoutLineItemInput[],
  note: String?,
  shippingAddress: MailingAddressInput,
}

type CheckoutLineItemInput {
  customAttributes: AttributeInput[]?,
  variantId: String,
  quantity: Number, // Int
}

type AttributeInput {
  key: String,
  value: String,
}

type MailingAddressInput {
  address1: String,
  address2: String?,
  city: String,
  company: String,
  country: String,
  firstName: String,
  lastName: String,
  phone: String,
  province: String,
  zip: String,
}
```

## Actions

All checkout procedures are handled via actions, including adding a line item
to the checkout and gathering custom information.

### Public Actions

* `ADD_LINE_ITEM`
* `CHECKOUT`
* `CLEAR_EMAIL`
* `CLEAR_LINE_ITEMS`
* `CLEAR_SHIPPING_ADDRESS`
* `REMOVE_LINE_ITEM`
* `SET_EMAIL`
* `SET_SHIPPING_ADDRESS`
* `UPDATE_LINE_ITEM`

## Sagas

Side effects only take place at the final stage of the shopping process:
checking out. All checkout data is managed locally until the checkout action is
dispatched. This reduces network activity and easier data management.

The checkout process is handled via `redux-saga` which listens for the checkout
action to be dispatched. Once dispatched, `shopify-buy` is utilized to create a
new Shopify `Checkout` instance.

Any response, including errors, are merged back into the Redux store via
actions, keeping in line with the immutable nature of Redux.
