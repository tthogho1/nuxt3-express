import Subscription, {ISubscription} from '../models/SubscriptionModel';
import {LeanDocument} from "mongoose";

export const create = async (subscription: ISubscription): Promise<LeanDocument<ISubscription>> => {
  console.log("create");
  let newSubscription : ISubscription;
  let savedSubscription : ISubscription;
  try {
    newSubscription = new Subscription(subscription);
    savedSubscription = await newSubscription.save();      
  } catch (error) {
    console.log(error);
  }
  return savedSubscription.toObject();
};

export const deleteByEndpoint = async (endpoint: string): Promise<boolean> => {
  const result = await Subscription.remove({ endpoint });
  return result.ok === 1 && result.deletedCount > 0;
};

export const getAll = async (): Promise<ISubscription[]> => {
  return Subscription.find();
};

export const getByName = async (name: string): Promise<ISubscription> => {
  return Subscription.findOne({ name :name });
}

export const getUsers = async (): Promise<{name:string}[]> => {
  return Subscription.find().sort({name:'asc'}).select("name");
}