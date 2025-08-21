import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '@/lib/prisma'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query

  if (typeof id !== 'string') {
    return res.status(400).json({ error: 'Invalid specification ID' })
  }

  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET'])
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const specification = await prisma.specification.findUnique({
      where: { id }
    })

    if (!specification) {
      return res.status(404).json({ error: 'Specification not found' })
    }

    res.status(200).json({
      id: specification.id,
      formData: specification.formData,
      content: specification.content,
      generatedAt: specification.createdAt,
      version: specification.version
    })

  } catch (error) {
    console.error('Error fetching specification:', error)
    res.status(500).json({ error: 'Failed to fetch specification' })
  }
}