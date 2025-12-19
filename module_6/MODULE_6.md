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