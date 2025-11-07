import cron from 'node-cron'
import ReturnService from '../services/return.service.js';
import { userData } from '../events/consumer.js';


export const startReturnJob =() => {
    cron.schedule("*/30 * * * * *", async () => {
        console.log(' retrun generating');

        await ReturnService.returnGenaration()

    })
}