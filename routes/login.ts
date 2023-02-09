import { NextFunction, Request, Response } from 'express';
import * as subscriptionRepository from '../repositories/subscriptionRepository';

export const login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    console.log("LOGIN");
    const name = req.body.name;
    const password = req.body.password;

    const user = await subscriptionRepository.getUserByNameAndPassword(name,password);

    res.status(200).json(user);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: e });
  }
};