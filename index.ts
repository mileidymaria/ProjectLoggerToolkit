import { Logger } from "./src/lib/use-case/logger-use-case";
import { LoggerParams } from "./src/lib/utils/logger-params";

const params: LoggerParams = {
    loggerName: 'mileidy-index-name',
    exportToFile: true
}
const logger = Logger.createLogger(params);


setTimeout(() => {
    logger.info({str: 'anything', num: 1556}, 'nofn');
    logger.fileExporterAdapter?.saveFile();
}, 5000);

