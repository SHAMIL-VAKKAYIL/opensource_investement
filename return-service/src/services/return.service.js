import { returnGenarationEmited } from "../events/producer.js";
import Return from "../model/return.js";
import axios from 'axios'

class ReturnService {
    async returnGenaration() {

        const { data: userData } = await axios.get("http://localhost:5001/api/user/v1/getusers");

        // console.log(userData);

        const { data: activeInvestments } = await axios.get("http://localhost:5002/api/investment/v1/active");

        // console.log(activeInvestments);
        // console.log(activeInvestments.message);

        const profitData = await Promise.all(userData.message.map((user) => {
            const profitRate = activeInvestments.message
                .filter(investment => user.userId === investment.userId)
                .reduce((sum, inv) => sum + inv.amount, 0)

            const returnAmount = profitRate * 0.05
            const returnData = Return.create({
                userId: user.userId,
                returnAmount
            })

            return returnData
        }))

        console.log(profitData);

       await returnGenarationEmited(profitData)
    }
}
export default new ReturnService