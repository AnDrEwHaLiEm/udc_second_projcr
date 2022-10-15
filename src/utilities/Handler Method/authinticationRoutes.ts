import express, { Request, Response } from 'express';
import authintication from '../Model Method/authintication';
import { UserModel } from '../model/userModel';
const authRouter = express.Router();

authRouter.post('/', async (req: Request, res: Response) => {
  try {
    const userData: UserModel = {
      user_email: req.body.user_email,
      user_password: req.body.user_password,
    };
    const token = await authintication.logIn(userData);
    return res.json(token);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
});

export default authRouter;
