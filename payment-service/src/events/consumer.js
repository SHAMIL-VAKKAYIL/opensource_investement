import { Kafka } from "kafkajs"
import { PaymentEvent } from "./producer.js"


const kafka = new Kafka({ brokers: ['localhost:9092'] })


export const paymentSuccessEvent = async () => {
    const consumer = kafka.consumer({ groupId: 'investment-service-status' })

    await consumer.connect()
    await consumer.run({
        eachMessage: async ({ partition, message, topic }) => {
            const data = JSON.parse(message.value.toString())
            if (data.status === 'success') {
                await PaymentEvent({ userId: data.transaction.userId, message: `successfully invested the ${amount}`, type: 'investment' })
            }
        }
    })
}