import { Kafka } from 'kafkajs'

const kafka = new Kafka({ brokers: ['localhost:9092'] })
const producer = kafka.producer()

export const emitWalletCreated = async (data) => {
    await producer.connect()
    await producer.send({
        topic: 'emit_wallet',
        messages: [{ value: JSON.stringify(data) }]
    })
    await producer.disconnect()
}

export const withdrawalEvent = async (data) => {
    await producer.connect()
    await producer.send({
        topic: 'notifications',
        messages: [
            {
                key: 'withdrawal.completed',
                value: JSON.stringify(data)
            }
        ]
    })
}