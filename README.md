# Workload Measurement Tool - Web application

[![CircleCI](https://circleci.com/gh/ministryofjustice/wmt-web/tree/main.svg?style=svg)](https://circleci.com/gh/ministryofjustice/wmt-web/tree/main)

This is the webserver application that will present the information stored in the WMT database to the end user.

It is a node.js application using the express web framework.

## Prerequisites
- Node v18 (managed using [nvm](https://github.com/creationix/nvm))
- Docker

On OSX (using [homebrew](https://brew.sh/)):

- `brew install nvm`
- Follow the instructions in the brew installer output

- Go to [Docker get started](https://www.docker.com/get-started) to install Docker

Install Node version 18
- `nvm install 18`

## Getting Started Locally

Run installation for local code 
```shell
docker compose up -d

npm install && npm run build && npm start
```

Navigate to `http://localhost:3000` to see the running application.

This application uses [HMPPS Auth](https://github.com/ministryofjustice/hmpps-auth) as the authentication provider.

To seed data run `npm run seed-dev-data`, this will add users with elevated roles. To login to a user which has a specific role please use the following usernames:

- WMT_SUPER_USER
- WMT_APPLICATION_SUPPORT
- WMT_MANAGER
- WMT_STAFF

All passwords of test users are `password123456`.

## Testing

### Unit Tests
To run Unit Tests run the following command:

```
npm t
```

### Integration Tests
To run Integration Tests run the following command:

```
docker-compose up -d
npm run integration-test
```

## E2E Tests

E2E Tests are run using Selenium and webdriver

Run tests using the following commands:

```
docker-compose up -d
npm start
npm run test-e2e # Chrome
```
