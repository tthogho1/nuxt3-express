import { NextFunction, Request, Response } from 'express';
import Subscription, {ISubscription} from '../models/SubscriptionModel';
import * as subscriptionRepository from '../repositories/subscriptionRepository';

export const create = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    console.log("create user " + req.body.name);
    //const user = req.body;
    const t_user = req.body;
    const t_subscription: ISubscription = new Subscription({});

    t_subscription.name = t_user.name;
    t_subscription.password = t_user.password;

    const user = await subscriptionRepository.createUser(t_subscription);
    
    res.status(200).json(t_user);

  } catch (e) {
    console.error(e);
    res.status(500).json({ error: e });
  }
};