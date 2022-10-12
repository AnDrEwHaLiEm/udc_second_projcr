import express, { Request, Response } from 'express';
import authintication from '../process/authintication';
const authRouter = express.Router();

authRouter.post('/', async (req: Request, res: Response): Promise<object> => {
  try {
    return authintication.logIn(req, res);
  } catch (error) {
    return res.status(400).send({ error });
  }
});

authRouter.post(
  '/authinticate',
  authintication.authinticate,
  async (req: Request, res: Response): Promise<object> => {
    try {
      return res.send(req.body.decodedToken);
    } catch (error) {
      return res.status(400).send({ error });
    }
  }
);

export default authRouter;
