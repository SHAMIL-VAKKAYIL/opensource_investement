import { emitWalletCreated } from "../events/producer.js";
import Transaction from "../model/Transaction.js";
import Wallet from "../model/Wallet.js";

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

        const walletUpdate = await Wallet.updateOne({ userId: transaction.userId }, { $inc: { balance: -transaction?.amount },$push:{transactions:transaction.id} }, { new: true })
        return walletUpdate
    }
}


export default new WalletService