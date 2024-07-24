interface CreditCardCreateRequest {
  accountNumber: string
  cvc: string
  expiryDate: string
  holder: string
  issuer: string
  network: string
  number: string
  type: string
}

export type { CreditCardCreateRequest }
