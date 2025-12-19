**19 Dec, 25**

# Multi-Container Orchetration with Docker Compose & Utility Containers

- [Docker Multi Container Cheat Sheet:](https://find-saminravi99.notion.site/Docker-Compose-Cheat-Sheet-12ac48b8ac8c80cdb294fb0e65b200f7?pvs=4)
- [Docker Utility Container Cheat Sheet:](https://find-saminravi99.notion.site/Docker-Utility-Container-Cheat-Sheet-12bc48b8ac8c80a9899bec65b81aa00b?pvs=4)
- [GitHub Link:](https://github.com/Apollo-Level2-Web-Dev/multi-container-docker-compose/tree/module-6)

## 6-1 Introduction to Docker Compose

- [PH Video](https://web.programming-hero.com/l2-b3-reward-courses/video/l2-b3-reward-courses-6-1-introduction-to-docker-compose-)

- one configuration file + Orchestran Commands (build, start, stop...)
- docker compose does not replace dockerfiles for custom images
- docker compose is just making a automating system of docker tasks or steps
- docker compose does not replace images or containers
- docker is only for local machine
- docker compose is not suitable for managing multiple containers on different hosts (machines)
- if we want to manage our container wihtin different host machine like docker compose, we need kubernetes.

## 6-2 Creating First Docker Compose File

- [Docker Compose](https://docs.docker.com/compose/)
- docker compose is automatically installed with our docker desktop

- run to terminal

```bash
docker-compose -v
```

- [Docker Compose Quickstart](https://docs.docker.com/compose/gettingstarted/)
- docker compose is for single developer - so it won't work at remote hosting system such as aws, another computer, etc.

- service = container

## 6-3 Creating Service For MongoDB Container In Docker Compose File

- [PH Video](https://web.programming-hero.com/l2-b3-reward-courses/video/l2-b3-reward-courses-6-3-creating-service-for-mongodb-container-in-docker-compose-file-)

- backend env file code snippet:

```bash
DB_URL=mongodb://ts-docker-user:ts-docker@mongodb-container:27017/ts-docker-db?authSource=admin
MONGO_INITDB_ROOT_USERNAME=ts-docker-user
MONGO_INITDB_ROOT_PASSWORD=ts-docker
PORT=5000
```

- run

```bash
docker-compose up
```

- to remove container, network

```bash
docker-compose down
```

```bash
docker volume ls
```

- to delete unused volumes

```bash
docker-compose down -v
```

## 6-4 Creating Service For Node-Express Container In Docker Compose File

- [PH Video](https://web.programming-hero.com/l2-b3-reward-courses/video/l2-b3-reward-courses-6-4-creating-service-for-node-express-container-in-docker-compose-file)

- in docker compose network is created by default
- run in detached mode:

```bash
docker compose up -d
```

- check in browser backend is running or not

## 6-5 Creating Service For NextJS Frontend Container In Docker Compose File

- [PH Video](https://web.programming-hero.com/l2-b3-reward-courses/video/l2-b3-reward-courses-6-5-creating-service-for-nextjs-frontend-container-in-docker-compose-file)

```bash
docker compose up
```

- .env.local

```bash
NEXT_PUBLIC_API_BASE_URL=http://ts-docker-backend-container:5000
WATCHPACK_POLLING=true
```

- to delete all volume and containers

```bash
docker-compose down -v
```

- explore health check

## 6-6 Introduction to Docker Utility Container

- [PH Video](https://web.programming-hero.com/l2-b3-reward-courses/video/l2-b3-reward-courses-6-6-introduction-to-docker-utility-container)

## 6-7 Creating A Node-Express Project From Scratch With Utility Container

- [PH Video](https://web.programming-hero.com/l2-b3-reward-courses/video/l2-b3-reward-courses-6-7-creating-a-node-express-project-from-scratch-with-utility-container)
- create a folder `node utility` and within it create `Dockerfile`

- [node - Docker Official Image](https://hub.docker.com/_/node)
- node - alpine - lighter version of node
- write only wihtin dockerfile

```bash
FROM node:20-alpine

WORKDIR /app
```

- run

```bash
docker build -t node-util .
```

- create another folder to create a project from scratch `docker project with uitlity container`

```bash
docker run --name node-utility -w /app -v "/${PWD}":/app -it -d --rm node-utility
```

```bash
docker run `
--name node-util `
-w /app `
-v "${PWD}:/app" `
-it `
-d `
--rm node-util
```

- container and image name will be same
- we want to run a container, the container will only contain an evironment not any code

```bash
docker ps -a
```

```bash
docker exec -it node-util npm init -y
```

- package.json will be created within our project folder

```bash
docker exec -it node-util npm install express
```

- package-lock.json and node_modules will be created.

```bash
docker exec -it node-util npm install -D typescript
```

- if we have no node in our system instead we can create node project by using this container

**19 Dec, 25**