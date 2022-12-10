import Moment from 'moment';
import { Output } from '../utils/logger-output';
import { LoggerParams } from '../utils/logger-params';
import fnMapper from '../utils/console-fn-mapper';
import { FileExporterAdapter } from '../adapter/file-exporter-adapter';
export class Logger{
    
    private params: LoggerParams;
    fileExporterAdapter?: FileExporterAdapter;
    
    private constructor(params: LoggerParams){
        this.params = params;
        if(params.exportToFile){
            this.fileExporterAdapter = new FileExporterAdapter();
        }
    }

    static createLogger(params: LoggerParams){
        return new Logger(params);
    };

    info(message: string | object, fnName: string){
        fnMapper.info("INFO :: \n" + JSON.stringify(this.generateOutput(message, fnName), null, 2));
    }

    error(message: string | object, fnName: string){
        fnMapper.error("ERROR :: \n" + JSON.stringify(this.generateOutput(message, fnName), null, 2));
    }
    
    warn(message: string | object, fnName: string){
        fnMapper.warn("WARN :: \n" + JSON.stringify(this.generateOutput(message, fnName), null, 2));
    }

    debug(message: string | object, fnName: string){
        fnMapper.debug("DEBUG :: \n" + JSON.stringify(this.generateOutput(message, fnName), null, 2));
    }

    trace(message: string | object, fnName: string){
        fnMapper.trace("TRACE :: \n" + JSON.stringify(this.generateOutput(message, fnName), null, 2));
    }

    private generateOutput(message: string | object, fnName: string){

        let output: Output = {
            loggerName: this.params.loggerName,
            timestamp: Moment().format(),
            epochMilli: new Date().getTime(),
            //@ts-ignore
            outputMessage: message,
            outputFnName: fnName
        }  

        if(this.params.exportToFile){
            this.fileExporterAdapter?.batchWrite(JSON.stringify(output, null, 2));
        }

        return output;          
    }

}