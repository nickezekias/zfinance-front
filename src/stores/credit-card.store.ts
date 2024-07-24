import { ref } from 'vue'
import type { CreditCardCreateRequest } from '@/@types/credit-card.interface'
import { defineStore } from 'pinia'
import type Obj from '@/app/domain/credit-card.model'
import objectService from '@/app/features/credit-card/adapters/credit-card.service'
import type { Ref } from 'vue'

export const useCreditCardStore = defineStore('credit-card', () => {
  const creditCards: Ref<Array<Obj>> = ref([])

  async function create(payload: CreditCardCreateRequest) {
    const response = await objectService.create(payload)
    return response.data
  }

  async function get(id: string) {
    const response = await objectService.get(id)
    return response.data
  }

  async function getAllForUser() {
    const response = await objectService.getAllForUser()
    creditCards.value = response.data.data
  }

  return { creditCards, create, get, getAllForUser }
})
