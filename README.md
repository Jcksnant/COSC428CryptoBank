# Bulldog ETH Bank

## Overview

Bulldog ETH Bank is a modern Web3-inspired banking application developed using Node.js, Express.js, MySQL, Sequelize, EJS, JavaScript, and MetaMask integration. The application simulates cryptocurrency banking operations while maintaining a professional decentralized-finance style user interface.

The project demonstrates full-stack web development, cloud deployment, database integration, session authentication, and simulated blockchain transaction systems.

---

# Features

## Authentication System

* User signup and login
* Session-based authentication
* Secure logout functionality
* Error handling for invalid credentials

## Web3 Dashboard

* Modern black and gold cryptocurrency dashboard UI
* Responsive design
* MetaMask wallet connection
* Live wallet address display
* Connected blockchain network display
* Live wallet ETH balance display

## Simulated Ethereum Banking

* Simulated ETH deposits
* Simulated ETH withdrawals
* Real-time balance updates without page refresh
* Persistent account balance storage
* Fake blockchain-style transaction hashes
* Transaction history tracking

## Database Integration

* MySQL database backend
* Sequelize ORM support
* User account storage
* Transaction storage
* Persistent banking data

## Admin Dashboard

* Admin account support
* View registered users
* Monitor account balances
* Monitor transaction history

## AWS Cloud Deployment

* Deployable on AWS EC2
* PM2 process management
* Public cloud-hosted website support
* Linux server deployment compatible

---

# Technologies Used

## Backend

* Node.js
* Express.js
* Sequelize ORM
* MySQL
* Express Session

## Frontend

* EJS
* CSS
* JavaScript

## Web3 Integration

* MetaMask
* Ethers.js

## Cloud / Deployment

* AWS EC2
* PM2
* Ubuntu Linux

---

# Project Structure

```text
Bulldog_ETH_Bank/
│
├── app.js
├── package.json
├── package-lock.json
├── .env
├── README.md
│
├── config/
│   └── db.js
│
├── models/
│   ├── User.js
│   └── Transaction.js
│
├── public/
│   ├── style.css
│   └── bank.js
│
├── views/
│   ├── welcome.ejs
│   ├── login.ejs
│   ├── signup.ejs
│   ├── bank.ejs
│   ├── admin.ejs
│   └── error.ejs
```

---

# Installation

## Clone Repository

```bash
git clone YOUR_GITHUB_REPOSITORY
cd YOUR_PROJECT_NAME
```

---

# Install Dependencies

```bash
npm install
```

---

# Environment Variables

Create a `.env` file in the root directory:

```env
DB_NAME=credentials
DB_USER=root
DB_PASS=yourpassword
DB_HOST=localhost

SESSION_SECRET=supersecretkey
ADMIN_USERNAME=admin
```

---

# Running the Application

## Start MySQL

Ensure MySQL is running locally.

---

## Start the Server

```bash
node app.js
```

---

## Open Website

```text
http://localhost:3000
```

---

# MySQL Commands

## Login to MySQL

```bash
mysql -u root -p
```

---

## Select Database

```sql
USE credentials;
```

---

## View Users

```sql
SELECT * FROM Users;
```

---

## View Transactions

```sql
SELECT * FROM Transactions;
```

---

# AWS EC2 Deployment

## Launch EC2 Instance

* Ubuntu Server
* Open ports:

  * 22 (SSH)
  * 3000 (Application)
  * 80 (HTTP)

---

## Connect to EC2

```bash
ssh -i MyKeyPair.pem ubuntu@YOUR_PUBLIC_IP
```

---

## Install Dependencies on EC2

```bash
sudo apt update
sudo apt install nodejs npm mysql-server git -y
```

---

## Clone Repository on EC2

```bash
git clone YOUR_GITHUB_REPOSITORY
cd YOUR_PROJECT_NAME
npm install
```

---

## Run with PM2

```bash
sudo npm install -g pm2

pm2 start app.js --name bulldog-bank
pm2 save
pm2 startup
```

---

# Future Improvements

* Real Ethereum smart contract integration
* Real blockchain transactions
* Password hashing with bcrypt
* Two-factor authentication
* HTTPS support
* Docker deployment
* Live analytics dashboard
* Mobile optimization

---

# Educational Purpose

This project was developed for educational and portfolio purposes to demonstrate:

* Full-stack web development
* Web3-inspired application design
* Database management
* Cloud deployment
* Linux server administration
* Session authentication
* Simulated blockchain architecture
* AWS infrastructure deployment
