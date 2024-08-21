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

interface CreditCardRequest {
  cardIssuer: string
  cardNetwork: string
  cardType: string
}

export type { CreditCardCreateRequest, CreditCardRequest }
