import { emitWalletCreated } from "../kafka/producer.js";
import Wallet from "../model/Wallet.js";

class WalletService {

    async createWallet(data) {
        // console.log(data, 'skjgfskdjfhncas');

        const newWallet = await Wallet.create({ userId: data.userId })
        await emitWalletCreated(newWallet)
        return newWallet
    }
}


export default new WalletService