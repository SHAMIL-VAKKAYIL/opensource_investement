import axios from 'axios'

import { depositFailedMessage, depositSuccessMessage, emitWalletCreated, investmentFailedMessage, investmentSuccessMessage } from "../events/producer.js";
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

            return await investmentFailedMessage({
                message: "Invalid userId or amount",
                transaction: null
            });
        }

        const transaction = await Transaction.create({
            userId: data.userId,
            amount: data.amount,
            type: 'debit'
        })
        if (!transaction) {
            return await investmentFailedMessage({
                message: "Transaction creation failed",
                transaction: null
            })
        }



        const walletUpdate = await Wallet.updateOne({ userId: transaction.userId }, { $inc: { balance: -transaction?.amount }, $push: { transactions: transaction.id } }, { new: true })
        if (!walletUpdate || walletUpdate.modifiedCount === 0) {

            await Transaction.findByIdAndDelete(transaction.id)
            return await investmentFailedMessage({
                message: "Wallet update failed",
                transaction: { userId, amount }
            });
        }
        return await investmentSuccessMessage({
            transaction: {
                id: transaction.id,
                userId: transaction.userId,
                amount: transaction.amount
            }
        });
    }

    async depositToWallet(data) {

        const transaction = await Transaction.create({
            userId: data.userId,
            amount: data.amount,
            type: 'credit'
        })

        if (!transaction) {
            return await depositFailedMessage({ transaction: null })
        }
        const updateWallet = await Wallet.updateOne({ userId: transaction.userId }, { $inc: { balance: transaction.amount }, $push: { transactions: transaction.id } })


        if (!updateWallet || updateWallet.modifiedCount === 0) {
            return await depositFailedMessage({ transaction: null, paymentIntentId: data.paymentIntentId })
        }
        return await depositSuccessMessage({ amount: transaction.amount, userId: transaction.userId })

    }
    async updateWalletAndTransaction(data) {
        console.log(data, 'from service');

        for (const returnData of data) {
            const transaction = await Transaction.create({
                userId: returnData.userId,
                amount: returnData.returnAmount,
                type: 'credit'
            })
            await Wallet.updateOne({ userId: transaction.userId }, { $inc: { balance: transaction.amount }, $push: { transactions: transaction.id } })
        }
    }
    async createWithdrawal(data) {
        const { userId, amount } = data
        const { data: userData } = await axios.get(`http://localhost:5001/api/user/v1/user/${userId}`)
        console.log(userData);

        const walletData = await Wallet.findOne({ userId })
        if (!walletData) throw new Error('Wallet not found');

        const enoughBalance = walletData.balance >= amount;

        const status = enoughBalance ? 'success' : 'failed';


        const withdrawData = await Withdraw.create({
            userId,
            amount,
            status,
            bankDetails: userData.bankDetails,
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