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

- `Dockerfile` mainly contains all the instruction to build the image.
- Container has its own file system, own network system as it is a totally isolated system.

**28 Nov, 25**

## 2-4 Building an Image & Running Container Based On Our Image

- Always check docker desktop logged in and the enginee is running.
- run for building image for the docker-with-typescript-backend:

```bash
docker build .
```

- To see all images:

```bash
docker images
```

![alt text](/module_2/image10.PNG)

- There is only one image. Copy the image id and run the image by following command:

```bash
docker run 7478f3725ef7
```

- To show only running containers / running process list:

```bash
docker ps
```

- To show both running and exit containers list:

```bash
docker ps -a
```
