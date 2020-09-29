# eShop FD: backend

## Requirements
MongoDB server - at least locally hosted.

Nest CLI
```bash
$ npm install -g @nestjs/cli
```

## Installation

```bash
$ npm install
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

## Recommendation
MongoDB with unique email enforcement in users collection
```bash
db.users.createIndex( { email: 1 }, { unique: true } )
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

## Stay in touch

- Authors - Petr Hnyk (Nest backend), David Maletinsky (Vue 3 frontend)
- Website - [https://eshop.fd.cvut.cz](https://eshop.fd.cvut.cz)

## License

  eShop FD is [MIT licensed](../LICENSE).
