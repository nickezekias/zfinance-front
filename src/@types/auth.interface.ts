interface DBGetQueryFilter {
  sortBy: Array<string>
  itemsPerPage?: number
  sortDesc?: Array<string>
  page?: number
}

interface LoginRequest {
  email: string
  password: string
}

interface PasswordResetRequest {
  password: string
  passwordConfirmation: SVGStringList
}

interface RegisterRequest {
  email: string
  firstName: string
  lastName: string
  password: string
  passwordConfirmation: string
  phone: string
}

export type { DBGetQueryFilter, LoginRequest, PasswordResetRequest, RegisterRequest }