import { NextFunction, Request, Response } from 'express';
import * as subscriptionRepository from '../repositories/subscriptionRepository';

export const getUsers = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    console.log("getUsers");
    
    const users = await subscriptionRepository.getUsers();
    res.status(200).json(users);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: e });
  }
};