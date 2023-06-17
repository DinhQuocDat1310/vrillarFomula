## Vrillar Testing

Vrillar Formular 1 server.

## Description App

Crawl data base on link: https://www.formula1.com/ Handle API and connect with Database.

## Description Relationship in Database

- Driver - Team: One-to-Many
- Team - Schedule: Many-to-Many
- Schedule - TimetableEvent: One-to-Many
- TimetableEvent - EventResult: One-to-Many

## Install PostgreSQL and pgAdmin4

- You can following `Setup-Postgres-Nestjs.docx` file in `document-setup` folder to Install PostgreSQL and pgAdmin 4.

## Clone Locally

Clone the server.

```bash
$ git clone https://github.com/DinhQuocDat1310/vrillarFomula.git
```

## Environment Variables

To run this project, you need to create `.env` file in root directory and add the following environment variables in `.env.example`.

## Installation dependencies

```bash
$ yarn install
```

## Sync Database with `migrations` folder when pull server

```bash
$ yarn migrate:dev
```

## 🚀 Start the server

```bash
# development
$ yarn start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

## 🔗 Link manage API with Swagger

- Swagger URL: http://localhost:4000/vrillarFomular1_api

## 🚀 Start Prisma Studio

- Run this Bash with another Terminal.
- View and Edit data with Prisma Studio.

```bash
$ yarn prisma:studio
```

## Running Tests

```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
```

## Tech

**Server**:

- Node version: 18.15.0
- Nest version: 9.4.0

## Used for

This server used for the following Vrillar Formular 1: Backend Testing.
