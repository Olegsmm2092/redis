# My Node Redis App

This project is a simple Node.js application that demonstrates how to connect to a Redis database using the `redis` package. 

## Project Structure

```
my-node-redis-app
├── src
│   └── index.js       # Main entry point of the application
├── package.json       # NPM configuration file
└── README.md          # Documentation for the project
```

## Installation

To get started, clone the repository and navigate into the project directory:

```bash
git clone <repository-url>
cd my-node-redis-app
```

Then, install the necessary dependencies:

```bash
npm install
```

## Usage

To run the application, use the following command:

```bash
node src/index.js
```

This will connect to the Redis server, set a key-value pair, retrieve the value, and log it to the console.

## Dependencies

- `redis`: This package is used to interact with the Redis database.

## Promt

1. connect to my redis database endpoints: redis-11015.c17.us-east-1-4.ec2.redns.redis-cloud.com:11015

2. start Node.js project with <code from redis database to Node.js>

3. to start this project n check redis connection is good?

```bash
npm i -y

npm i redis

// package.json
{
  "name": "my-node-redis-app",
  "version": "1.0.0",
  "type": "module",
  // ...other fields...
}
// run
node src/index.js

```

4. i can usage any password n username right?

5. can we're run using npm run dev or npm start

```bash
npm install --save-dev nodemon

// package.json
"scripts": {
  "dev": "nodemon src/index.js"
}
```

6. add ts files

```bash
npm run build // its create dist/with files*.js
npm run dev  // run js files from dist/*.js
```


## License

This project is licensed under the MIT License.