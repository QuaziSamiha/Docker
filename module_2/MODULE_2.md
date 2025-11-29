**17 May, 25 -- 26 Nov, 25**

# Module 2

- [Docker Cheat Sheet 2](https://find-saminravi99.notion.site/Docker-Cheat-Sheet-10dc48b8ac8c80b79f73ece2abfc6841?pvs=4)

- [GitHub Link PH - Docker with typescript backend](https://github.com/Apollo-Level2-Web-Dev/docker-with-typescript-backend/tree/module-2)

## 2-1 What is Images & Containers?

- Container is an unit of software
- Images VS Container:
  - Container is the running 'unit of software' and
    image is the templates/blueprints for container.
  - Image contains code + required tools/runtimes.
  - Image has code and environment but image is the read only.
  - Multiple containers can be created based on one image.
  - We can create, read and write within container, we can change code within container.

### Docker Image vs Container

| Aspect       | Docker Image                                          | Docker Container                              |
| ------------ | ----------------------------------------------------- | --------------------------------------------- |
| Definition   | A template or blueprint for creating containers       | A running instance of a Docker image          |
| Nature       | Read-only                                             | Read and write                                |
| Content      | Contains application code and required tools/runtimes | Contains the running code and environment     |
| Usage        | Used to create one or more containers                 | Executes the application using an image       |
| Modification | Cannot be modified after it's built                   | Can be modified during runtime                |
| Persistence  | Persistent and reusable template                      | Temporary by default, unless volumes are used |
| Number       | One image can spawn multiple containers               | Each container is an isolated instance        |

## 2-2 Using Pre-built Images

#### Finding/Creating Image

- We need an image
- We can get image in two ways:
  1. Prebuilt image (via docker hub or creater and shared by teammates.)
  2. Write your own custom image (write your own dockerfile - based on another image).

#### How to Use Custom Image

- [Docker Hub](https://hub.docker.com/)
- In this website we can search for any image such as we search for [node](https://hub.docker.com/_/node), now we can use it in our pc only run the following command:

```bash
docker run node
```

- The `image` has downloaded from `docker hub`.

![alt text](image1.png)

- We can see this image from our `docker desktop`.

![alt text](image2.png)

- We can see all the running and exit container by the following command:

```bash
docker ps -a
```

![alt text](image3.png)

![alt text](image4.png)

- We can go to the node interactive platform from powershell :

```bash
node
```

![alt text](image7.png)

- To run node image to an interactive mode:

```bash
docker run -it node
```

![alt text](image5.png)

![alt text](image6.png)

![alt text](image8.png)
![alt text](image9.png)

- In this video we have learned how to use a prebuilt image and run it and run a container through it.

**1 June, 25**

## 2-3 Writing Our First Dockerfile

- create `Dockerfile` without any extension within a root folder of a project.
- Instruction & Explanation:

  - `FROM node:20` : By using `FROM` keyword we are declaring our environment. When the container will run, node version 20 will be installed in that container. This is the base layer.
  - `COPY . .`: Copy all the code from our current directory and move them into the container's current directory.
  - `COPY . ./app`: Copy all the code from our current directory and move them into the container's current directory and keep the code into a folder called app.
  - `RUN npm install`: if we only run this command, then nothing will be happened. We have to mention the working directory where actually the code exist. So the second command will be `WORKDIR /app`.
  - `RUN npm run dev`: This run command will run when the image will be in build process. we will write it actually because it will try to run the server within the image but we want to run the server with in the container. So the running command in the container is `CMD ["npm", "run", "dev"]`.
  - `EXPOSE 5000`

- `Dockerfile` mainly contains all the instruction to build the image.
- Container has its own file system, own network system as it is a totally isolated system.

**28 Nov, 25**

## 2-4 Building an Image & Running Container Based On Our Image

- Always check docker desktop logged in and the enginee is running.
- Buidl an image:

```bash
docker build .
```

- To see all images:

```bash
docker images
```

![alt text](/module_2/image10.PNG)

- Buidl an image:

```bash
docker build .
```

- To see all images:

```bash
docker images --all
```

![alt text](/module_2/image13.PNG)

- To run a container using image id:
- There is only one image. Copy the image id and run the image by following command:

```bash
docker run f2396f99a62d
```

![alt text](/module_2/image14.PNG)

- To show only running containers / running process list:

```bash
docker ps
```

![alt text](/module_2/image15.PNG)

- To show both running and exit containers list:

```bash
docker ps -a
```

- To stop a running docker:

```bash
docker container stop fervent_almeida
```

![alt text](/module_2/image11.PNG)

![alt text](/module_2/image12.PNG)

- To connect ports (local port and container port) and run a container:
  - In docker :
    - external that means `local` or `host system port` : left side.
    - internal that means port that will run inside container or `container port`: right side.
  - In following code snippet `local port` is `5001` and `container port` is `5000`

```bash
const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("Server is running to test Docker!");
});

app.listen(5001, () => {
  console.log("Server running on port 5000");
});
```

```bash
FROM node:22

WORKDIR /app

COPY . .

RUN npm install

EXPOSE 5000

CMD ["node", "app.js"]
```

```bash
docker run -p 5001:5000 f2396f99a62d
```

![alt text](/module_2/image16.PNG)

```bash
docker ps
```

![alt text](/module_2/image17.PNG)

```bash
docker ps -a
```

![alt text](/module_2/image18.PNG)

- When we will run in our browser we will use our port though the container will use its own port for running. In our example code snippet we will use port 5001 in our browser though the container is running on port 5000.

![alt text](/module_2/image19.PNG)

## 2-5 Deep Dive Into Docker Images

- Docker image is a read only file.
- Each time we `change` our `source code`, we cannot find the `changes` in existing docker image or running container. Each time we have to build the image. In this case at first we have to stop the running container and again build the image and then again run the container. But this process is overheaded. So we need an optimize way.

- During `image build`, these steps are called `layer`

```bash
=> CACHED [2/5] WORKDIR /app

=> CACHED [3/5] COPY package.json

=> CACHED [4/5] RUN npm install

=> [5/5] COPY . .
```

- During `image build`, working directory is taken from `cache`.

![alt text](/module_2/image22.PNG)

- But when we `rebuild` an image, `COPY . .` and `RUN npm install` are also taken from `cache`, that's why when we rebuild an image, it takes less time than the first time build.

![alt text](/module_2/image20.PNG)

- But if we changes the sequence of commands within `Dockerfile`,

#### from

```bash
FROM node:22

WORKDIR /app

COPY . .

RUN npm install

EXPOSE 5000

CMD ["node", "app.js"]
```

#### to

```bash

FROM node:22

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

EXPOSE 5000

CMD ["node", "app.js"]
```

then `RUN npm install` will be also taken from `cache`. But before doing this we also have to copy the `package.json` file into the container `working directory`. So we write the command within our `Dockerfile` as `COPY package.json .` before `RUN npm install` command.

![alt text](/module_2/image21.PNG)

- Benefit of this sequence of command is, if we don't make change in `package.json` file, it will be taken from `cache` and `npm install` will be also taken from `cache`. We don't need to install all dependency repeatedly each time of image build for a change in our `code base`. Its an `optimization` process of docker `image build`.

## 2-6 Managing Images & Containers

- Overall docker topics command

```bash
docker --help
```

- More specifc topics command

```bash
docker container --help
```

- Image can be `tagged` (`named`). (-t, docker tag ...)
- Image can be `listed`. (docker images)
- Image can be `analyzed`. (docker image inspect)
- Image can be `removed`. (docker rmi, docker prune)
- Container can be named.
- Container can be configured in detail.
- Container can be listed. (docker ps)
- Container can be removed.

```bash
docker build --help
```

```bash
docker run --help
```

- Each time we run the following command a new container will be generated:

```bash
docker run -p local_port:container_port image_id
```

- But if we don't make any change in our code base, then we don't need to create container again and again. We can `restart` our previous container.

![alt text](/module_2/image23.PNG)
![alt text](/module_2/image24.PNG)
![alt text](/module_2/image25.PNG)

```bash
docker container start trusting_galois
```

- But it won't be started in interactive mode (called `detached mode`). We cannot see the console.

## 2-7 Attached & Detached Container

```bash
docker images -a
docker run -p 5001:5000 67d083e7a545
```

![alt text](/module_2/image26.PNG)

- Here we are getting an `interactive mode`. This is called `Attached` mode.
- When we are running `container` using `image id`, we get the `attached mode` by default.

```bash
docker ps
docker container stop magical_ritchie
```

![alt text](/module_2/image27.PNG)

- We stopped the `attached mode` container by using 2 window.

```bash
docker ps -a
docker container start magical_ritchie
```

- We are running container using `container name` and without `image id`. But we can see we are not getting any `interactive mode` here. This is called `detached mode`.

![alt text](/module_2/image28.PNG)

- So when we run container by starting a container we get `Detached mode` by default.

- We can run container in `detached mode` by using `image id` by following command:

```bash
docker run -p 5001:5000 -d 67d083e7a545
```

- We can run container in `attached mode` by using `container name` by following command:

```bash
docker container start -a magical_ritchie
```

![alt text](/module_2/image29.PNG)

- So when do we use `attached mode` & `detached mode`?
  - If we don't make any change to our code base, then we won't build any new image and in that case we won't create any new container. In this case we can do work by restarting old container. In this situation, if we need to check error (development time) then we will run old container in attached mode. But in product or staging branch, when don't need to inspect terminal for error check, then we can use detached mode.

## 2-8 Deep Dive Into Container

![alt text](/module_2/image30.PNG)

- We can see each `docker image` `size` is huge.
- Most of the space is taken by `node`.
- So as many as we keep `docker image`, our storage will be reduced for this images. So we have to keep these images in managable state.

**29 Nov, 25**

- To `remove` one or multiple `docker images`

```bash
docker image rmi image_id
docker image rmi image_id image_id
```

- But if any container (running or exited) is created by using that image id, we have to delete the container before trying to remove the image.

```bash
docker image rmi 586567fcc143
```

![alt text](/module_2/image31.PNG)

- To `remove` one or multiple `docker container`.

```bash
docker container rm container_name
docker container rm container_name container_name
```

- To `remove` all `docker container` at a time.

```bash
docker container prune
```

![alt text](/module_2/image32.PNG)

- To `remove` all `docker image` at a time.

```bash
docker image prune
```

![alt text](/module_2/image33.PNG)

- Again build image

```bash
docker image build .
```

![alt text](/module_2/image34.PNG)

- We won't create any new container unless there is no change in our code base. But normally we will have changes in our codebase. So we have to create new container each time.
- We can do a trick here. The container will be removed when it exited by the following command:

```bash
docker run -p local_port:container_port -rm image_id
```

```bash
docker run -p 5001:5000 --rm 76deea2925b3
```

![alt text](/module_2/image35.PNG)
![alt text](/module_2/image36.PNG)

## 2-9 Naming & Tagging Container & Images

```bash
docker build -t image_name:version .
```

```bash
docker build -t first-docker:v1 .
```

![alt text](/module_2/image37.PNG)

- Run container using image name

```bash
docker run -p 5001:5000 --rm first-docker:v1
```

![alt text](/module_2/image38.PNG)

- Naming container

```bash
docker run -p 5001:5000 --name docker-container1 --rm first-docker:v1
docker ps
```

- To delete all custom named image

```bash
docker image prune -a
```

## 2-10 Pushing Docker Image to DockerHub

```bash
docker login
```

- [My Docker Account](https://app.docker.com/accounts/quazisamiha) - Logged in by GitHub

![alt text](/module_2/image39.PNG)

![alt text](/module_2/image40.PNG)

- First repo name: quazisamiha/first-docker-repo

![alt text](/module_2/image41.PNG)

- Connect docker account with VS Code.

![alt text](/module_2/image42.PNG)

- Mismatch of docker image name in our local and docker hub

![alt text](/module_2/image43.PNG)

- Create a new image

```bash
docker build -t quazisamiha/first-docker-repo:v1 .
```

![alt text](/module_2/image44.PNG)

- We can also rename the previous image.
- `Push image` to `DockerHub` or publish a custom image to DockerHub.

```bash
docker push quazisamiha/first-docker-repo:v1
```

![alt text](/module_2/image45.PNG)

## 2-11 Pulling Docker Image to DockerHub

- Delete all custom image

```bash
docker image prune -a
```

![alt text](/module_2/image46.PNG)

```bash
docker logout
```

```bash
docker pull quazisamiha/first-docker-repo:v1
```

![alt text](/module_2/image47.PNG)

![alt text](/module_2/image48.PNG)
