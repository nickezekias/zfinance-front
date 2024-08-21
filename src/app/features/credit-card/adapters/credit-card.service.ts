import axios from "@/lib/axios";
import type { CreditCardCreateRequest, CreditCardRequest } from "@/@types/credit-card.interface";

const url = '/api/v1/credit-cards'
const requestUrl = `${url}/requests`

const create = async function(payload: CreditCardCreateRequest) {
  return axios.post(`${url}`, payload)
}

const createCardRequest = async function(payload: CreditCardRequest) {
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

const getAllCardRequestsForUser = async function () {
  return axios.get(`${requestUrl}`)
}

export default { create, createCardRequest, get, getCardRequest, getAllForUser, getAllCardRequestsForUser }
