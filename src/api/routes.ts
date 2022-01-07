import { json, Request, Response, Router } from "express";
import PhonesRoute from "./phones.route";

const router = Router();
const apiRoute = Router();

router.use("/api", apiRoute);

// Middlewares
apiRoute.use(json());

apiRoute.use("/phones", PhonesRoute);

// HealthCheck
router.get("/", (req: Request, res: Response) => {
  return res.status(200).send({
    message: "Welcome :)",
    success: "ok",
  });
});

export default router;
