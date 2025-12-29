import { producer } from './connectKafkaProducer.js'

export const emitWalletCreated = async (data) => {
  await producer.send({
    topic: 'emit_wallet',
    messages: [{ value: JSON.stringify(data) }],
  })
}

export const withdrawalEvent = async (data) => {
  await producer.send({
    topic: 'notifications',
    messages: [
      {
        key: 'withdrawal.completed',
        value: JSON.stringify(data),
      },
    ],
  })
}

export const investmentSuccessMessage = async (data) => {
    console.log(data);
    
  await producer.send({
    topic: 'investment_status',
    messages: [
      {
        key: 'wallet.deducted',
        value: JSON.stringify({ status: 'success', data }),
      },
    ],
  })
}

export const investmentFailedMessage = async (data) => {
  await producer.send({
    topic: 'investment_status',
    messages: [
      {
        key: 'wallet.failed',
        value: JSON.stringify({ status: 'failed', data }),
      },
    ],
  })
}

export const depositSuccessMessage = async (data) => {
  await producer.send({
    topic: 'deposite_status',
    messages: [
      {
        key: 'deposit.success',
        value: JSON.stringify({ status: 'success', data }),
      },
    ],
  })
}

export const depositFailedMessage = async (data) => {
  await producer.send({
    topic: 'deposite_status',
    messages: [
      {
        key: 'deposit.failed',
        value: JSON.stringify({ status: 'failed', data }),
      },
    ],
  })
}
