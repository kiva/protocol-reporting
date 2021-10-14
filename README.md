# protocol-reporting

This service handles the various reporting requirements that may be required by a specific implementation
It is not required for the baseline protocol to work, but is just to facilitate compliance with regulations
It provides a DB implementation for storing credential exchange metadata, such as timestamps, auth methods, etc
with out exposing any underlying crendential data itself.
It also exposes a GraphQL API to handle searching, filtering, sorting, etc for accessing the exchange data

## Setup

Run:
```bash
npm install
cp dummy.env .env
```

## Developing

For local development it's easiest to run the service directly from your comupter and connect to a dockerized DB

In first tab start the DB with ports exposed
```bash
docker compose -f docker-compose.local.yml up
```

You will also need to update your .env file to refernce the DB host as localhost instead of the docker network name
```
POSTGRES_HOST=localhost
```

In second tab start server in dev mode which uses nodemon to auto-restart when it detects changes
```bash
npm run start:dev
```

The server will be exposed locally on localhost:3022 and will connect to the dockerized DB

## Production

To get an idea of how the server will run in production you can spin up the docker-compose which has the production image
```bash
docker compose build
docker compose up
```
