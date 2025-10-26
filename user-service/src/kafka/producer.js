import { Kafka } from 'kafkajs'

const kafka = new Kafka({ brokers: ['localhost:9092'] })
const producer = kafka.producer()

export const sendWalletCreationMessage = async(data) => {
    await producer.connect()
    await producer.send({
        topic:'wallet_creation',
        messages:[{value:JSON.stringify(data)}]
    })
    await producer.disconnect()
}