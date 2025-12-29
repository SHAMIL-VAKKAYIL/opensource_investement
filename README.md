# OpenSource Investment Platform

A full-stack investment platform built using modern web technologies and an event-driven architecture.

## Features

### User
- Wallet creation
- Deposit and withdrawal
- Create investments
- View transactions
- Receive notifications
- Profile management

### Admin
- View users
- View investments
- Update investment status
- Monitor platform activity

## Tech Stack

### Frontend
- React
- TypeScript
- Redux Toolkit
- Tailwind CSS
- React Router

### Backend
- Node.js
- Express
- MongoDB
- Mongoose
- Kafka (KafkaJS)
- JWT Authentication

## Architecture

- Microservice-oriented design
- Kafka for inter-service communication
- REST APIs for client communication
- Role-based access control

## Kafka Topics

- wallet_creation
- retrun_emiter
- payment_created
- create_investment
- investment_status
- deposit_status
- withdrawal_status
- notifications
- user_created
- fetchusersData
- emit_wallet

