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
