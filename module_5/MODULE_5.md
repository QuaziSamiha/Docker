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
