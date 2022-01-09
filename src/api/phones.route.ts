import { NextFunction, Request, Response, Router } from "express";
import asyncHandler from "express-async-handler";
import { firestore, storage } from "firebase-admin";
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

const createProduct =
  () => async (req: Request, res: Response, next: NextFunction) => {
    // TODO implement yup
    if (req.body?.id) {
      // Editing
      await firestore()
        .collection("phones")
        .doc(req.body.id)
        .set({ ...req.body });

      res.send({ success: true, payload: req.body });
    } else {
      // Creating
      const fs_req = await firestore()
        .collection("phones")
        .add({ ...req.body });

      res.send({ success: false, payload: { id: fs_req.id, ...req.body } });
    }
  };

const removeProduct =
  () => async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    try {
      const fs_req = await firestore().collection("phones").doc(id).delete();

      res.send({ success: true });
    } catch (error) {
      res.send({ success: false });
    }
  };

const uploadPicture =
  () => async (req: Request, res: Response, next: NextFunction) => {
    logger.info("Upload photo");

    if (req.files?.photo) {
      const metadata = {
        metadata: {
          firebaseStorageDownloadTokens: Math.random().toString(),
        },
        // @ts-ignore the property exists
        contentType: req.files.photo?.mimetype,
        cacheControl: "public, max-age=31536000",
        public: true,
      };

      // TODO Image optimization

      storage()
        .bucket()
        // @ts-ignore the property exists
        .upload(req.files.photo.tempFilePath, {
          metadata,
          // @ts-ignore the property exists
          destination: `images/${req.files.photo.name}`,
          public: true,
        })
        .then((storage_res) =>
          res.send({ success: true, url: storage_res[0].publicUrl() }),
        )
        .catch((_) => res.send({ success: false }));
    }
  };

PhonesRoute.get("/", asyncHandler(getPhones()));

PhonesRoute.post("/", asyncHandler(createProduct()));

PhonesRoute.delete("/:id", asyncHandler(removeProduct()));

PhonesRoute.post("/picture", asyncHandler(uploadPicture()));

export default PhonesRoute;
