import { PrismaClient } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'

const prisma = new PrismaClient()

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    // This will create tables if they don't exist
    await prisma.$executeRaw`
      CREATE TABLE IF NOT EXISTS "users" (
        "id" TEXT PRIMARY KEY,
        "email" TEXT UNIQUE,
        "name" TEXT,
        "department" TEXT,
        "role" TEXT DEFAULT 'user',
        "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `
    
    await prisma.$executeRaw`
      CREATE TABLE IF NOT EXISTS "specifications" (
        "id" TEXT PRIMARY KEY,
        "title" TEXT,
        "category" TEXT,
        "status" TEXT DEFAULT 'draft',
        "version" INTEGER DEFAULT 1,
        "formData" JSONB,
        "content" JSONB,
        "userId" TEXT,
        "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `

    res.status(200).json({ success: true, message: 'Tables created' })
  } catch (error) {
    console.error('Migration error:', error)
    res.status(500).json({ error: 'Migration failed' })
  }
}