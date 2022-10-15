import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import { client } from '../../dataBase';
import { UserModel } from '../model/userModel';
dotenv.config();

class Authintication {
  constructor() {
    this.getPrivateKey = this.getPrivateKey.bind(this);
    this.logIn = this.logIn.bind(this);
    this.createMyToken = this.createMyToken.bind(this);
  }

  getPrivateKey(): string {
    const { PRIVATE_KEY } = process.env;
    return PRIVATE_KEY as string;
  }

  createMyToken(decodedToken: object): string {
    const token = jwt.sign(decodedToken, this.getPrivateKey());
    if (!token) throw 'internal server error';
    return token;
  }

  async logIn(u: UserModel): Promise<object> {
    const { user_email, user_password } = u;
    const query = `SELECT user_id,user_password,admin_authority from users WHERE user_email=$1`;
    const conn = await client.connect();
    const user = await conn.query(query, [user_email]);
    conn.release();
    if (!user.rows.length) {
      throw 'Email or password is uncorrect';
    }
    const passwordIsCorrect = await bcrypt.compare(
      user_password,
      user.rows[0].user_password
    );
    if (!passwordIsCorrect) {
      throw 'Email or password is uncorrect';
    }
    const token = this.createMyToken({
      _id: user.rows[0].user_id,
      email: user_email,
      admin_authority: user.rows[0].admin_authority,
    });
    return { token };
  }
}

const authintication = new Authintication();

export default authintication;
