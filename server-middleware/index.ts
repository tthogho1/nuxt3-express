import express from "express";
import { defaultRoute } from "../routes/defaultRoute";
import { post, remove, broadcast ,sendmessage} from '../routes/subscription';
import { getUsers, getAllOtherUsers } from '../routes/dboperation';
import { login } from '../routes/login';
import { create } from '../routes/create';
import database from '../config/database';
import webpush from '../config/webpush';

const app = express();
//const router = express.Router();

app.use('/', defaultRoute);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/subscription',post);
app.delete('/subscription', remove);
app.post('/broadcast', broadcast);

app.post('/create', create);
app.post('/login', login);
app.post('/getUsers', getUsers);
app.post('/getAllOtherUsers', getAllOtherUsers)
app.post('/sendmessage', sendmessage);

database();
webpush();

app.get("/", (req, res) => {
  res.json({
    message: "test",
  });
});

export default app;