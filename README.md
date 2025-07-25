# 📘 CoScript

A collaborative creative writing platform for writers to meet, discuss, create, and publish their work.

CoScript was my 3rd year final project built on the MERN technology stack. It sought to introduce writers
to each other and provide a dedicated platform and workspace specifically for creative writing.

Technology stack:

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
Node.js >= 18
npm
Docker
```

### Local Setup

Get the code

```bash
# Clone the repository
git clone https://github.com/sedexdev/coscript.git
cd coscript
```

After following the _Configuration_ steps below run:

```bash
npm run dev
```

This starts the dev server & opens the client in your default browser.

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

## 📂 Project Structure

```
coscript/
│
├── src/                # Source files
├── tests/              # Unit and integration tests
├── docs/               # Documentation
├── .github/            # GitHub workflows and issue templates
├── .env.example        # Sample environment config
├── Dockerfile
└── README.md
```

## 🧪 Running Tests

```bash
# Example with Jest or Pytest
npm test
# or
pytest
```

## 📄 Documentation

-   [API Reference](docs/api.md)
-   [User Guide](docs/user-guide.md)
-   [Contributing Guide](CONTRIBUTING.md)

## 🙌 Contributing

Contributions are welcome! Please follow the [contributing guidelines](CONTRIBUTING.md) and check for open [issues](https://github.com/sedexdev/coscript/issues).

## 🐛 Reporting Issues

Found a bug or need a feature? Open an issue [here](https://github.com/sedexdev/coscript/issues).

## 🧑‍💻 Authors

-   **Andrew Macmillan** – [@sedexdev](https://github.com/sedexdev)

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📣 Acknowledgements

-   [Tool/Library Name](https://link-to-tool.com)
-   Inspiration from [repo-name](https://github.com/user/repo)

<h2><b>Getting started</b></h2>

<h3><b>Pre-requisites</b></h3>

Start off by installing the application's dependencies. In the root directory run:

<code>npm install</code>

Once this completes, create a directory called <code>config</code> in the root directory.

**Note** To run this application you will need to create a few things. Since this application is open for anyone to modify and play around with, it makes sense that there are no database configurations, encryption keys, email credentials, or personal information exposed on GitHub.

You will need to:

<ul>
  <li>have <code>Node.js and npm</code> installed</li>
  <li>create 2 new MongoDB database instances on https://www.mongodb.com/ (free clusters are available). One of these is for user and resource management and the other is for user session data</li>
  <li>have some way of sending emails. I am using Google's SMTP server</li>
  <li>create a configuration file called <code>default.json</code> for data needed to compile the application</li>
</ul>

<h3><b>Configuration</b></h3>

<code>cd</code> into the <code>config</code> folder and create a file called <code>default.json</code> and add the following configuration data:

<pre>
  <code>
    {
        "database": {
            "mongoURI": [YOUR_MAIN_MONGODB_URI],
            "mongoSessionURI": [YOUR_SESSION_MONGODB_URI]
        },
        "encryption": {
            "msgEncryptionKey": [A_SUITABLE_ENCRYPTION_KEY_FOR_ENCRYPTING_STRING_DATA]
        },
        "tokens": {
            "jwtCode": [A_SUITABLE_SECRET_KEY_FOR_SIGNING_A_JWT],
            "jwtCode2": [A_SUITABLE_SECRET_KEY_FOR_SIGNING_A_JWT]
        },
        "session": {
            "sessionName": [YOUR_CHOSEN_SESSION_NAME],
            "sessionLife": [YOUR_CHOSEN_SESSION_LIFE],
            "sessionKey": [A_SUITABLE_SESSION_KEY]
        },
    }
  </code>
</pre>

To learn more about JSON Web Tokens (JWTs) and their purpose visit: https://jwt.io/

To learn more about how sessions are handled using the <code>express-sessions</code> package visit: https://www.npmjs.com/package/express-session

<h3><b>Email Server</b></h3>

The application uses emails to verify a users email address when they sign up, change passwords, and recover login information. To implement these features I have used the <code>nodemailer</code> npm package.

If you intend to use Google's SMTP server (configurable through your GMail Settings) to send emails, then add this to the end of the <code>default.json</code> file:

<pre>
  <code>
    "email": {
        "host": "smtp.gmail.com",
        "port": 587,
        "auth": {
            "user": "[YOUR_GMAIL_ADDRESS]",
            "pass": "[YOUR_GMAIL_PASSWORD]"
        }
    }
  </code>
</pre>

If you are using another vendors, or your own, SMTP server then swap the details under <code>"email"</code> for the details appropriate to your service.

**Note** If using GMail, you will need to <a href='https://support.google.com/accounts/answer/6010255?hl=en' target='_blank'>Allow Less Secure Apps through your GMail Account</a>. You will also need to enable IMAP in your GMail settings. Other providers may have other requirements, refer to their documentation for advice.

The application should now be ready to run in development mode.

<h3><b>Run the development server</b></h3>

Finally, return to the root directory and run:

<code>npm run dev</code>

<h3><b>Tests</b></h3>

Tests can be run from <code>root</code>, <code>view</code> and <code>model</code> directories:

<code>npm run test</code>

**Note** running <code>npm run test</code> from <code>root</code> will cause all tests in <code>view</code> to fail because the frontend uses <code>react-scripts test</code> which has its own test-runner configuration
