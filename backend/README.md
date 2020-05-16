# Pressato

## Prerequisites

- node 10.15.0
- yarn 1.3.2

## Stack

### Backend

1. MongoDB + Mongoose
2. NodeJS + Express
3. Redis
5. Elastic Search

#### MongoDB

You need MongoDB v3.0 installed in your machine. In Local environment, `kadalunavu` database will be created in MongoDB when the app server starts running.

To install specific version of mongodb

```bash
brew install mongodb@3.0

brew link mongodb@3.0 --force
```

To start mongodb

```bash
sudo mkdir -p /data/db

mongod
```

### Redis

You need Redis as well. Install it locally with

```bash
brew install redis
```

And start it with

```bash
redis-server ./redis.conf
```
### Node

Node 10.15.0 is used. Install node via `nvm` is recommended. Read more about nvm installation [here](https://github.com/creationix/nvm#installation)

```bash
nvm install 10.15.0
```

#### NODE_ENV

You need to set NODE_ENV variable as `development` for development environment, in your terminal.

```bash
export NODE_ENV="development"
```

Suggestion: You can set NODE_ENV in your .bash_profile

### Install dependencies

```bash
cd <project_dir>

yarn
```

### Starting the App

**Start the server:**

```bash
yarn start:server
```

This will start the express server.

**Start workers:**

```bash
$ NODE_ENV=development node workers/main.js
# or
yarn start:workers
```
