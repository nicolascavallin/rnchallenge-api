import { NextFunction, Request, Response, Router } from "express";
import asyncHandler from "express-async-handler";
import { firestore } from "firebase-admin";
import { logger } from "../logger";

const PhonesRoute = Router();

const getPhones =
  () => async (req: Request, res: Response, next: NextFunction) => {
    logger.info("Request phones");
    try {
      const payload = (await firestore().collection("phones").get()).docs.map(
        (doc) => ({ id: doc.id, ...doc.data() }),
      );

      res.send({ success: true, payload });
    } catch (error) {
      res.status(500).json({ success: false });
    }
  };

PhonesRoute.get("/", asyncHandler(getPhones()));

export default PhonesRoute;
