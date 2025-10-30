import { Kafka } from 'kafkajs'
import InvestmentService from '../services/investment.service.js'


const kafka = new Kafka({ brokers: ['localhost:9092'] })

const consumer = kafka.consumer({ groupId: 'investmen-service' })

export const walletCreateEmit = async () => {
    await consumer.connect()
    await consumer.subscribe({ topic: 'emit_wallet' })

    await consumer.run({
        eachMessage: async ({ partition, message, topic }) => {
            const data = JSON.parse(message.value.toString())
            await InvestmentService.createWalletMap(data)
        }
    })
}