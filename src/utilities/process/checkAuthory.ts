import { NextFunction, Request, Response } from 'express';
import {client} from '../../dataBase';
interface LooseObject {
  [key: string]: {
    [key: string]: string | string[] | null;
  };
}

const authorities: LooseObject = {
  admin: {
    user: '*',
    product: '*',
  },
  client: {
    user: ['GET', 'PUT'],
    product: ['GET'],
    order: '*',
  },
};

export default async function checkAuthorty(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const modelName = req.url.split('/')[1];
    const { method } = req;
    const { _id } = req.body.decodedToken;
    const query = `SELECT admin_authority FROM users WHERE user_id='${_id}'`;
    const conn = await client.connect();
    const user = await conn.query(query);
    conn.release();
    if (!user.rows.length) {
      return res.sendStatus(401);
    }
    const userAuthoritiesInAllModels =
      authorities[user.rows[0].admin_authority];
    const userAuthoritiesInOneModel = userAuthoritiesInAllModels[modelName];

    if (!userAuthoritiesInOneModel) return res.sendStatus(401);
    if (
      userAuthoritiesInOneModel === '*' ||
      userAuthoritiesInOneModel.includes(method)
    )
      return next();
    else return res.sendStatus(401);
  } catch (error) {
    res.status(400).send({ error });
  }
}
