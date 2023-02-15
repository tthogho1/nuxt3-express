import { NextFunction, Request, Response } from 'express';
import * as subscriptionRepository from '../repositories/subscriptionRepository';

export const getUsers = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    console.log("getUsers called");
    
    const users = await subscriptionRepository.getUsers();
    res.status(200).json(users);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: e });
  }
};


export const getAllOtherUsers = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    console.log("getAllOtherUsers called");
    const name = req.body.name;
    const users = await subscriptionRepository.getAllOtherUsers(name);
    res.status(200).json(users);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: e });
  }
}