import Subscription, {ISubscription} from '../models/SubscriptionModel';
import User,{IUser} from '../models/UserModel';
import mongoose, {LeanDocument, mongo} from "mongoose";



// old function / use update instead of create
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

export const update = async (subscription: ISubscription): Promise<LeanDocument<ISubscription>> => {
  console.log("update");
  let oneSubscription : ISubscription;
  
  try {
    let t_name = subscription.name;
    const filter = { name :t_name };
    oneSubscription =  await Subscription.findOneAndUpdate(filter,subscription);
    
 
    //newSubscription = new Subscription(subscription);
  }catch(error) {
    console.log(error);
    throw new Error("update error");
  };  

  return oneSubscription.toObject();
};

export const deleteByEndpoint = async (endpoint: string): Promise<boolean> => {
  const result = await Subscription.remove({ endpoint });
  return result.deletedCount > 0;
};

export const deleteByUserName = async (name: string): Promise<boolean> => {
  const result = await Subscription.remove({ name });
  return result.deletedCount > 0;
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

// old function 
export const getUsers = async (): Promise<{name:string}[]> => {
  return User.find().sort({name:'asc'}).select("name");
}


export const getAllOtherUsers = async (name:string): Promise<IUser[]> => {
  return User.find({name:{$ne:name}}).sort({name:'asc'}).select("name");
};
