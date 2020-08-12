import { NextFunction, Request, Response } from 'express'
import AppError from '../errors/app.error'
import logger from '../logger'

const ErrorMiddleware = (
  err: Error,
  req: Request,
  res: Response,
  _: NextFunction
) => {
  logger(err.message, 'ERROR')
  if (err instanceof AppError) {
    return res.status(err.status).json({
      status: 'error',
      message: err.message,
    })
  }

  return res.status(500).json({
    status: 'error',
    message: 'Internal Server Error',
  })
}

export default ErrorMiddleware
