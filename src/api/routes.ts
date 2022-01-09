import { json, Request, Response, Router, urlencoded } from "express";
import fileUpload from "express-fileupload";
import PhonesRoute from "./phones.route";

const router = Router();
const apiRoute = Router();

router.use("/api", apiRoute);

// Middlewares
apiRoute.use(json());
apiRoute.use(fileUpload({ useTempFiles: true }));

apiRoute.use("/phones", PhonesRoute);

// HealthCheck
router.get("/", (req: Request, res: Response) => {
  return res.status(200).send({
    message: "Welcome :)",
    success: "ok",
  });
});

export default router;
