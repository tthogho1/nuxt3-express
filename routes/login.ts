import { NextFunction, Request, Response } from 'express';
import * as userRepository from '../repositories/userRepository';
import {validateUserSchema} from '../util/validator';

export const login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    console.log("LOGIN USER " + req.body.name + " " + req.body.password + "");
    const name = req.body.name;
    const password = req.body.password;

    const t_user = req.body ;
    const { error, value } = validateUserSchema.validate(t_user);
    if (error){
      throw new Error(error.message);
    }

    const user = await userRepository.getUserByNameAndPassword(name,password);

    res.status(200).json(user);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: e });
  }
};