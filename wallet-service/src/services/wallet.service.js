import { emitWalletCreated } from "../events/producer.js";
import Transaction from "../model/Transaction.js";
import Wallet from "../model/Wallet.js";
import Withdraw from "../model/Withdrawal.js";

class WalletService {

    async createWallet(data) {
        const newWallet = await Wallet.create({ userId: data.userId })
        await emitWalletCreated(newWallet)
        return newWallet
    }
    async newTransaction(data) {

        if (!data.userId || !data.amount) {
            throw new Error("invalid user id and amount");
        }
        const transaction = await Transaction.create({
            userId: data.userId,
            amount: data.amount,
            type: 'debit'
        })

        const walletUpdate = await Wallet.updateOne({ userId: transaction.userId }, { $inc: { balance: -transaction?.amount }, $push: { transactions: transaction.id } }, { new: true })
        return walletUpdate
    }
    async updateWalletAndTransaction(data) {
        for (const returnData of data) {
            const transaction = await Transaction.create({
                userId: returnData.userId,
                amount: returnData.returnAmount,
                type: 'credit'
            })
            console.log(transaction);


            await Wallet.updateOne({ userId: transaction.userId }, { $inc: { balance: transaction.amount }, $push: { transactions: transaction.id } })
        }
    }
    async createWithdrawal(data) {
        const { userId, amount } = data

        const walletData = await Wallet.findOne({ userId })
        if (!walletData) throw new Error('Wallet not found');

        const enoughBalance = walletData.balance >= amount;

        const status = enoughBalance ? 'success' : 'failed';


        const withdrawData = await Withdraw.create({
            userId,
            amount,
            status,
            bankDetails,
            createdAt: new Date(),
            updatedAt: new Date()
        })

        if (!enoughBalance) return withdrawData;

        const transaction = await Transaction.create({
            userId: withdrawData.userId,
            amount: withdrawData.amount,
            type: 'debit'
        })

        await Wallet.updateOne({ userId: transaction.userId }, { $inc: { balance: -transaction.amount }, $push: { transactions: transaction.id } })

        return withdrawData

    }
    async getAllWithdrawals(userId) {
        const withdrawls = await Withdraw.find({ userId })
        if (!withdrawls) throw new Error('withdrawls not found');

        return withdrawls



    }
}


export default new WalletService