export interface BankDetails {
  accountNumber?: string
  ifsc?: string
  accountHolder?: string
}

export interface UserProfile {
  id: string
  userId: string
  name?: string
  phone?: number
  address?: string
  bankDetails?: BankDetails
  createdAt?: string
  updatedAt?: string
}
