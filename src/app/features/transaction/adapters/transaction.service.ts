import axios from "@/lib/axios";
import type { TransactionCreateRequest as ObjCreateRequest } from "@/@types/transaction.interface";

const url = '/api/v1/transactions'

const create = async function(payload: ObjCreateRequest) {
  return axios.post(`${url}`, payload)
}

const get = async function (id: string) {
  return axios.get(`${url}/${id}`)
}

const getAllForUser = async function () {
  return axios.get(`${url}`)
}

export default { create, get, getAllForUser }
