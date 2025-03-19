# AgentTasker

AgentTasker is a full-stack web application designed to help administrators efficiently manage and distribute tasks among agents. With a simple interface, admins can add agents to the system and upload tasks via Excel or CSV files, which are then automatically distributed in a balanced and efficient manner.


## ✨ Features

- **User Authentication**: Secure login system for administrators
- **Agent Management**: Add agent to the system
- **Task Upload**: Import tasks via Excel or CSV files
- **Automatic Task Distribution**: Algorithm that balances workload across agents
- **Dashboard**: Visual representation of task allocation and agent workload
- **Responsive Design**: Works on desktop and mobile devices

## 🚀 Live Demo

Access the live application at: [https://agenttasker.onrender.com/home](https://agenttasker.onrender.com/home)

## 📋 Prerequisites

- Node.js (v14.0.0 or later)
- npm or yarn
- MongoDB account

## ⚙️ Installation

### 1. Clone the Repository

```bash
git clone https://github.com/ravi-kanuri/AgentTasker.git
cd AgentTasker
```

### 2. Backend Setup

```bash
cd backend
npm install
```

### 3. Frontend Setup

```bash
cd ../frontend
npm install
```

### 4. Environment Configuration

Create a `.env` file in the root directory with the following variables:

```
PORT=8000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

Replace `your_mongodb_connection_string` with your actual MongoDB connection string and `your_jwt_secret` with a secure random string.

## 🏃‍♂️ Running the Application

### Development Mode

1. Start the backend server:
```bash
cd backend
npm run dev
```

2. In a new terminal, start the frontend:
```bash
cd frontend
npm run dev
```

The frontend will typically run on [http://localhost:5173/](http://localhost:5173/)
The backend API will run on [http://localhost:8000/](http://localhost:8000/)

### Production Build

1. Build the frontend:
```bash
cd frontend
npm run build
```

2. Start the production server:
```bash
cd ../backend
npm start
```

## 📊 Usage Guide

1. **Login/Register**: Access the application and create an admin account
2. **Add Agents**: Navigate to the Agents section and add your team members
3. **Upload Tasks**: Use the upload feature to import tasks from Excel/CSV files
4. **Review Distribution**: Check the dashboard to see how tasks have been allocated
5. **Manage Tasks**: Track progress and reassign tasks as needed

## 🔧 Technologies Used

- **Frontend**: React.js, Vite, TailwindCSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Tokens)
- **File Processing**: ExcelJS, csv-parser


## 📞 Contact

Ravi Kanuri - [GitHub](https://github.com/ravi-kanuri)

Project Link: [https://github.com/ravi-kanuri/AgentTasker](https://github.com/ravi-kanuri/AgentTasker)
