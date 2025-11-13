# 💰 Personal Finance Tracker (Full-Stack Project)
(But this repo contains only frontend)
A full-stack **Finance Tracker** web application built using **React + TypeScript (Frontend)** and **Flask + Python (Backend)**, integrated with multiple **AWS services** for secure, scalable, and automated financial management.

This project allows users to:
- Track income and expenses
- Set monthly budgets
- Upload receipts (auto-processed with OCR / AWS Textract)
- View a financial dashboard with charts
- Receive automated monthly reports via email

---

## 🧩 Features

### 🌐 Frontend (React + TypeScript)
- Responsive dashboard built with **React + Vite + TailwindCSS**
- Modular and clean component structure
- Dynamic charts for income/expenses
- Receipt upload interface with automatic transaction creation
- Integrated API communication with Flask backend

### ⚙️ Backend (Flask + Python)
- RESTful API endpoints for transactions, budgets, and summaries
- Automatic data extraction from receipts using **AWS Textract**
- Secure data storage and retrieval via **AWS DynamoDB**
- Monthly financial summary generation (via **AWS Lambda + EventBridge**)
- Email notifications using **Amazon SES**

---

## ☁️ AWS Cloud Architecture

This project leverages multiple AWS services for a secure and scalable deployment:

| Service | Purpose |
|----------|----------|
| **EC2** | Hosts Flask backend and APIs |
| **S3** | Stores uploaded receipt images and frontend build files |
| **CloudFront** | Distributes frontend globally with HTTPS |
| **DynamoDB** | NoSQL database for transactions and budgets |
| **Textract** | Extracts text (amounts, dates) from uploaded receipts |
| **SES (Simple Email Service)** | Sends automated monthly reports |
| **Lambda** | Executes monthly financial summaries |
| **EventBridge** | Triggers Lambda at the end of each month |
| **CloudWatch** | Monitors logs and performance |
| **IAM** | Manages permissions and roles for AWS resources |

---

## 🧱 Project Architecture Diagram

[User] → [CloudFront (React Frontend)]
↓
[Flask API on EC2]
↓
┌─────────────────────────────────────────────┐
│ AWS Cloud │
│---------------------------------------------│
│ • DynamoDB – Stores budgets & transactions │
│ • S3 – Stores uploaded receipts │
│ • Textract – Extracts data from receipts │
│ • SES – Sends monthly summary emails │
│ • Lambda – Runs automated reports │
│ • EventBridge – Schedules Lambda triggers │
│ • CloudWatch – Monitors system logs │
│ • IAM – Role-based access control │
└─────────────────────────────────────────────┘

yaml
Copy code

---

## 🧰 Tools & Technologies Used

### Frontend
- React + TypeScript + Vite  
- TailwindCSS + ShadCN/UI  
- Recharts (for data visualization)  
- Fetch API / Axios  
- PM2 (for process management on EC2)

### Backend
- Flask (Python)
- Boto3 (AWS SDK)
- UUID, Datetime, JSON libraries
- Flask-CORS for secure API communication

### AWS Services
- EC2, S3, DynamoDB, SES, Textract, Lambda, EventBridge, CloudWatch, IAM, CloudFront

### DevOps & Utilities
- Git & GitHub (Version Control)
- AWS CLI for deployment
- NGINX for reverse proxy (optional)
- VS Code as main IDE

---

## ⚙️ Installation & Setup

### 1. Clone the Repository
```bash
git clone https://github.com/<your-username>/finance-tracker.git
cd finance-tracker
2. Frontend Setup
bash
Copy code
cd frontend
npm install
npm run build     # for production build
npm run dev       # for local development
3. Backend Setup
bash
Copy code
cd backend
pip install -r requirements.txt
python app.py
4. Environment Variables
Create a .env or config.py file with:

bash
Copy code
AWS_REGION=us-east-1
TRANSACTIONS_TABLE=Transactions
BUDGETS_TABLE=UserBudgetsNew
S3_BUCKET=finance-tracker-store
5. Deploying on AWS
Upload the built frontend (dist/) to S3

Create a CloudFront Distribution for global access

Deploy Flask backend on EC2

Setup IAM roles for S3, DynamoDB, SES, Textract, and CloudWatch

Create Lambda function for monthly summary emails

Schedule using EventBridge

🧾 Key API Endpoints
Method	Endpoint	Description
GET	/transactions	Fetch all transactions
POST	/transactions	Add a new transaction
GET	/budget	Get monthly budget and spent
POST	/budget	Set monthly budget
POST	/upload-receipt	Upload receipt → extract data → add transaction
GET	/summary	Fetch income, expenses, and balance summary

