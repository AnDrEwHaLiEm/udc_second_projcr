import express, { Request, Response } from 'express';
import user from '../process/user';
const userCreateAccountRouter = express.Router();

userCreateAccountRouter.post(
  '/signup',
  user.checkEmailAvailabilty,
  user.bcryptPassword,
  async (req: Request, res: Response): Promise<void> => {
    return void (await user.createNewUser(req, res));
  }
);

export default userCreateAccountRouter;
