import { ref } from 'vue'
import type { CreditCardCreateRequest, CreditCardRequest } from '@/@types/credit-card.interface'
import { defineStore } from 'pinia'
import type Obj from '@/app/domain/credit-card.model'
import objectService from '@/app/features/credit-card/adapters/credit-card.service'
import type { Ref } from 'vue'

export const useCreditCardStore = defineStore('credit-card', () => {
  const creditCards: Ref<Array<Obj>> = ref([])
  const creditCardRequests: Ref<Array<Record<string, unknown>>> = ref([])

  async function create(payload: CreditCardCreateRequest) {
    const response = await objectService.create(payload)
    return response.data
  }

  async function createCardRequest(payload: CreditCardRequest) {
    const response = await objectService.createCardRequest(payload)
    console.log("CREATE_CC_REQ_RES", response.data)
    return response.data
  }

  async function get(id: string) {
    const response = await objectService.get(id)
    return response.data
  }

  async function getCardRequest(id: string) {
    const response = await objectService.getCardRequest(id)
    return response.data
  }

  async function getAllForUser() {
    const response = await objectService.getAllForUser()
    creditCards.value = response.data.data
  }

  async function getAllCardRequestsForUser() {
    const response = await objectService.getAllCardRequestsForUser()
    creditCardRequests.value = response.data.data
  }
  
  async function rechargeCard(payload: Record<string, unknown>) {
    return await objectService.rechargeCard(payload)
  }

  async function transferMoney(payload: Record<string, unknown>) {
    return await objectService.transferMoney(payload)
  }

  return { creditCards, creditCardRequests, create, createCardRequest, get, getCardRequest, getAllForUser, getAllCardRequestsForUser, rechargeCard, transferMoney }
})
