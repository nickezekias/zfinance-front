import axios from '@/lib/axios'

const updateProfileInfo = async function(data: FormData) {
  await axios.get("/sanctum/csrf-cookie")
  return axios.post('/user/profile-information?_method=PUT', data)
}

export default { updateProfileInfo }
