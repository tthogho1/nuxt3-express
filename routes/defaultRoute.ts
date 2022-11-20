import { Router } from 'express';


export const defaultRoute = Router();

defaultRoute.get('/test', (req, res) => {
  res.send("What's up doc ?!");
});

