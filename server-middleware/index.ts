import express from "express";
import { defaultRoute } from "../routes/defaultRoute";
import { post, remove, broadcast } from '../routes/subscription';
import database from '../config/database';

const app = express();
//const router = express.Router();


app.use('/', defaultRoute);
app.use(express.json());

app.post('/subscription',post);
app.delete('/subscription', remove);
app.get('/broadcast', broadcast);

database();

app.get("/", (req, res) => {
  res.json({
    message: "test",
  });
});

export default app;