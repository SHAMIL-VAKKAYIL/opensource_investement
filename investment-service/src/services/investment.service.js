import Investment from "../model/Investment.js";
import WalletMapping from "../model/WalletMapping.js";

class InvestmentServices {

    async createWalletMap(data) {
        console.log(data, 'dsffaf');

        const { userId, id } = data
        console.log(userId, id, 'hgdgdgc');

        await WalletMapping.create({
            userId,
            walletId: id
        })

    }
    async createInvestment({ userId, amount, planType, expectedReturn, durationDays }) {

        const walletId = await WalletMapping.findOne({ userId })
        const currentDate = new Date();
        const endDate = new Date(currentDate.getTime() + durationDays * 24 * 60 * 60 * 1000);

        const newInvestment = await Investment.create({
            userId,
            walletId: walletId?.walletId,
            amount,
            planType,
            expectedReturn,
            durationDays,
            endDate
        })

        return newInvestment
    }

    async activeInvestments() {
        const activeInvestmentData = Investment.find({ status: 'active' })
        
        return activeInvestmentData
    }
}

export default new InvestmentServices