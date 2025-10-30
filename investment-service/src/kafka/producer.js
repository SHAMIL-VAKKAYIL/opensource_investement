import { Kafka } from 'kafkajs'

const kafka = new Kafka({ brokers: ['localhost:9092'] })

const producer = kafka.producer()

export const InvestmentCreatedMessage = async (data) => {
    await producer.connect()
    await producer.send({
        topic: 'create_investment',
        messages: [{ value: JSON.stringify(data) }]
    })
}   