import { swaggerRoute } from './../main';
import { NextFunction, Request, Response } from 'express';

/** Protects Swagger UI with a basic http auth (username/password) */
export const swaggerBasicAuth = (req: Request, res: Response, next: NextFunction): void => {
  if (req.path !== `/${swaggerRoute}/`) {
    next();
    return;
  }
  // 'Basic base64encoded(username:password)'
  if (req.headers && req.headers.authorization === 'Basic YnJhbmlzbGF2LmxvdnJlbnNraUBnbWFpbC5jb206bGVtaWxpdm9za29kaQ==') {
    next();
    return;
  }
  res.set('WWW-Authenticate', 'Basic');
  res.status(401).send('<h3>Forbidden: Unauthorized access</h3>');
};
