import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  name:string,
  password:string
}


const  UserModel = new Schema({
  name : {type: String, unique: true,required: true},
  password: {type: String, required: true}
});

export default mongoose.model<IUser>('User', UserModel);
