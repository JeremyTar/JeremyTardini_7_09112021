
import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
dotenv.config()

export const checkJwt = (req: Request, res: Response, next: NextFunction) => {
    //Get the jwt token from the head
    const token = req.headers.authorization?.split(' ')[1];
    let jwtPayload;
  
    //Try to validate the token and get data
    try {
      jwtPayload = <any>jwt.verify(token, process.env.JWT_TOKEN);
      res.locals.jwtPayload = jwtPayload;
    } catch (error) {
      //If token is not valid, respond with 401 (unauthorized)
      res.status(401).send();
      return;
    }
  
    //The token is valid for 1 hour
    //We want to send a new token on every request
    const userId = jwtPayload;
    const newToken = jwt.sign({ userId }, process.env.JWT_TOKEN, {
      expiresIn: "1h"
    });
    res.setHeader("token", newToken);
    //Call the next middleware or controller
    next();
  };

  export const getUserIdByToken = (token) => {
    const userId = <any>jwt.verify(token, process.env.JWT_TOKEN);
    return userId
  }