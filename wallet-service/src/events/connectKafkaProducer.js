import { Kafka } from 'kafkajs'

export const kafka = new Kafka({
  brokers: ['localhost:9092'],
})

export const producer = kafka.producer()

export const connectKafkaProducer = async () => {
  await producer.connect()
  console.log('Kafka producer connected')
}
