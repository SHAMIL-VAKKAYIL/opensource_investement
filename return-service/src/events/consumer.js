import { Kafka } from 'kafkajs'
import ReturnService from '../services/return.service.js'

const kafka = new Kafka({ brokers: ['localhost:9092'] })


export const userData = async () => {
    const consumer = kafka.consumer({ groupId: 'return-serivce' })
    await consumer.connect()
    await consumer.subscribe({ topic: 'fetchusersData' })

    await consumer.run({
        eachMessage: async ({ partition, message, topic }) => {
            const data = JSON.parse(message.value.toString())
            await ReturnService.returnGenaration(data)
        }
    })
} 
