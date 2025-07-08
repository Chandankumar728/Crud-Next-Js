// types/user.ts - Type definitions


// app/actions/user-actions.ts - Server Actions
'use server'

import { connectToDatabase } from '@/lib/database'
import { revalidatePath } from 'next/cache'
import {redirect} from 'next/navigation'
import { ObjectId } from 'mongodb'
import Joi from 'joi'
import {User, ActionResult} from '../../types/user';
import { cookies } from 'next/headers'
// Create a new user
// export async function createUser(prevState: any, formData: FormData) {
//   try {

//     // Validate form data using Joi
//     const schema = Joi.object({
//       name: Joi.string().min(3).max(50).required(),
//       email: Joi.string().email().required()
//     })
//     const { error } = schema.validate({
//       name: formData.get('name'),
//       email: formData.get('email')
//     })

    

//     if (error) {
//       return {
//         success: false,
//         error: error.details[0].message
//       }
//     }

//     const { db } = await connectToDatabase()
    
//     const userData: Omit<User, '_id'> = {
//       name: formData.get('name') as string,
//       email: formData.get('email') as string,
//       createdAt: new Date()
//     }
    
//     const result = await db.collection('users').insertOne(userData)
    
//     // Revalidate the path before redirecting
//     revalidatePath('/read')
    
//     // Don't try to return anything after redirect - it throws to interrupt execution
//     redirect(`/read?message=User created successfully`)
    
//   } catch (error:any) {
//     // Only handle actual errors, not the redirect "error"
//     if (error?.message?.includes('NEXT_REDIRECT')) {
//       throw error // Re-throw redirect
//     }
    
//     console.error('Error creating user:', error)
//     return {
//       success: false,
//       error: error instanceof Error ? error.message : 'Unknown error occurred'
//     }
//   }
// }

// app/actions/user-actions.ts
export async function createUser(prevState: any, formData: FormData) {
  try {
   
    const schema = Joi.object({
      name: Joi.string().required(),
      email: Joi.string().email().required()
    })

    const { error } = schema.validate({
      name: formData.get('name'),
      email: formData.get('email')
    })

    if (error) {
      return {
        success: false,
        message: error.details[0].message,
        timestamp: Date.now()
      }
    }

    const { db } = await connectToDatabase()
    
    const userData: Omit<User, '_id'> = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      createdAt: new Date()
    }
    
     await db.collection('users').insertOne(userData)
    
    
    
    revalidatePath('/read')
    return {
      success: true,
      message: 'User created successfully',
      timestamp: Date.now()
    }
  } catch (error) {
    console.error('Error creating user:', error)
    return {
      success: false,
      message: 'Failed to create user',
      timestamp: Date.now()
    }
  }
}

// Update user
export async function updateUser(userId: string, prevState: any, formData: FormData | { [key: string]: any }): Promise<any> {
  try {
    const schema = Joi.object({
      name: Joi.string().required(),
      email: Joi.string().email().required()
    })

    let name: string;
    let email: string;

    if (formData instanceof FormData) {
      name = formData.get('name') as string;
      email = formData.get('email') as string;
    } else {
      name = formData.name;
      email = formData.email;
    }

    const { error } = schema.validate({
      name,
      email
    })

    if (error) {
      return {
        success: false,
        message: error.details[0].message,
        timestamp: Date.now()
      }
    }

    const { db } = await connectToDatabase()

    if (!ObjectId.isValid(userId)) {
      return { success: false, error: 'Invalid user ID' }
    }

    const updateData: Partial<User> = {
      name,
      email,
      updatedAt: new Date()
    }

    const result = await db.collection<User>('users').updateOne(
      { _id: new ObjectId(userId) },
      { $set: updateData }
    )

    // Check if the update was successful
    if (result.matchedCount === 0) {
      return {
        success: false,
        message: 'User not found',
        timestamp: Date.now()
      }
    }

    revalidatePath('/read')
    return {
      success: true,
      message: 'User updated successfully', // Fixed message
      timestamp: Date.now()
    }
  } catch (error) {
    console.error('Error updating user:', error) // Fixed log message
    return {
      success: false,
      message: 'Failed to update user', // Fixed message
      timestamp: Date.now()
    }
  }
}

// Delete user
export async function deleteUser(userId: string,prevState: any,FormData: FormData): Promise<any> {
  try {
    const { db } = await connectToDatabase()

    if (!ObjectId.isValid(userId)) {
      return { 
        success: false, 
        message: 'Invalid user ID',
        timestamp: Date.now()
      }
    }

    const result = await db.collection<User>('users').deleteOne({
      _id: new ObjectId(userId)
    })

    // Check if the user was actually found and deleted
    if (result.deletedCount === 0) {
      return {
        success: false,
        message: 'User not found',
        timestamp: Date.now()
      }
    }

    revalidatePath('/read')

    return { 
      success: true, 
      message: 'User deleted successfully',
      deletedCount: result.deletedCount,
      timestamp: Date.now()
    }
  } catch (error) {
    console.error('Error deleting user:', error)
    return {
      success: false,
      message: 'Failed to delete user',
      timestamp: Date.now()
    }
  }
}
