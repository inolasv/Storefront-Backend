# Storefront Backend

## Setup/Connect to Database

1. run the docker on docker
2. `$ docker exec -it my-postgres bash`
3. `$ psql postgres -U <user>`
4. connecting:
    - for dev: `\c storefront_backend`
    - for test: `\c storefront_backend_test`


## Ports:
- server running on 0.0.0.0:3000
- database running on 0.0.0.0:5432

## Package Installation
- db-migrate: `npm i db-migrate`
    - and: `npm i db-migrate-pg`
- bcrypt: `npm i bcrypt`
- jsonwebtoken: `npm i jsonwebtoken`
- dotenv: `npm i dotenv`
- supertest: `npm i supertest`
- `@types/` for each

## Notes about Project:
- script for testing `npm run test` does not alter enviroment variable, even after including `export` or `cross-env`. To switch between test and dev, manually alter the environment variable ENV in the .env file.

## Environment Variables:

```
POSTGRES_HOST=127.0.0.1
POSTGRES_DB=storefront_backend
POSTGRES_DB_TEST=storefront_backend_test
POSTGRES_USER=inolasv
POSTGRES_PASSWORD=postgres_password
ENV=dev
BCRYPT_PASSWORD=mirrorball_cardigan13
SALT_ROUNDS=10
TOKEN_SECRET=green_mouse20
```