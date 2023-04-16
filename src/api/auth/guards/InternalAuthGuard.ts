import { Response, NextFunction } from 'express';
import { HttpException } from '../../../core/exception';
import jwt from 'jsonwebtoken';
import { Req } from '../../../core/custom_types';

export const InternalAuthGuard = async (
  req: Req,
  res: Response,
  next: NextFunction,
) => {
  try {
    const authToken: any = req.headers['x-internal-token'];
    if (!authToken)
      throw new HttpException('Auth Token Missing in request headers', 401);

    ///Validate JWt
    const decoded: any = jwt.verify(authToken, process.env.INTERNAL_MS_SECRET);
    req.userData = decoded;
    next();
  } catch (error) {
    console.log(error);
    return res.status(401).send({ error: 'Not Authorized' });
  }
};
