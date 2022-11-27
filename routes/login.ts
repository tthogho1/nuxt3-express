import { NextFunction, Request, Response } from 'express';

export const login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    console.log("LOGIN");
    const user = req.body;

    res.status(200).json(user);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: e });
  }
};