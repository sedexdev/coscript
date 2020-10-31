<h1>CoScript</h1> 

A collaborative creative writing platform for writers to meet, discuss, create, and publish their work.

CoScript is a JavaScript application that implements the MERN technology stack. It seeks to introduce writers to each other and provide a dedicated platform and workspace that is specifically for creative writing.

Technology stack: 

<ul>
  <li>The React library (built using create-react-app) for scalability and component management</li>
  <li>ExpressJS to run a backend server offering a REST API</li>
  <li>NodeJS and npm for backend services and package dependencies</li>
  <li>User and resource creation and management system using MongoDB</li> 
  <li>Schema-based application data modelling solution using Mongoose</li>
  <li>Jest and Enzyme testing frameworks for unit and component testing</li>
</ul>

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

If you intend to use GMail as I have to send emails, then add this to the end of the <code>default.json</code> file:

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

If you are using another vendors, or your own SMTP server, then swap the details under <code>"email"</code> for the details appropriate to your service.

**Note** If using GMail, you will need to <a href='https://support.google.com/accounts/answer/6010255?hl=en' target='_blank'>Allow Less Secure Apps through your GMail Account</a>. You will also need to enable IMAP in your GMail settings. Other providers may have other requirements, refer to their documentation for advice.

The application should now be ready to run in development mode.

<h3><b>Run the development server</b></h3>

Finally, return to the root directory and run:

<code>npm run dev</code>

<h3><b>Tests</b></h3>

Tests can be run from <code>root</code>, <code>view</code> and <code>model</code> directories:

<code>npm run test</code>

**Note** running <code>npm run test</code> from <code>root</code> will cause all tests in <code>view</code> to fail because the frontend uses <code>react-scripts test</code> which has its own test-runner configuration
