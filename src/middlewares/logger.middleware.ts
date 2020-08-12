import { Request, Response, NextFunction } from 'express';
import Logger from '../logger';

const LoggerMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const { method, url, ip } = req;
  Logger(
    `The ip <${ip}> accessed the route "${url}" with the method "${method}"`,
    'WARNING'
  );

  next();
};

export default LoggerMiddleware;
