```
                         !=== Archive Status ===!

This project has been archived and will receive no further updates beyond
those I have included recently to get the project actually running and
documented. There is no guarantee the steps below will work in future.

The use of 'NODE_OPTIONS=--openssl-legacy-provider' is to get the app running
only. This is insecure and not suitable for anything beyond test/dev.

From coscript/package.json:

"scripts": {
    ...,
    "dev": "NODE_OPTIONS=--openssl-legacy-provider ...",
    ...
},
```

# 📘 CoScript

A collaborative creative writing platform for writers to meet, discuss, create, and publish their work.

CoScript was my **_3rd year final project_** built on the MERN technology stack. It sought to introduce writers
to each other and provide a dedicated platform and workspace specifically for creative writing.

Tooling:

-   The React library (built using create-react-app) for scalability and component management
-   ExpressJS to run a backend server offering a REST API
-   NodeJS and npm for backend services and package dependencies
-   NoSQL user and session databases on MongoDB
-   Schema-based application data modelling solution using Mongoose
-   Jest and Enzyme testing frameworks for unit, integration, and component testing

## ✨ Features

-   ✅ Secure registration and login
-   ✅ Email alerts
-   ✅ Custom WYSIWYG editor for rich text
-   ✅ Content authoring & publishing
-   ✅ Social network platform
-   ✅ Collaborative authoring
-   ✅ Real-time in-editor chat
-   ✅ Secure dedicated file system per-user / per-project
-   ✅ Profile customisation
-   ✅ Private DM inbox
-   ✅ Legal guidance

## 📦 Installation

### Prerequisites

```bash
Node.js >= 17
npm
Docker
Docker Compose
```

### Local Setup

Get the code:

```bash
# Clone the repository
git clone https://github.com/sedexdev/coscript.git
cd coscript
```

Install dependencies:

```bash
# From the root - coscript/
npm install

# From coscript/view
npm install

# From coscript/model
npm install

# After each you may consider running audit for some extra security
npm audit fix
```

## ⚙️ Configuration

Create a directory called `config` in the project root then create a file called `default.json` and add the following:

```json
{
    "database": {
        "mongoDataPassword": "YOUR_MONGO_DATA_PASSWORD",
        "mongoSessionPassword": "YOUR_MONGO_SESSION_PASSWORD"
    },
    "encryption": {
        "msgEncryptionKey": "A_SUITABLE_ENCRYPTION_KEY"
    },
    "tokens": {
        "jwtCode": "A_SUITABLE_SECRET_KEY_FOR_SIGNING_A_JWT",
        "jwtCode2": "A_SUITABLE_SECRET_KEY_FOR_SIGNING_A_JWT"
    },
    "session": {
        "sessionName": "YOUR_CHOSEN_SESSION_NAME",
        "sessionLife": 43200000,
        "sessionKey": "A_SUITABLE_SESSION_KEY"
    },
    "email": {
        "host": "smtp.gmail.com",
        "port": 587,
        "auth": {
            "user": "YOUR_GMAIL_ADDRESS",
            "pass": "YOUR_GOOGLE_APP_PASSWORD"
        }
    }
}
```

> Emails

The application relies on emails to verify users on sign-up, change passwords, and recover login information. To implement these features I have used the `nodemailer` npm package.

I have used an [App Password](https://support.google.com/accounts/answer/185833?hl=en) provided by Google. This is a secret that can be used to authenticate an application with Google services. Generate a password and add it to the end of the `default.json` file:

```
"email": {
    ...
    "auth": {
        "user": "YOUR_GMAIL_ADDRESS",
        "pass": "YOUR_GOOGLE_APP_PASSWORD"
    }
}
```

_If you are using another email vendor, or your own SMTP server, then swap the details under `"auth"` with credentials appropriate to your service._

> MongoDB instance credentials

Create 2 more files in the root: `.env.mongo-data` & `.env.mongo-session`and add the following:

```env
# .env.mongo-data
MONGO_INITDB_ROOT_USERNAME=data-admin
MONGO_INITDB_ROOT_PASSWORD=YOUR_MONGO_DATA_PASSWORD
MONGO_INITDB_DATABASE=mongodb-data

# .env.mongo-session
MONGO_INITDB_ROOT_USERNAME=session-admin
MONGO_INITDB_ROOT_PASSWORD=YOUR_MONGO_SESSION_PASSWORD
MONGO_INITDB_DATABASE=mongodb-session
```

Finally, create a directory called `mongo-data` in the root for the Docker Compose volumes:

```bash
mkdir mongo-data
```

> MongoDB containers

```bash
# Start the containers
sudo docker compose up -d

# Stop the containers
sudo docker compose down

# Stop the containers and destroy database
sudo docker compose down -v
```

> Inspect the MongoDB database from mongosh

```bash
# mongo-data instance
sudo docker container exec -it mongodb-data mongosh "mongodb://data-admin:YOUR_MONGO_DATA_PASSWORD@localhost:27017/mongodb-data?authSource=admin"

# mongo-session instance
sudo docker container exec -it mongodb-session mongosh "mongodb://session-admin:YOUR_MONGO_DATA_PASSWORD@localhost:27018/mongodb-session?authSource=admin"
```

### Run the development server

After following the **_Configuration_** steps above run:

```bash
npm run dev
```

This starts the dev server & opens the client in your default browser.

## 📂 Project Structure

```
coscript/
│
├── middleware/             # API middleware
├── model/                  # Database connection & schemas
├── routes/                 # API backend
├── tests/                  # Test data
├── utils/                  # Session utility functions
├── view/                   # React frontend
├── .gitignore              # Git ignore file
├── app.js                  # API server configuration
├── docker-compose.yml      # MOngoDB container config
├── package.json            # Root level dependencies
├── README.md               # This README.md file
└── server.js               # Express server configuration
```

## 🧪 Running Tests

```bash
# npm test scripts exist in the following directories
coscript/
coscript/model
coscript/view

# To run the tests use
npm run test
```

**_Disclaimer_**: As this project has been archived there has been no work done to ensure tests pass since updating this repos documentation.

## 🧑‍💻 Authors

-   **Andrew Macmillan** – [@sedexdev](https://github.com/sedexdev)
