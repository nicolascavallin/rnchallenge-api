"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = void 0;
var log4js_1 = require("log4js");
exports.logger = (0, log4js_1.getLogger)();
exports.logger.level = "all";
