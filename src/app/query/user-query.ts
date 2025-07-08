// app/lib/queries.ts - Database queries for SSR
import { connectToDatabase } from '@/lib/database'
import { ObjectId } from 'mongodb'
import type { User } from '@/types/user'

export interface SerializedUser extends Omit<User, '_id'> {
  _id: string
}

// Fetch all users (for SSR)
export async function getAllUsers(): Promise<SerializedUser[]> {
  try {
    const { db } = await connectToDatabase()
    
    const users = await db.collection<User>('users')
      .find({})
      .sort({ createdAt: -1 })
      .toArray()
    
    // Convert ObjectId to string for JSON serialization
    return users.map(user => ({
      ...user,
      _id: user._id!.toString()
    }))
  } catch (error) {
    console.error('Error fetching users:', error)
    return []
  }
}

// Fetch single user by ID
export async function getUserById(userId: string): Promise<SerializedUser | null> {
  try {
    const { db } = await connectToDatabase()
    
    if (!ObjectId.isValid(userId)) {
      return null
    }
    
    const user = await db.collection<User>('users').findOne({
      _id: new ObjectId(userId)
    })
    
    if (!user) return null
    
    return {
      ...user,
      _id: user._id!.toString()
    }
  } catch (error) {
    console.error('Error fetching user:', error)
    return null
  }
}

// Fetch users with pagination
export async function getUsersPaginated(
  page: number = 1, 
  limit: number = 10
): Promise<{ users: SerializedUser[]; total: number; totalPages: number }> {
  try {
    const { db } = await connectToDatabase()
    const skip = (page - 1) * limit
    
    const [users, total] = await Promise.all([
      db.collection<User>('users')
        .find({})
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .toArray(),
      db.collection<User>('users').countDocuments()
    ])
    
    return {
      users: users.map(user => ({
        ...user,
        _id: user._id!.toString()
      })),
      total,
      totalPages: Math.ceil(total / limit)
    }
  } catch (error) {
    console.error('Error fetching paginated users:', error)
    return { users: [], total: 0, totalPages: 0 }
  }
}