// @flow

export type State = {
  lineItems: CheckoutLineItemInput[],
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
