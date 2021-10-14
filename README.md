# protocol-reporting

This service handles the various reporting requirements that may be required by a specific implementation
It is not required for the baseline protocol to work, but is just to facilitate compliance with regulations
It provides a DB implementation for storing credential exchange metadata, such as timestamps, auth methods, etc
with out exposing any underlying crendential data itself.
It also exposes a GraphQL API to handle searching, filtering, sorting, etc for accessing the exchange data

## Running

For local development it's probably easiest to run the service locally and conneecting to a dockerized postgres DB
For circle ci we deploy the production docker image of the service and a dockerized postgres DB
