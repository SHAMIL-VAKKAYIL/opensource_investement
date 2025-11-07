import { Kafka } from 'kafkajs'


const kafka = new Kafka({ brokers: ['localhost:9092'] })

const producer = kafka.producer()

export const returnGenarationEmited = async (data) => {
    console.log(data,'from producer');
    
    await producer.connect()
    await producer.send({
        topic: 'retrun_emiter',
        messages: [{ value: JSON.stringify(data) }]
    })

    await producer.disconnect()
}   