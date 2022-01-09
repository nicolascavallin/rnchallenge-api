"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var app_1 = require("firebase-admin/app");
var react_native_challenge_13ae2_firebase_adminsdk_c8qx7_aa77243a8b_json_1 = __importDefault(require("../react-native-challenge-13ae2-firebase-adminsdk-c8qx7-aa77243a8b.json"));
var app_2 = __importDefault(require("./app"));
var logger_1 = require("./logger");
var PORT = 5000;
var server = app_2.default.listen(PORT, function () {
    logger_1.logger.info("App running in port ".concat(PORT));
    (0, app_1.initializeApp)({
        // @ts-ignore
        credential: (0, app_1.cert)(react_native_challenge_13ae2_firebase_adminsdk_c8qx7_aa77243a8b_json_1.default),
        storageBucket: "react-native-challenge-13ae2.appspot.com",
    });
});
exports.default = server;
