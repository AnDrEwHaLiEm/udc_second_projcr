import bcrypt from 'bcryptjs';
import { client } from '../../dataBase';
import { UserModel } from '../model/userModel';

class User {
  async createNewUser(u: UserModel): Promise<UserModel> {
    try {
      const { user_name, user_email, user_password, admin_authority } = u;
      const hashPassword = bcrypt.hashSync(user_password, 10);
      const query =
        'INSERT INTO users(user_name,user_email,user_password,admin_authority) VALUES ($1, $2, $3, $4) RETURNING * ;';
      const conn = await client.connect();
      const result = await conn.query(query, [
        user_name,
        user_email,
        hashPassword,
        admin_authority,
      ]);
      conn.release();
      return result.rows[0];
    } catch (error) {
      throw 'unable to Create User';
    }
  }
}

const user = new User();
export default user;
