export default class CreditCard {
  id: number
  accountNumber: string
  cvc: string
  expiryDate: string
  holder: string
  issuer: string
  network: string
  number: string
  type: string

  public constructor(
    id: number,
    accountNumber: string,
    cvc: string,
    expiryDate: string,
    holder: string,
    issuer: string,
    network: string,
    number: string,
    type: string
  ) {
    this.id = id
    this.accountNumber = accountNumber
    this.cvc = cvc
    this.expiryDate = expiryDate
    this.holder = holder
    this.issuer = issuer
    this.network = network
    this.number = number
    this.type = type
  }
}
