import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '@/lib/prisma'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET'])
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const specifications = await prisma.specification.findMany({
      orderBy: { createdAt: 'desc' },
      take: 10,
      select: {
        id: true,
        title: true,
        category: true,
        status: true,
        createdAt: true
      }
    })

    res.status(200).json({ specifications })
  } catch (error) {
    console.error('Error listing specifications:', error)
    res.status(500).json({ error: 'Failed to list specifications' })
  }
}