import { ObjectId } from 'mongodb'

export interface User {
  _id?: ObjectId
  name: string
  email: string
  createdAt: Date
  updatedAt?: Date
}

export interface UserFormData {
  name: string
  email: string
}

export interface ActionResult {
  success: boolean
  error?: string
  id?: string
  modifiedCount?: number
  deletedCount?: number
}