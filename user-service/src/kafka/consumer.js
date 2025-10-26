import { Kafka } from 'kafkajs'
import UserService from '../services/user.service.js'


const kafka = new Kafka({ brokers: ['localhost:9092'] })
const consumer = kafka.consumer({ groupId: 'user-service' })

export const userCreateEvent = async () => {
    await consumer.connect()
    await consumer.subscribe({ topic: 'user_created' })

    await consumer.run({
        eachMessage: async ({ message }) => {
            const data = JSON.parse(message.value.toString())
            // console.log(data, 'from producer');

            await UserService.createUser({ userId: data})
            //! wallet event

        }
    })
}