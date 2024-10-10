import axios from '@/lib/axios'

const getAll = async function() {
  return axios.get('/api/v1/users/auth/notifications')
}

export default { getAll }
