import { Level } from '../utils/levels';

export type LoggerParams = {
    loggerName: string;
    loggerLevel?: Level;
    exportToFile?: boolean;
    exportToEmail?: boolean;
    email?: string;
}