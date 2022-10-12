import express, { Request, Response } from 'express';
import user from '../process/user';
const userCreateAccountRouter = express.Router();

userCreateAccountRouter.post(
  '/signup',
  user.checkEmailAvailabilty,
  user.bcryptPassword,
  async (req: Request, res: Response): Promise<Response> => {
    try {
      const defaultRespons = await user.createNewUser(req);
      return res.status(defaultRespons.state).send(defaultRespons.text);
    } catch (error) {
      return res.status(400).send(error);
    }
  }
);

export default userCreateAccountRouter;
