# Bulldog ETH Bank

## Overview

Bulldog ETH Bank is a Web3-inspired banking application built using Node.js, Express.js, MySQL, Sequelize, EJS, and MetaMask integration. The project simulates Ethereum-style banking operations while maintaining a modern cryptocurrency dashboard interface.

The application allows users to create accounts, log in securely, connect MetaMask wallets, manage simulated ETH balances, and track transaction history through a responsive Web3-style interface.

---

# Features

## User Authentication

* User signup and login system
* Session-based authentication
* Invalid credential error handling
* Logout functionality

## Simulated Web3 Dashboard

* Modern crypto-inspired user interface
* Black and gold themed dashboard design
* MetaMask wallet connection
* Live wallet address display
* Connected network detection
* Live wallet balance display

## Banking System

* Simulated ETH deposits
* Simulated ETH withdrawals
* Real-time balance updates without page refresh
* Transaction history tracking
* Fake blockchain-style transaction hashes

## Database Integration

* MySQL database backend
* Sequelize ORM integration
* User account storage
* Transaction history storage
* Persistent balance management

## Admin Dashboard

* Admin account support
* Ability to view registered users
* Account monitoring functionality

---

# Technologies Used

## Backend

* Node.js
* Express.js
* Sequelize
* MySQL

## Frontend

* EJS
* CSS
* JavaScript

## Web3 Features

* MetaMask Integration
* Ethers.js

## Deployment

* AWS EC2
* PM2
* Nginx

---

# Project Structure

```text
Bulldog_ETH_Bank/
│
├── app.js
├── package.json
├── .env
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

## Install Dependencies

```bash
npm install
```

## Configure Environment Variables

Create a `.env` file:

```env
DB_NAME=credentials
DB_USER=root
DB_PASS=yourpassword
DB_HOST=localhost

SESSION_SECRET=supersecretkey
ADMIN_USERNAME=admin
```

---

# Running the Project

## Start MySQL

Ensure MySQL is running locally.

## Start Application

```bash
node app.js
```

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

## Select Database

```sql
USE credentials;
```

## View Users

```sql
SELECT * FROM Users;
```

## View Transactions

```sql
SELECT * FROM Transactions;
```

---

# Future Improvements

* Real blockchain smart contract integration
* Real Ethereum deposits and withdrawals
* Password hashing with bcrypt
* Two-factor authentication
* Live market price integration
* AWS cloud deployment
* HTTPS security
* Real-time analytics dashboard

---

# Educational Purpose

This project was developed for educational and portfolio purposes to demonstrate:

* Full-stack web development
* Database integration
* Session authentication
* Simulated Web3 architecture
* Cryptocurrency dashboard design
