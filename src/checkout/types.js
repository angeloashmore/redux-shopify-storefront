// @flow

export type State = {
  checkoutId: ?string,
  lineItems: CheckoutLineItemInput[],
  webUrl: ?string,
}

export type CheckoutLineItemInput = {
  id: string,
  customAttributes: AttributeInput[],
  quantity: number,
  variantId: string,
}

export type AttributeInput = {
  key: string,
  value: string,
}
