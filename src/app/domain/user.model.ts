export default class User {
  id: number
  avatar: string
  createdAt: string
  email: string
  emailVerfiedAt: string | null
  firstName: string
  IDDocument: string | null
  IDDocumentVerifiedAt: string | null
  isActive: boolean
  isAdmin: boolean
  lastName: string
  phone: string
  phoneVerifiedAt: string | null
  updatedAt: string

  public constructor(
    id: number,
    avatar: string,
    createdAt: string,
    email: string,
    emailVerifiedAt: string,
    firstName: string,
    IDDocument: string | null,
    IDDocumentVerifiedAt: string | null,
    isActive: boolean,
    isAdmin: boolean,
    lastName: string,
    phone: string,
    phoneVerifiedAt: string,
    updatedAt: string

  ) {
    this.id = id
    this.avatar = avatar
    this.createdAt = createdAt
    this.email = email
    this.emailVerfiedAt = emailVerifiedAt
    this.firstName = firstName
    this.IDDocument = IDDocument
    this.IDDocumentVerifiedAt = IDDocumentVerifiedAt
    this.isActive = isActive
    this.isAdmin = isAdmin
    this.lastName = lastName
    this.phone = phone
    this.phoneVerifiedAt = phoneVerifiedAt
    this.updatedAt = updatedAt
  }
}