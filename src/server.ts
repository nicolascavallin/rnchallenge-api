import { cert, initializeApp } from "firebase-admin/app";
import serviceAccount from "../react-native-challenge-13ae2-firebase-adminsdk-c8qx7-aa77243a8b.json";
import app from "./app";
import { logger } from "./logger";

const PORT = 3000;

const server = app.listen(PORT, () => {
  logger.info(`App running in port ${PORT}`);
  initializeApp({
    // @ts-ignore
    credential: cert(serviceAccount),
    storageBucket: "react-native-challenge-13ae2.appspot.com",
  });
});

export default server;
