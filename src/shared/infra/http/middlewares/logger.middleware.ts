import { Request, Response, NextFunction } from 'express'
import Logger from '@shared/logger'

const LoggerMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const { method, url, ip } = req
  Logger(
    `The ip <${ip}> accessed the route "${url}" with the method "${method}"`,
    'WARNING'
  )

  next()
}

export default LoggerMiddleware
