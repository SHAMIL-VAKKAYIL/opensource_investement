import { Kafka } from "kafkajs"
import { PaymentEvent } from "./producer.js"
import PaymentService from "../services/payment.service.js"


const kafka = new Kafka({ brokers: ['localhost:9092'] })


export const paymentSuccessEvent = async () => {
    const consumer = kafka.consumer({ groupId: 'investment-service-status' })

    await consumer.connect()
    await consumer.subscribe({topic:'deposite_status'})
    await consumer.run({
        eachMessage: async ({ partition, message, topic }) => {
            const data = JSON.parse(message.value.toString())
            if (data.data.status === 'success') {
                await PaymentEvent({ userId: data.data.transaction.userId, message: `successfully invested the ${data.data.transaction.amount}`, type: 'investment' })
            }else{
                await PaymentService.paymentRefund({paymentIntentId:data.data.paymentIntentId})
            }
            
        }
    })
}