import express from "express";
import router from "./api/routes";

const app = express();

app.use(router);

export default app;
