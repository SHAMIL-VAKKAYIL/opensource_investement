import mongoose from 'mongoose'

const walletMappingSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true },
  walletId: { type: String, required: true },
})


const WalletMapping= mongoose.model('WalletMapping', walletMappingSchema)

export default WalletMapping