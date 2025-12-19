**17 Dec, 25**

# Building Multi-Container Application with Docker

- [Cheat Sheet](https://find-saminravi99.notion.site/Docker-Multi-Container-Cheat-Sheet-123c48b8ac8c804089a3ea15d0900557?pvs=4)
- [Backend GitHub Link](https://github.com/Apollo-Level2-Web-Dev/docker-with-typescript-backend/tree/module-5)
- [Frontend GitHub Link](https://github.com/Apollo-Level2-Web-Dev/docker-with-nextjs-frontend/tree/module-5)

**18 Dec, 2025**

## 5-1 Steps To Build A Multi Container Application

- our monolithic demo project
  - database (mongodb) <-> backend (nodejs rest api) <-> frontend (nextjs)
  - database: database will remain locally in the container like we use in our computer so if container is deleted then whole data will be deleted - so we must need to persist data | access should be limited (when we use url from mongodb atlas we we use username and password but in case of use locally like mongodb compass we only use url not required username and password but when we will use db locally in container for security purpose we will set an username and password - then we can securely keep this database within aws, cloud).
  - backend: data must persist (like survive log file) | live source code update (bind mount)
  - frontend: live source code update

## 5-2 Analyzing The Apps Needed To Build A Multi Container Application

```
DB_URL=mongodb+srv://docker-user:samiha155@cluster0.9vjqq.mongodb.net/?appName=Cluster0
```

## 5-3 Dockerizing MongoDB Service

```bash
docker images
```

```bash
docker run --name mongodb-container --rm mongo
```

**19 Dec, 25**

- we are not exposing port differently as we are running database container and backend container in same network
- but if the scenario is that we are running backend locally and the database is running within container then we need to expose a port

```bash
docker run --name mongodb-container --rm -p 27017:27017 mongo
```

- now if we use:

```
DB_URL=mongodb://localhost:27017/
```

![alt-text](/module_5/image_1.PNG)

```bash
docker container stop mongodb-container
```

![alt-text](/module_5/image_2.PNG)

- so till now we have dockerize the db and run the backend locally and connect them.

## 5-4 Dockerizing NodeJS App

```
DB_URL=mongodb://localhost:27017/
```

- here we publish a port and this is not secure, anyone can access
- so we will create a network so that we don't need to publish the port

```bash
docker network create ts-docker-next
```

```bash
docker network ls
```

```bash
docker container stop mongodb-container
```

```bash
docker run --name mongodb-container --rm --network ts-docker-next mongo
```

```
DB_URL=mongodb://mongodb-container:27017/
```

- build image for backend:

```bash
docker build -t ts-docker-backend-m5:v1 .
```

- run backend container:

```bash
 docker run -p 5000:5000 `
--name ts-docker-backend-container `
-v ts-docker-logs:/app/logs `
-w /app `
-v "${PWD}:/app" `
-v /app/node_modules `
--env-file ./.env `
--network ts-docker-next `
--rm ts-docker-backend-m5:v1
```

## 5-5 Dockerizing NextJS App

- build an image for frontend

```bash
docker build -t ts-docker-frontend:v1 .
```

```bash
docker run -p 3000:3000 `
--name ts-docker-frontend-container `
--env-file .env.local `
--network ts-docker-next `
--rm  ts-docker-frontend:v1
```

```bash
docker ps -a
```

- from

```
NEXT_PUBLIC_API_BASE_URL=http://localhost:5000
```

- to

```
NEXT_PUBLIC_API_BASE_URL=http://ts-docker-backend-container:5000
```

- always localhost = container-name
- for this change into `env.local` file we need to build an image again
- to avoid this hassle we need to add a volume

```bash
docker build -t ts-docker-frontend:v2 .
```

```bash
docker run -p 3000:3000 `
--name ts-docker-frontend-container `
-w /app `
-v "${PWD}:/app" `
--env-file .env.local `
-v /app/node_modules `
--network ts-docker-next `
--rm  ts-docker-frontend:v2
```

- in backend to connect at see change in code dynamically we add `--poll` flag, but in frontend we have no such scope to do that
- in that case in our command we can add environment vairable along with environment variable

```bash
docker run -p 3000:3000 `
--name ts-docker-frontend-container `
-w /app `
-v "${PWD}:/app" `
--env-file .env.local `
-v /app/node_modules `
--network ts-docker-next `
-e WATCHPACK_POLLING=true `
--rm ts-docker-frontend:v2
```

- we can also keep this to loca.env file

## 5-7 Persisting Data is MongoDB Container

- after deleting container the data are not surviving and another issue is anyone can access the database, the database is not secure.
- stop the mongodb container

- [mongo docker official image](https://hub.docker.com/_/mongo)
- search ctrl+f and write volume
- here we will add a name volume

```bash
docker run --name mongodb-container --rm -v ts-dcoker-db:/data/db --network ts-docker-next mongo
```

- so here by using named volume we are connecting our local machine with mongo container and persist our data -- this is a simple way to persist data
- [PH Video](https://web.programming-hero.com/l2-b3-reward-courses/video/l2-b3-reward-courses-5-7-persisting-data-is-mongodb-container)

## 5-8 Adding Security Layer For The MongoDB Container

- [PH Video](https://web.programming-hero.com/l2-b3-reward-courses/video/l2-b3-reward-courses-5-8-adding-security-layer-for-the-mongodb-container)

- [mongo docker official image](https://hub.docker.com/_/mongo)
- search ctrl+f and write username
- search ctrl+f and write security

- stop running mongodb container and backend container (if running)

- to see named volume

```bash
docker volume ls
```

- at first remove all running container associated with the volume
- to remove all volume

```bash
docker volume prune -f
```

- now add an environment variable with previous command

```bash
docker run `
--name mongodb-container `
-v ts-dcoker-db:/data/db `
-e MONGO_INITDB_ROOT_USERNAME=ts-docker-user `
-e MONGO_INITDB_ROOT_PASSWORD=ts-docker `
--network ts-docker-next `
--rm mongo
```

- run backend container 

```bash
docker run -p 5000:5000 `
--name ts-docker-backend-container `
-v ts-docker-logs:/app/logs `
-w /app `
-v "${PWD}:/app" `
-v /app/node_modules `
--env-file ./.env `
--network ts-docker-next `
--rm ts-docker-backend-m5:v1
```