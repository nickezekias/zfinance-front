import { ref } from 'vue'
import { defineStore } from 'pinia'
import objectService from '@/app/features/transaction/adapters/transaction.service'

import type Obj from '@/app/domain/transaction.model'
import type { Ref } from 'vue'
import type { TransactionCreateRequest as ObjCreateRequest } from '@/@types/transaction.interface'


export const useTransactionStore = defineStore('transaction', () => {
  const transactions: Ref<Array<Obj>> = ref([])

  async function create(payload: ObjCreateRequest) {
    const response = await objectService.create(payload)
    return response.data
  }

  async function get(id: string) {
    const response = await objectService.get(id)
    return response.data
  }

  async function getAllForUser() {
    const response = await objectService.getAllForUser()
    transactions.value = response.data.data
  }

  return { transactions, create, get, getAllForUser }
})
