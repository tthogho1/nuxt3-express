import User, {IUser} from '../models/UserModel';
import mongoose, {LeanDocument, mongo} from "mongoose";


export const createUser = async (i_user: IUser): Promise<LeanDocument<IUser>> => {
  console.log("create user in repository");
 
  try {

  let savedUser = await new User(i_user).save();
    return savedUser.toObject();
  } catch (error) {
    console.log(error);
    throw new Error(error);
     error;
  }

};

export const getUserByNameAndPassword = async (name: string , password: string): Promise<IUser> => {
  let user = await User.findOne({ name :name , password:password}); 
  if (!user) {
    console.log("user not found : " + name + " " + password);
    user = new User({});
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
