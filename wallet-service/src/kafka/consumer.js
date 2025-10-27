import { Kafka } from 'kafkajs'
import WalletService from '../services/wallet.service.js'

const kafka = new Kafka({ brokers: ['localhost:9092'] })
const consumer = kafka.consumer({ groupId: 'wallet-service' })

export const walletCreatedEvent = async () => {
    await consumer.connect()
    await consumer.subscribe({ topic: 'wallet_creation' })

    await consumer.run({
        eachMessage: async ({ message }) => {
            const data = JSON.parse(message.value.toString())
            await WalletService.createWallet(data)
        }
    })
}