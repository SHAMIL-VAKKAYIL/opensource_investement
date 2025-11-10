import { Kafka } from 'kafkajs'
import WalletService from '../services/wallet.service.js'

const kafka = new Kafka({ brokers: ['localhost:9092'] })

export const walletCreatedEvent = async () => {
    const consumer = kafka.consumer({ groupId: 'wallet-create-service' })
    await consumer.connect()
    await consumer.subscribe({ topic: 'wallet_creation' })

    await consumer.run({
        eachMessage: async ({ message }) => {
            const data = JSON.parse(message.value.toString())
            await WalletService.createWallet(data)
        }
    })
}


export const InvestmentCreatedEvent = async () => {
    const consumer = kafka.consumer({ groupId: 'Investment-create-event' })
    await consumer.connect()
    await consumer.subscribe({ topic: 'create_investment' })

    await consumer.run({
        eachMessage: async ({ message }) => {
            const data = JSON.parse(message.value.toString())
            await WalletService.newTransaction(data)
        }
    })

}


export const returnGenarationEvent = async () => {
    const consumer = kafka.consumer({ groupId: 'retrun-generated-event' })

    await consumer.connect()
    await consumer.subscribe({topic:'retrun_emiter'})
    await consumer.run({
        eachMessage:async({message,partition,topic})=>{
            const data = JSON.parse(message.value.toString())
            
        }
    })
}