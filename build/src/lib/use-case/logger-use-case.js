"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logger = void 0;
const moment_1 = __importDefault(require("moment"));
const console_fn_mapper_1 = __importDefault(require("../utils/console-fn-mapper"));
const file_exporter_adapter_1 = require("../adapter/file-exporter-adapter");
class Logger {
    constructor(params) {
        this.params = params;
        if (params.exportToFile) {
            this.fileExporterAdapter = new file_exporter_adapter_1.FileExporterAdapter();
        }
    }
    static createLogger(params) {
        return new Logger(params);
    }
    ;
    info(message, fnName) {
        console_fn_mapper_1.default.info("INFO :: \n" + JSON.stringify(this.generateOutput(message, fnName), null, 2));
    }
    error(message, fnName) {
        console_fn_mapper_1.default.error("ERROR :: \n" + JSON.stringify(this.generateOutput(message, fnName), null, 2));
    }
    warn(message, fnName) {
        console_fn_mapper_1.default.warn("WARN :: \n" + JSON.stringify(this.generateOutput(message, fnName), null, 2));
    }
    debug(message, fnName) {
        console_fn_mapper_1.default.debug("DEBUG :: \n" + JSON.stringify(this.generateOutput(message, fnName), null, 2));
    }
    trace(message, fnName) {
        console_fn_mapper_1.default.trace("TRACE :: \n" + JSON.stringify(this.generateOutput(message, fnName), null, 2));
    }
    generateOutput(message, fnName) {
        var _a;
        let output = {
            loggerName: this.params.loggerName,
            timestamp: (0, moment_1.default)().format(),
            epochMilli: new Date().getTime(),
            //@ts-ignore
            outputMessage: message,
            outputFnName: fnName
        };
        if (this.params.exportToFile) {
            (_a = this.fileExporterAdapter) === null || _a === void 0 ? void 0 : _a.batchWrite(JSON.stringify(output, null, 2));
        }
        return output;
    }
}
exports.Logger = Logger;
