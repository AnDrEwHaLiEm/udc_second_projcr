import jwt from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import { client } from '../../dataBase';
dotenv.config();

class Authintication {
  constructor() {
    this.getPrivateKey = this.getPrivateKey.bind(this);
    this.logIn = this.logIn.bind(this);
    this.createMyToken = this.createMyToken.bind(this);
    this.authinticate = this.authinticate.bind(this);
  }

  getPrivateKey(): string {
    const { PRIVATE_KEY } = process.env;
    return PRIVATE_KEY as string;
  }

  createMyToken(decodedToken: object): string {
    const token = jwt.sign(decodedToken, this.getPrivateKey());
    if (!token) throw new Error('internal server error');
    return token;
  }

  async logIn(req: Request, res: Response): Promise<object> {
    const { user_email, password } = req.body;
    const query = `SELECT user_id,user_password from users WHERE user_email='${user_email}'`;
    const conn = await client.connect();
    const user = await conn.query(query);
    conn.release();
    if (!user.rows.length) {
      return res.status(404).send('Email or password is uncorrect');
    }
    const { user_password } = user.rows[0];
    const passwordIsCorrect = await bcrypt.compare(password, user_password);
    if (!passwordIsCorrect) {
      return res.status(404).send('Email or password is uncorrect');
    }
    const token = this.createMyToken({
      _id: user.rows[0].user_id,
      email: user_email,
    });
    return res.send({ token });
  }

  async authinticate(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const authorizationHeader = req.headers['authorization'];
      const token = authorizationHeader && authorizationHeader.split('=')[1];
      if (!token) {
        res.status(401);
        return;
      }
      const privateKey = this.getPrivateKey();
      return jwt.verify(token, privateKey, async (error, decodedToken) => {
        if (error) return res.status(401).send({ error });
        req.body.decodedToken = decodedToken;
        return next();
      });
    } catch (error) {
      res.status(400).send({ error });
      return;
    }
  }
}

const authintication = new Authintication();

export default authintication;
