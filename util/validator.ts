import Joi from 'joi';
import {IUser} from '../models/UserModel';

const alphanumRegex = /^[a-zA-Z0-9]+$/;

export  const validateUserSchema = Joi.object<IUser>({
  name: Joi.string().regex(alphanumRegex).min(6).max(10).required(),
  password: Joi.string().regex(alphanumRegex).min(10).max(10).required(),
})