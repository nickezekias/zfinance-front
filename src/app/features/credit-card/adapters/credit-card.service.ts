import axios from "@/lib/axios";
import type { CreditCardCreateRequest } from "@/@types/credit-card.interface";

const url = '/api/v1/credit-cards'

const create = async function(payload: CreditCardCreateRequest) {
  return axios.post(`${url}`, payload)
}

const get = async function (id: string) {
  return axios.get(`${url}/${id}`)
}

const getAllForUser = async function () {
  return axios.get(`${url}`)
}

export default { create, get, getAllForUser }
