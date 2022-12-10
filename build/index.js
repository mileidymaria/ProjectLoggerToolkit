"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const logger_use_case_1 = require("./src/lib/use-case/logger-use-case");
const params = {
    loggerName: 'mileidy-index-name',
    exportToFile: true
};
const logger = logger_use_case_1.Logger.createLogger(params);
setTimeout(() => {
    var _a;
    logger.info({ str: 'anything', num: 1556 }, 'nofn');
    (_a = logger.fileExporterAdapter) === null || _a === void 0 ? void 0 : _a.saveFile();
}, 5000);
