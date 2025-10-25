import { Kafka } from 'kafkajs'


const kafka = new Kafka({ brokers: ['localhost:9092'] })
const producer = kafka.producer()

export const sendUserCreatedMessage = async (user) => {
    await producer.connect()
    await producer.send({
        topic:'user_created',
        messages:[{value:JSON.stringify(user)}]
    })
    await producer.disconnect()
}