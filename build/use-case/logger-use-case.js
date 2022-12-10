"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logger = void 0;
const moment_1 = __importDefault(require("moment"));
const fnMapper = require("../utils/console-fn-mapper");
class Logger {
    constructor(params) {
        this.params = params;
    }
    createLogger(params) {
        new Logger(params);
    }
    ;
    info(message, fnName) {
        fnMapper.info(this.generateOutput(message, fnName));
    }
    error(message, fnName) {
        fnMapper.error(this.generateOutput(message, fnName));
    }
    warn(message, fnName) {
        fnMapper.warn(this.generateOutput(message, fnName));
    }
    debug(message, fnName) {
        fnMapper.debug(this.generateOutput(message, fnName));
    }
    trace(message, fnName) {
        fnMapper.trace(this.generateOutput(message, fnName));
    }
    generateOutput(message, fnName) {
        let output;
        //@ts-ignore
        if (message instanceof string) {
            output = {
                timestamp: (0, moment_1.default)().format(),
                epochMilli: (0, moment_1.default)().milliseconds(),
                //@ts-ignore
                outputMessage: message,
                outputFnName: fnName
            };
            return output;
        }
        output = {
            timestamp: (0, moment_1.default)().format(),
            epochMilli: (0, moment_1.default)().milliseconds(),
            outputMessage: JSON.stringify(message),
            outputFnName: fnName
        };
        return output;
    }
}
exports.Logger = Logger;