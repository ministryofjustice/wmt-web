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

### Running web application locally
- It is possible to get the web application running locally to:
  - authenticate against the dev environment
  - make networks calls to the dev environment APIs
  - integrate with a local docker postgres container. As there are multiple databases that this application integrates with, it is not possible to integrate locally with all of these databases. Therefore, there is a mechanism for running a docker postgres container and seeding some dummy data into it
- The below sections describe how to achieve all of the above

#### Create a .env file for local deployment
- Duplicate the `.env.template` file and rename the duplicated file to `.env`
- You will notice that in your new `.env` file you have all of the properties that the application requires
- You will also notice that the secret values (that are intentionally left out of `values.dev.yml` for deployments) are also intentionally not included in the `.env.template`. Here are those properties:
```
API_CLIENT_ID=<retrieve_k8s_secret__AUTH_API_CLIENT_ID>
API_CLIENT_SECRET=<retrieve_k8s_secret__AUTH_API_CLIENT_SECRET>
```
- The placeholder values of the above properties will therefore need to be swapped out for the real secrets
- these secrets are stored in `Kubenetes` and can be accessed in the `hmpps-workload` secret
- here is a guide for [connecting to the Kubernetes Cluster](https://user-guide.cloud-platform.service.justice.gov.uk/documentation/getting-started/kubectl-config.html#connecting-to-the-cloud-platform-39-s-kubernetes-cluster) to access the secrets

#### Run docker locally
- we can run `redis` locally as a docker container so that we do not need to integrate with the dev environment's redis datasource
- we can run `localstack` locally to simulate the AWS resources we need locally
- we can run `hmpps-workload` locally as a docker container so the schema for the WMT database is created for us against the `postgres` docker container that we also run locally
- the `hmpps-workload` container is run only for the db schema - we do not hit the local container's APIs. Navigate to [hmpps-workload](https://github.com/ministryofjustice/hmpps-workload) repo for more info
- so, to achieve all of the above, run this command from this repo's root directory: 
```
docker-compose up -d redis localstack postgres hmpps-workload
```
- with the above command you will have noticed that we are specifically running the `redis localstack postgres hmpps-workload` containers only. If we were to run the usual `docker-compose up -d` command then we would run the auth service and other downstream services as local containers which is not our intention here
- just running these containers is good because we limit the amount of mocking and interact with dev services as much as possible
- finally, we want to seed data to the `postgres` database container. To do this, run the following `npm script`:
```script
npm run seed-dev-data
```
- you should now be able to create a connection to the database and query the tables where there is some limited (but helpful!) data

#### Kick-off the web application locally
- In Intellij create a new Configuration by clicking `Edit Configuration` in the dropdown next to the `Run` and `Debug` buttons
- Click the `Add new configuration` button (the button with the `+` sign in the top left)
- In the resulting list find `npm` in the list and click on it
- In the resulting form take the defaults and set the following values:
    - `Command` = `run`
    - `Scripts` = `start-local`
- Hit `Apply` button
- Hit `OK` button
- Now you should see a new `start-local` run configuration in the dropdown next to the `Run` and `Debug` buttons
- You should now be in a position to run (as well as debug) the application and it will use the properties set in your new `.env` file to fire the networks calls at the dev environment
- Navigate to `http://localhost:3000` to see the running application.

## Testing

### Unit Tests
- To run Unit Tests run the following command:
```
npm test
```
- if you want to generate an html report so that you can view any failures vid=sually run this command:
```
npm run test-generate-report
```

### Integration Tests
To run Integration Tests 
- run docker containers
```
docker-compose up -d
```
- jump into localstack container and run shell script (to create the localstack AWS infra)
```
docker exec -it wmt-web-localstack bash
cd /docker-entrypoint-initaws.d
./setup-s3.sh
exit
```
  - run the following command:
```
npm run integration-test
```
- if you want to generate an html report so that you can view any failures visually run this command instead:
```
npm run integration-test-generate-report
```

## E2E Tests

E2E Tests are run using Selenium and webdriver

Run tests using the following commands:
- run docker containers
```
docker-compose up -d
```
- jump into localstack container and run shell script (to create the localstack AWS infra)
```
docker exec -it wmt-web-localstack bash
cd /docker-entrypoint-initaws.d
./setup-s3.sh
exit
```
- run the following command to start the application and run the e2e tests:
```
npm run start-dev
npm run test-e2e
```
