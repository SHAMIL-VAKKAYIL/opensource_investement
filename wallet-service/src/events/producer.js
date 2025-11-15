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

export const depositEvent = async (data) => {
    await producer.connect()
    await producer.send({
        topic: 'deposite_success',
        messages: [
            {
                key: 'deposit.completed',
                value: JSON.stringify(data)
            }
        ]
    })
}


export const investmentSuccessMessage = async (data) => {
    
    
    await producer.connect()
    await producer.send({
        topic: 'investment_status',
        messages: [
            {
                key: 'investment.completed',
                value: JSON.stringify(data)
            }
        ]
    })
}