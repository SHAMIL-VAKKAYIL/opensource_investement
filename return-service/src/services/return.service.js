import { returnGenarationEmited } from "../events/producer.js";
import Return from "../model/return.js";
import axios from 'axios'

class ReturnService {
    async returnGenaration() {

        // const { data: userData } = await axios.get("http://localhost:5001/api/user/v1/getusers");

        // console.log(userData);

        const { data: activeInvestments } = await axios.get("http://localhost:5002/api/investment/v1/active");

        // group by user
        const grouped = activeInvestments.message.reduce((accum, inv) => {
            accum[inv.userId] = (accum[inv.userId] || 0) + inv.amount
            return accum
        }, {})

        const returnDocs = Object.keys(grouped).map(userId => ({
            userId,
            returnAmount: grouped[userId] * 0.05
        }))

        // bulk insert to Return table
        const result = await Return.insertMany(returnDocs)

        await returnGenarationEmited(result)
    }
}
export default new ReturnService