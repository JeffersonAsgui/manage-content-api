# MANAGE-CONTENT-API

## For running the application you need:

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ npm install
```
## Running Docker Compose

```bash
$ docker-compose up -d
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```
## Insert User Admin to test API

```bash
INSERT into "user" ("name" ,"type") values ( 'Admin', 'ADMIN');

# Access: http://localhost:3000/graphql

```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
