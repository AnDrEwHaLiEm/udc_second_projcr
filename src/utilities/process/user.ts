import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcryptjs';
import DefaultResponseInterface from '../DefaultResponseInterface';
import DefaultRespons from '../DefaultRespons';
import client from '../../dataBase';

class User {
  /*async deleteModelsById(req: Request): Promise<DefaultResponseInterface> {
    const returnResponse = new DefaultRespons();
    try {
      const { _ids } = req.params;
      const query = `DELETE from users WHERE user_id IN (${_ids});`;
      const conn = await client.connect();

      await conn.query(query);
      returnResponse.text = "Deleted";
      return returnResponse;
    } catch (error) {
      returnResponse.state = 400;
      returnResponse.text = `Error Operation ${error}`;
      return returnResponse;
    }
  }*/
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

  async createNewUser(req: Request): Promise<DefaultResponseInterface> {
    const res = new DefaultRespons();
    try {
      const { user_name, user_email, user_password, admin_authority } =
        req.body;
      const query = `INSERT INTO users(user_name,user_email,user_password,admin_authority) VALUES (
                            '${user_name}', '${user_email}', '${user_password}', '${admin_authority}');`;
      const conn = await client.connect();
      await conn.query(query);
      conn.release();
      res.text = 'Success';
      return res;
    } catch (error) {
      res.state = 400;
      res.text = `error ${error}`;
      return res;
    }
  }
  /*
        async checkUserAbilityToEdit(req: Request, res: Response, next: NextFunction): Promise<void> {
            try {
                const { _id, decodedToken } = req.body;
                const user = await UserModel.findById({ _id: decodedToken._id });
                if (user && (_id === decodedToken._id || user.authority === "owner")) {
                    return next()
                }
                res.sendStatus(401)
            } catch (error) {
                res.sendStatus(400);
            }
        }*/

  /*
 
     async getAllUsers(req: Request, res: Response): Promise<object> {
         const { limit } = req.params;
         const { department } = req.body;
         const getUsers = await this.Model.find((department ? { department: department } : { _id: { $ne: null } })).limit(parseInt(limit));
         const result = getUsers.map((element: {
             _id: ObjectId;
             firstName: string;
             lastName: string;
             jobTitle: string;
             authority: string;
         }) => {
             const { _id, firstName, lastName, jobTitle, authority } = element;
             return { _id, firstName, lastName, jobTitle, authority };
         });
         return res.json({ result });
     }
     async getOneUser(req: Request, res: Response): Promise<object> {
         const { _id } = req.params;
         const getUser = await this.Model.findById(_id);
         if (getUser) {
             const {
                 firstName, lastName, email, phone, jobTitle,
                 gender, avatar, authority, department
             } = getUser;
             const result = {
                 _id, firstName, lastName, email, phone,
                 jobTitle, gender, avatar, authority, department
             };
             return res.json({ result });
         }
         else {
             return res.sendStatus(404);
         }
 
     }
     async get_IdByEmail(email: string, res: Response): Promise<ObjectId> {
         const user = await UserModel.findOne({ email: email });
         if (user) {
             return user._id;
         }
         else
             throw res.sendStatus(404);
     }
 */
}

const user = new User();
export default user;
