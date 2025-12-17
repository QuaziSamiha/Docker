**16 Dec, 25**

# Docker Networks And Cross Container Communication

- [GitHub Link](https://github.com/Apollo-Level2-Web-Dev/docker-with-typescript-backend/tree/module-4)
- [Docker Cheatsheet Link](https://find-saminravi99.notion.site/Docker-Network-Key-Points-11dc48b8ac8c80469b31c81e7604cc34)

## 4-1 Container Communication And Types of Communication

- we can containarize frontend, backend, and database.

## 4-2 (Case 1) Container To WWW Communication

- [Watch Video](https://web.programming-hero.com/l2-b3-reward-courses/video/l2-b3-reward-courses-4-2-case-1-container-to-www-communication)

- `app.ts` file:

```bash
app.get("/todos", async (req: Request, res: Response) => {
  const response = await fetch('https://jsonplaceholder.typicode.com/todos');
  const todos = await response.json();
  return res.status(200).json(todos);
});
```

- `.env` file

## 4-3 (Case 2) Container To Local Host Machine Communication

- if our container try to communicate with our host computer
- we can locally install mongodb by mongodb compass
- when we work with postgres, we install it in our local machine
- in these case, we try to connect our project with a server in our local machine
- in .env file we can copy paste mongodb compass url -- in these situation how does container work

## 4-4 (Case 3) Container to Container Communication

- we can keep a database totally within a container
- it is a ideal condition that we will keep different container for frontend, backend and database
- in microservice we keep different container for different services

## 4-5 Analyzing The App For Communication

## 4-6 Creating A Container And Communicating To Web (WWW)

- `mongodb+srv://docker-user:samiha155@cluster0.9vjqq.mongodb.net/docker-db?appName=Cluster0` -db url

```bash
docker build -t ts-docker-module4:v1 .
```

```bash
 docker run -p 5000:5000 --name ts-docker-container-module4 -v ts-docker-logs:/app/logs -w /app -v "${PWD}:/app" -v /app/node_modules --env-file ./.env --rm ts-docker-module4:v1
```

```bash
 docker run -p 5000:5000 `
--name ts-docker-container-module4 `
-v ts-docker-logs:/app/logs `
-w /app `
-v "${PWD}:/app" `
-v /app/node_modules `
--env-file ./.env `
--rm ts-docker-module4:v1
```

![alt text](/module_4/image_1.PNG)
![alt text](/module_4/image_2.PNG)

- so container can connect to outside world without any issue
- so container communicate with internet or www or outside world by default without any extra steps

![alt text](/module_4/image_3.PNG)

## 4-7 Making Container To Host Container Communication

- [PH Video Link](https://web.programming-hero.com/l2-b3-reward-courses/video/l2-b3-reward-courses-4-7-making-container-to-host-container-communication)

- container behaviour to connect with local host

- `DB_URL=mongodb://localhost:27017/ts-docker-db` -- connecting mongodb compass local database url

- run :

```bash
 docker run -p 5000:5000 `
--name ts-docker-container-module4 `
-v ts-docker-logs:/app/logs `
-w /app `
-v "${PWD}:/app" `
-v /app/node_modules `
--env-file ./.env `
--rm ts-docker-module4:v1
```

- an error will occur
- within container there is no mongodb database -- so local host url is not working
- `DB_URL=mongodb://host.docker.internal:27017/ts-docker-db` # === connecting mongodb compass local database url
- run the above command and now run successfully

**17 Dec, 25**

## 4-8 A Basic Solution For Container To Container Communication

- [PH Video Link](https://web.programming-hero.com/l2-b3-reward-courses/video/l2-b3-reward-courses-4-8-a-basic-solution-for-container-to-container-communication)

- container can establish communication with www(world wide web) by default
- google search : mongo docker image
  - [mongo - official docker hub](https://hub.docker.com/_/mongo)

```bash
docker pull mongo
```

```bash
docker images
```

![alt text](/module_4/image_4.PNG)

```bash
docker run --name mongodb-container --rm mongo
```

- here we no need to declare port
- when we install mongodb database in our local machine, it runs to default port `27017`
- when create mongo container, it will run to its default port by default, we don't need to declare the port again

- no need the following command:

```bash
docker run -p 27017:27017 --name mongodb-container --rm mongo
```

- run:

```bash
docker run --name mongodb-container --rm mongo
```

```bash
docker ps -a
```

![alt-text](/module_4/image_5.PNG)

- so we install mongodb within a container and we are running that container now
- how can we connect our container with the mongodb container
- a container means another system, we can access the system by using its ip address

- run the command to know everything about a container:

```bash
docker container inspect mongodb-container
```

![alt-text](/module_4/image_6.PNG)

- change the .env db url - we put the ip address of mongodb running container 172.17.0.2 to the url instead of local host.

- run the command:

```bash
 docker run -p 5000:5000 `
--name ts-docker-container-module4 `
-v ts-docker-logs:/app/logs `
-w /app `
-v "${PWD}:/app" `
-v /app/node_modules `
--env-file ./.env `
--rm ts-docker-module4:v1
```

## 4-9 Introduction To Docker Networks

- creating container networks
  - frontend container, backend container, database container
- suppose we have more than one container, what will we do connect these container, find ip address of each one and use those ip addresses to connect to each other -- but this is a hassle
- for this reason docker is giving a feature - called docker network
- we can create a boundary and the containers within this boundary can communicate with each other
- within a docker network, all containers can communicate with each other and IPs are automaically resolved.

```bash
docker run --network my_network
```

```bash
docker network --help
```

```
Usage:  docker network COMMAND
Manage networks

Commands:
  connect     Connect a container to a network
  create      Create a network
  disconnect  Disconnect a container from a network
  inspect     Display detailed information on one or more networks
  ls          List networks
  prune       Remove all unused networks
  rm          Remove one or more networks

Run 'docker network COMMAND --help' for more information on a command.
```

- run:

```bash
docker network ls
```

- we can see some pre built network

```bash
docker network create ts-docker-network
```

```bash
docker network ls
```

![alt-text](/module_4/image_7.PNG)

- to run the mongodb container to our network:

```bash
docker run --name mongodb-container --rm --network ts-docker-network mongo
```

```
# ? BY USING DOCKER NETWORK FEATURE (instead of giving ip address we are providing mongodb container name) ==========
DB_URL=mongodb://mongodb-container:27017/ts-docker-db # === connecting mongodb compass local database url
```

```bash
 docker run -p 5000:5000 `
--name ts-docker-container-module4 `
-v ts-docker-logs:/app/logs `
-w /app `
-v "${PWD}:/app" `
-v /app/node_modules `
--env-file ./.env `
--network ts-docker-network `
--rm ts-docker-module4:v1
```

## 4-10 Docker Network Management And How Docker Resolves IP Address

- to delete a network

```bash
docker network rm network-id
```
