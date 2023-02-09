import Subscription, {ISubscription} from '../models/SubscriptionModel';
import {LeanDocument} from "mongoose";


export const createUser = async (subscription: ISubscription): Promise<LeanDocument<ISubscription>> => {
  console.log("create user in repository");
  let newSubscription : ISubscription;
  try {
    newSubscription = await new Subscription(subscription).save();
  } catch (error) {
    console.log(error);
    throw new Error(error);
     error;
  }
  return newSubscription.toObject();
};


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

export const getUserByNameAndPassword = async (name: string , password: string): Promise<ISubscription> => {
  let user = await Subscription.findOne({ name :name , password:password}); 
  if (!user) {
    console.log("user not found : " + name + " " + password);
    user = new Subscription({});
  }
  return user;

}

export const getUsers = async (): Promise<{name:string}[]> => {
  return Subscription.find().sort({name:'asc'}).select("name");
}