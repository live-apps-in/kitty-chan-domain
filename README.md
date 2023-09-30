# kitty-chan-domain

kitty-chan-domain is a domain microservice layer of the kitty chan Discord Bot. This microservice is responsible for receiving gRPC events from the [kitty-chan-events](https://github.com/live-apps-in/kitty-chan-events) service. 

This microservice is the core domain handler which performs all operations related to Bot, Guild and Member. By relying on the shared Redis database, the domain layer effectively manages and synchronizes the information used by all the microservices. 

The communication between the different microservices is facilitated through gRPC events, with the kitty-chan-events service being responsible for sending these events to the kitty-chan-domain microservice. The domain layer then processes and handles these events, ensuring that the shared Redis database is accurately updated.

However, it's important to note that the kitty-chan Discord Bot is currently in the early stages of development. This microservice is being actively worked on to enhance its functionality and provide an enjoyable experience to the users.

# Project Setup

This guide will help you set up the project on your local machine.

## Prerequisites

- Node.js v16.16.0 (recommended using nvm)
- MongoDB
- Docker (recommended if running all other kitty chan microservices all together)
- kitty chan Events [kitty-chan-events](https://github.com/live-apps-in/kitty-chan-events). (This microservice receives events from this events service)

## Installation

1. Install Node.js v16.16.0. You can use [nvm](https://github.com/nvm-sh/nvm) to manage Node.js versions.

2. Replace .env.tpl file with the .env including actual values.

2. Install Redis on your local host or if all other kitty chan Microservices are running inside a Docker network, follow these steps:

   - Replace the `.env.tlp` file with `.env` inside the `./docker/redis` path and fill in the required fields.
   - Run the `redis.yml` file from the same directory. This is a one-time setup; once done, it can be used for all kitty chan microservices.

> Note: While setting up gRPC config, use `0.0.0.0:port` instead of `localhost:port` to avoid connectivity issues when running inside a Docker environment.

That's it! kitty chan Domain will be up and running!.
