import { Kafka } from 'kafkajs'
import NotificationService from '../service/notification.service.js'

const kafka = new Kafka({
    clientId: 'notification-service',
    brokers: ['localhost:9092']
})



export const notificationConsumer = async () => {
    const consumer = kafka.consumer({ groupId: 'notification-group' })
    await consumer.connect()
    await consumer.subscribe({ topic: 'notifications', fromBeginning: false })

    await consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
            const data = JSON.parse(message.value.toString())
            // console.log('Received notification event:', data)
                await NotificationService.createNotification(data)
        }
    })
}
