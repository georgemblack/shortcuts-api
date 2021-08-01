# Shortcuts API

A private API for use with Apple Shortcuts. This API provides a write-only interface.

## Running Locally

First, start the mock server. (Mock server runs a local UI [here](http://localhost:8081/mockserver/dashboard).)

```
docker-compose -f mock/docker-compose.yml up
```

Then, start the service:

```
yarn start
```