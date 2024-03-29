import express from "express";
import { defaultRoute } from "../routes/defaultRoute";
import { subscription, removeSubscription, broadcast, sendmessage, declinecall} from '../routes/subscription';
import { getUsers, getAllOtherUsers } from '../routes/dboperation';
import { login } from '../routes/login';
import { create } from '../routes/createUser';
import database from '../config/database';
import webpush from '../config/webpush';

const app = express();
//const router = express.Router();

app.use('/', defaultRoute);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/subscription',subscription);
app.delete('/subscription', removeSubscription);
app.post('/broadcast', broadcast);

app.post('/create', create);
app.post('/login', login);
app.post('/getUsers', getUsers);
app.post('/getAllOtherUsers', getAllOtherUsers)
app.post('/sendmessage', sendmessage);
app.post('/declineCall', declinecall);

database();
webpush();

app.get("/", (req, res) => {
  res.json({
    message: "test",
  });
});

export default app;