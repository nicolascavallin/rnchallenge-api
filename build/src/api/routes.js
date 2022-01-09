"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var express_fileupload_1 = __importDefault(require("express-fileupload"));
var phones_route_1 = __importDefault(require("./phones.route"));
var router = (0, express_1.Router)();
var apiRoute = (0, express_1.Router)();
router.use("/api", apiRoute);
// Middlewares
apiRoute.use((0, express_1.json)());
apiRoute.use((0, express_fileupload_1.default)({ useTempFiles: true }));
apiRoute.use("/phones", phones_route_1.default);
// HealthCheck
router.get("/", function (req, res) {
    return res.status(200).send({
        message: "Welcome :)",
        success: "ok",
    });
});
exports.default = router;
