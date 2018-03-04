// @flow

export type State = {
  lineItems: CheckoutLineItemInput[],
}

export type CheckoutLineItemInput = {
  customAttributes: AttributeInput[],
  quantity: number,
  variantId: string,
}

export type AttributeInput = {
  key: string,
  value: string,
}
