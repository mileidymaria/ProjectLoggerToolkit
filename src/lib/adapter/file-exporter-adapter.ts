import { CronJob } from "cron";
import fs from 'fs';

export class FileExporterAdapter{

    private buffer: string;
    //@ts-ignore
    private cron: CronJob;

    constructor(isCron: boolean = false){
        if(isCron){
            this.cron = new CronJob({
                cronTime: '* * * * * *',
                onTick: async () => {
                    await this.saveFile();
                }
            });
            this.cron.start();
        }
        this.buffer = '';
    }

    async saveFile(){
        fs.writeFileSync('./outputs.log', Buffer.from(this.buffer));
        this.buffer = '';
        
    }

    batchWrite(loggerOutput: string){
        this.buffer += '\n' + loggerOutput;
    }
}