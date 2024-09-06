export default class Transaction {
  id: number
  amount: string
  beneficiary: string
  date: string
  description: string
  type: number
  userId: number

  public static readonly STATUS_IN_PROGRESS = 0
  public static readonly STATUS_COMPLETED = 1
  public static readonly STATUS_CANCELED = 2

  public static readonly TRANS_TYPE_ENTRY = 1
  public static readonly TRANS_TYPE_EXPENSE = 0

  public constructor(
    id: number,
    amount: string,
    beneficiary: string,
    date: string,
    description: string,
    type: number,
    userId: number
  ) {
    this.id = id
    this.amount = amount
    this.beneficiary = beneficiary
    this.date = date
    this.description = description
    this.type = type
    this.userId = userId
  }
}
