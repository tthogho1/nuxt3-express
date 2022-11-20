import { NextFunction, Request, Response } from 'express';
import * as subscriptionRepository from '../repositories/subscriptionRepository';
import webpush, { SendResult } from 'web-push';

export const post = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    console.log("POST");
    console.log(req.body);
    const subscription = req.body;

    const newSubscription = await subscriptionRepository.create(subscription);
    // Send 201 - resource created
    console.log(newSubscription);
    res.status(201).json(newSubscription);
  } catch (e) {
    console.error(e);
    next(e);
  }
};

export const remove = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    console.log("REMOVE");
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
  _req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    console.log("BROADCAST");
    const notification = { title: 'Hey, this is a push notification!' };

    const subscriptions = await subscriptionRepository.getAll();

    const notifications: Promise<SendResult>[] = [];
    subscriptions.forEach((subscription) => {
      notifications.push(webpush.sendNotification(subscription, JSON.stringify(notification)));
    });

    await Promise.all(notifications);
    res.sendStatus(200);
  } catch (e) {
    console.error(e);
    next(e);
  }
};
