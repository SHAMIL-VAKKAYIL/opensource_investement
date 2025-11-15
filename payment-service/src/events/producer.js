import {Kafka} from 'kafkajs'


const kafka = new Kafka({brokers:['localhost:9092'],clientId:"payment-service"})

const producer = kafka.producer()


export const paymentSuccessfullEvent=async(data)=>{
    await producer.connect()
    await producer.send({
        topic:'payment_created',
        messages:[{
            key:'payment.created',
            value:JSON.stringify(data)
            }]
    })
    
}

export const PaymentEvent = async (data) => {
    await producer.connect()
    await producer.send({
        topic: 'notifications',
        messages: [
            {
                key: 'Payment.completed',
                value: JSON.stringify(data)
            }
        ]
    })
}