"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileExporterAdapter = void 0;
const cron_1 = require("cron");
const fs_1 = __importDefault(require("fs"));
class FileExporterAdapter {
    constructor(isCron = false) {
        if (isCron) {
            this.cron = new cron_1.CronJob({
                cronTime: '* * * * * *',
                onTick: () => __awaiter(this, void 0, void 0, function* () {
                    yield this.saveFile();
                })
            });
            this.cron.start();
        }
        this.buffer = '';
    }
    saveFile() {
        return __awaiter(this, void 0, void 0, function* () {
            fs_1.default.writeFileSync('./outputs.log', Buffer.from(this.buffer));
            this.buffer = '';
        });
    }
    batchWrite(loggerOutput) {
        this.buffer += '\n' + loggerOutput;
    }
}
exports.FileExporterAdapter = FileExporterAdapter;
