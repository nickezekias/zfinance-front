interface TransactionCreateRequest {
  amount: string
  beneficiary: string
  date: string
  description?: string
  status: number
  type: number
}

export type { TransactionCreateRequest }