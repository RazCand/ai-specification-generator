import jwt from 'jsonwebtoken'
import { NextApiRequest } from 'next'

export interface AuthUser {
  id: string
  email: string
  name: string
}

export function generateToken(user: AuthUser): string {
  return jwt.sign(
    { id: user.id, email: user.email },
    process.env.NEXTAUTH_SECRET!,
    { expiresIn: '7d' }
  )
}

export function verifyToken(token: string): AuthUser | null {
  try {
    const decoded = jwt.verify(token, process.env.NEXTAUTH_SECRET!) as any
    return decoded
  } catch (error) {
    return null
  }
}

export function getAuthUser(req: NextApiRequest): AuthUser | null {
  const authHeader = req.headers.authorization
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return null
  }

  const token = authHeader.substring(7)
  return verifyToken(token)
}