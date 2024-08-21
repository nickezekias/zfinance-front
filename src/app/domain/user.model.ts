export default class User {
  id: number
  avatar: string
  birthDate: string
  createdAt: string
  email: string
  emailVerifiedAt: string | null
  firstName: string
  gender: string
  IDDocument: string | null
  IDDocumentVerifiedAt: string | null
  isActive: boolean
  isAdmin: boolean
  lastName: string
  occupation: string
  phone: string
  phoneVerifiedAt: string | null
  updatedAt: string

  public constructor(
    id: number,
    avatar: string,
    birthDate: string,
    createdAt: string,
    email: string,
    emailVerifiedAt: string,
    firstName: string,
    gender: string,
    IDDocument: string | null,
    IDDocumentVerifiedAt: string | null,
    isActive: boolean,
    isAdmin: boolean,
    lastName: string,
    occupation: string,
    phone: string,
    phoneVerifiedAt: string,
    updatedAt: string

  ) {
    this.id = id
    this.avatar = avatar
    this.birthDate = birthDate
    this.createdAt = createdAt
    this.email = email
    this.emailVerifiedAt = emailVerifiedAt
    this.firstName = firstName
    this.gender = gender
    this.IDDocument = IDDocument
    this.IDDocumentVerifiedAt = IDDocumentVerifiedAt
    this.isActive = isActive
    this.isAdmin = isAdmin
    this.lastName = lastName
    this.occupation = occupation
    this.phone = phone
    this.phoneVerifiedAt = phoneVerifiedAt
    this.updatedAt = updatedAt
  }

  private canRequestCreditCard(): boolean {
    if (
      this.birthDate != ''
      && this.gender != ''
      && this.IDDocument != ''
      && this.occupation != ''
    ) {
      return true
    } else {
      return false
    }
  }
}