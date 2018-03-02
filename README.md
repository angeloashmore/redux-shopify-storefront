# redux-shopify

Redux modules for interacting with Shopify.

**Status**: Planning

## Purpose

Provide Shopify functionality to Redux-enabled applications, namely static
sites. All initial development will be based on providing functionality for a
Gatsby generated static site.

## Reducer

All data is held in single reducer. This includes checkout line items and
customer information.

## Actions

All checkout procedures are handled via actions, including adding a line item
to the checkout and gathering custom information.

## Sagas

Side effects only take place at the final stage of the shopping process:
checking out. All checkout data is managed locally until the checkout action is
dispatched. This reduces network activity and easier data management.

The checkout process is handled via `redux-saga` which listens for the checkout
action to be dispatched. Once dispatched, `shopify-buy` is utilized to create a
new Shopify `Checkout` instance.

Any response, including errors, are merged back into the Redux store via
actions, keeping in line with the immutable nature of Redux.
