import { NextFunction, Request, Response } from 'express';
import User, {IUser} from '../models/UserModel';
import * as userRepository from '../repositories/userRepository';

export const create = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    console.log("create user " + req.body.name);
    //const user = req.body;
    const t_user: IUser = new User({});

    t_user.name = req.body.name;
    t_user.password = req.body.password;

    const user = await userRepository.createUser(t_user);
    
    res.status(200).json(t_user);

  } catch (e) {
    console.error(e);
    res.status(500).json({ error: e });
  }
};