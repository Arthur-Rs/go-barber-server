import AppError from '../errors/app.error'
import { verify } from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express'

const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const { authorization } = req.headers as { authorization: string }

  if (!authorization) {
    throw new AppError("You're not allowed", 401)
  }

  const [, token] = authorization.split(' ')

  try {
    const secret = process.env.JWT_PASS as string
    const { id } = verify(token, secret) as { id: string }

    req.user = {
      id,
    }

    next()
  } catch (err) {
    throw new AppError("You're not allowed", 401)
  }
}

export default authMiddleware
