


// lib/database.ts - Database operations
import { MongoClient, Db, Collection, Document } from 'mongodb'
import clientPromise from './mongodb'

interface DatabaseConnection {
  client: MongoClient
  db: Db
}

export async function connectToDatabase(): Promise<DatabaseConnection> {
  try {
    const client = await clientPromise
    const db = client.db(process.env.DATABASE_NAME || 'cruddb')
    console.log('Connected to database:', db.databaseName)
    return { client, db }
  } catch (error) {
    console.error('Failed to connect to database:', error)
    throw error
  }
}

// Get a specific collection with proper typing
export async function getCollection<T extends Document = Document>(
  collectionName: string
): Promise<Collection<T>> {
  const { db } = await connectToDatabase()
  return db.collection<T>(collectionName)
}