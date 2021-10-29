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

You will also need to update your .env file to refernce the DB host using localhost, not the docker network name
```
POSTGRES_HOST=localhost
```

In first tab start the DB with ports exposed
```bash
docker compose -f docker-compose.local.yml up
```

In second tab start server in dev mode which uses nodemon to auto-restart when it detects changes
```bash
npm run start:dev
```

The server will be exposed locally on localhost:3022 and will connect to the dockerized DB

## Production

To get an idea of how the server will run in production you can spin up the docker-compose which has the production image
Right now we don't test the production image in circle ci because it takes quite a long time to set up, however, if we 
see any issues with the production image in the future we can add a prod-test job, and spin up docker-compose with --abort-on-container-exit
which will inform us if there's an issue with the production image

And then build and run the docker compose files
```bash
docker compose build
docker compose up --abort-on-container-exit
```

## Graphql

You can access a convenient graphql GUI at ```localhost:3022/graphql```
Here are some sample queries

Add a report:
```
mutation {
  createOneReport(input: {
    report: {
      auth_method: "FINGERPRINT",
      verifier_id: "1",
      verifier_user_id: "abc",
      request_id: "1",
      session_id: "1",
      result_code:"SUCCESS",
      success: true
    }
  }) {
    id,
    create_time
  }
}
```

Query reports with filter getting a cursor:
```
{
  reports (filter: { auth_method: { eq: "FINGERPRINT" } } ) {
    pageInfo {
      hasNextPage
      hasPreviousPage
      startCursor
      endCursor
    }
    edges {
      node {
      	id
    		create_time
    		auth_method
      }
      cursor
    }
  }
}
```
