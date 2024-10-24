import axios from '@/lib/axios'
import type { CreditCardCreateRequest, CreditCardRequest } from '@/@types/credit-card.interface'

const url = '/api/v1/credit-cards'
const requestUrl = `${url}/requests`

const create = async function (payload: CreditCardCreateRequest) {
  return axios.post(`${url}`, payload)
}

const createCardRequest = async function (payload: CreditCardRequest) {
  return axios.post(`${requestUrl}`, payload)
}

const get = async function (id: string) {
  return axios.get(`${url}/${id}`)
}

const getCardRequest = async function (id: string) {
  return axios.get(`${requestUrl}/${id}`)
}

const getAllForUser = async function () {
  return axios.get(`${url}`)
}

const getAllCardRequests = async function () {
  return axios.get(`${requestUrl}`)
}

const getAllCardRequestsForUser = async function () {
  return axios.get(`${requestUrl}/users/auth`)
}

const rechargeCard = async function (payload: Record<string, unknown>) {
  return axios.post(`${url}/recharge`, payload)
}

const transferMoney = async function (payload: Record<string, unknown>) {
  return axios.post(`${url}/transfer-money`, payload)
}

export default {
  create,
  createCardRequest,
  get,
  getCardRequest,
  getAllForUser,
  getAllCardRequests,
  getAllCardRequestsForUser,
  rechargeCard,
  transferMoney
}
