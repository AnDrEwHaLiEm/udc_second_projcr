import express, { Request, Response } from 'express';
import user from '../Model Method/user';
import { UserModel } from '../model/userModel';
const userRouter = express.Router();

userRouter.post('/signup', async (req: Request, res: Response) => {
  const userData: UserModel = {
    user_name: req.body.user_name,
    user_password: req.body.user_password,
    user_email: req.body.user_email,
    admin_authority: req.body.admin_authority,
  };
  try {
    const newUser = await user.createNewUser(userData);
    return res.json(newUser);
  } catch (err) {
    res.status(409);
    res.json(err);
  }
});

export default userRouter;
