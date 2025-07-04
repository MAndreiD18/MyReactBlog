import express, {Request, Response} from "express";
import * as bodyParser from "body-parser";
import * as contactModel from "../models/contact";
import {Contact} from "../types/Contact";
const contactRouter = express.Router();
var jsonParser = bodyParser.json();

contactRouter.get("/", async (req: Request, res: Response) => {
  contactModel.findAll((err: Error, messages: Contact[]) => {
    if (err) {
      return res.status(500).json({"errorMessage": err.message});
    }

    res.status(200).json({"data": messages});
  });
});

export{contactRouter};