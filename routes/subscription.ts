import { NextFunction, Request, Response } from 'express';
import * as subscriptionRepository from '../repositories/subscriptionRepository';
import webpush, { SendResult } from 'web-push';
import { logger } from '~~/util/logger';

export const post = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    logger.info("create subscription");

    const subscription = req.body;
    const newSubscription = await subscriptionRepository.create(subscription);

    logger.info(newSubscription);
    res.status(201).json(newSubscription);
  } catch (e) {

    logger.error(e);
    res.status(500).json({ message: e.message });
    //next(e);
  }
};

export const remove = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    logger.info("REMOVE SUBSCRIPTION");
    const endpoint: string = req.query.endpoint?.toString();
    if (!endpoint) {
      res.sendStatus(400);
      return;
    }

    const successful = await subscriptionRepository.deleteByEndpoint(endpoint);
    if (successful) {
      res.sendStatus(200);
    } else {
      res.sendStatus(500);
    }
  } catch (e) {
    next(e);
  }
};

export const broadcast = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    logger.info("BROADCAST MESSAGE");

    const  message = req.body.message ? req.body.message : "Hey, this is a push notification!";
    const notification = { title: message };

    const subscriptions = await subscriptionRepository.getAll();

    const notifications: Promise<SendResult>[] = [];
    subscriptions.forEach((subscription) => {
      let tsub = subscription.subscription;
      notifications.push(webpush.sendNotification(tsub, JSON.stringify(notification)));
    });

    await Promise.all(notifications);
    res.sendStatus(200);
  } catch (e) {
    logger.error(e);
    next(e);
  }
};

export const sendmessage = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    logger.info("send messasge to " + req.body.target);

    const target = req.body.target;
    const name = req.body.fromUser;
    const sendPeerId= req.body.peerId;
    const notification = { title: '$CALL$' ,
                            body: 'You have a call from ' + name + ' !',
                            target: target,
                            fromUser: name,
                            peerId: sendPeerId};

    const subscription = await subscriptionRepository.getByName(target);
    const notifications: Promise<SendResult>[] = [];
     
    let tsub = subscription.subscription;
    notifications.push(webpush.sendNotification(tsub, JSON.stringify(notification)));
    
    await Promise.all(notifications);
    res.sendStatus(200);
  } catch (e) {
    logger.error(e);
    next(e);
  }
};

export const declinecall = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    logger.info("decline call from " + req.body.fromUser);

    const target = req.body.target;
    const name = req.body.fromUser;
    
    const notification = { title: 'DECLINE' ,
                            body: 'call declined ',
                            target: target,};

    const subscription = await subscriptionRepository.getByName(target);
    const notifications: Promise<SendResult>[] = [];
     
    let tsub = subscription.subscription;
    notifications.push(webpush.sendNotification(tsub, JSON.stringify(notification)));
    
    await Promise.all(notifications);
    res.sendStatus(200);
  } catch (e) {
    logger.error(e);
    next(e);
  }
}

