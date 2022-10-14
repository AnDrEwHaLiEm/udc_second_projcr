import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcryptjs';
import { client } from '../../dataBase';

class User {
  async bcryptPassword(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { user_password } = req.body;
      if (user_password) {
        const hashPassword = bcrypt.hashSync(user_password, 10);
        req.body.user_password = hashPassword;
        return next();
      } else {
        res.sendStatus(406);
        return;
      }
    } catch (error) {
      res.sendStatus(400);
    }
  }
  async checkEmailAvailabilty(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const { user_email } = req.body;
    const query = `SELECT * FROM users WHERE user_email='${user_email}';`;
    const conn = await client.connect();
    const user = await conn.query(query);
    conn.release();
    if (user.rows[0]) {
      res.status(409).send('User is Exist');
      return;
    } else next();
  }

  async createNewUser(req: Request, res: Response): Promise<Response> {
    try {
      const { user_name, user_email, user_password, admin_authority } =
        req.body;
      const query = `INSERT INTO users(user_name,user_email,user_password,admin_authority) VALUES (
                            '${user_name}', '${user_email}', '${user_password}', '${admin_authority}');`;
      const conn = await client.connect();
      await conn.query(query);
      conn.release();
      return res.send('Success');
    } catch (error) {
      return res.status(400).send(`error ${error}`);
    }
  }
}

const user = new User();
export default user;
