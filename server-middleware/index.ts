import express from "express";
import { defaultRoute } from "../routes/defaultRoute";
import { post, remove, broadcast } from '../routes/subscription';

const app = express();
//const router = express.Router();

//defaultRoute.post('/subscription', post);
defaultRoute.delete('/subscription', remove);
defaultRoute.get('/broadcast', broadcast);

app.use('/', defaultRoute);
app.use(express.json());

app.post('/subscription',post);

app.get("/", (req, res) => {
  res.json({
    message: "test",
  });
});

export default app;