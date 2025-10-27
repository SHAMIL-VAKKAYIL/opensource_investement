import Wallet from "../model/Wallet.js";

class WalletService {

    async createWallet(data) {
        const { userId } = data
        const newWallet = await new Wallet.create({
            userId: userId
        })
        return newWallet
    }
}


export default new WalletService