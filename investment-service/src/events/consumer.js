import { Kafka } from 'kafkajs'
import InvestmentService from '../services/investment.service.js'
import { investmentEvent } from './producer.js'


const kafka = new Kafka({ brokers: ['localhost:9092'] })


export const walletCreateEmit = async () => {
    const consumer = kafka.consumer({ groupId: 'investment-service' })
    await consumer.connect()
    await consumer.subscribe({ topic: 'emit_wallet' })

    await consumer.run({
        eachMessage: async ({ partition, message, topic }) => {
            const data = JSON.parse(message.value.toString())
            await InvestmentService.createWalletMap(data)
        }
    })
}

export const investmentSuccessEvent = async () => {
    const consumer = kafka.consumer({ groupId: 'investment-service-status' })

    await consumer.connect()
    await consumer.subscribe({ topic: 'investment_status' })
    await consumer.run({
        eachMessage: async ({ partition, message, topic }) => {
            const data = JSON.parse(message.value.toString())
            
            console.log(data,'sfasfas');
            
            if (data.status === 'success') {
                await investmentEvent({ userId: data.data.transaction.userId, message: `successfully invested the ${data.data.transaction.amount}`, type: 'investment' })
            } else {
                await investmentEvent({ userId: data.data.transaction.userId, message: data.data.transaction.message, type: 'investment' })

            }
        }
    })
}