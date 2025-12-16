**12 Dec, 2025**

- [Github](https://github.com/Apollo-Level2-Web-Dev/docker-with-typescript-backend/tree/module-3)
- [Notion - Bind Mount, Dev Container & Ts Node Dev Cheat Sheet](https://find-saminravi99.notion.site/Bind-Mount-Dev-Container-Ts-Node-Dev-Cheat-Sheet-117c48b8ac8c804aabb5ed0f09bc69a9)

## 3-1 Understanding Data Categories

- Data Management in Docker
- What is `Data Management`?
  - project size, node environment size, node modules size --> all of these are data
  - Application(code + environment) - Where do these data remain in docker? - These application's data remain in the `Docker Image`.
  - `Docker Image` is the snapshot of our code and its dependency, we keep our code and environment in the image.
  - Data:
    - `Application (Code + Environment)`
    - Written & Provided by you (= the developer)
    - Added to image and container in build phase
    - "Fixed": Can't be changed once image is built
    - `Read-only, hence stored in Images`.
      - So our application, its size -- all are `primary data` of the `Docker Image`.
    - `Temporary App Data (e.g. entered user input)`
    - Fetched/Produced in running container
    - Stored in memory or temporary files
    - Dynamic and changing. but cleared reqularyly.
    - `Read + write, temporary, hence stored in container`.
      - When container will run, these extra files will be created within internal file system of the container, and these are the temporary data of the Docker Image. When a container will be deleted, these temporary data will also be deleted.
    - `Permanent App Data (e.g user accounts)`
    - Fetched/Produced in running container
    - Stored in files or a database
    - Must not be lost if contianer stops/restarts.
    - `Read+write, eprmanent, stored with Containers and Volumes`.
  - We cannot push any new changes to the `Docker Image`. If we make any changes, then we have to build the `Docker Image` and rerun the `Container`.
  - `Docker Image` is `read-only` because we share this image with the clients or teammates.
  - We add a `Container Layer` with the image.
  - container has an internal file system like computer. Using that file system we can perform read write operation. But docker image has no internal file system.
  - A Container Is Based on An Image
    - Container (Read-Write)
      - Container Layer (read-write)
      - Instruction#3: Image Layer 3
      - Instruction#2: Image Layer 2
      - Instruction#1: Image Layer 1
    - Image (Read-only)

## 3-2 Analyzing A Real App

- logger add to this backend project
- What is `Logger`?

## 3-3 Dockerizing The New Updates Of The App

- build an image

```bash
docker build -t ts-docker-module3:v1 .
```

**13 Dec, 2025**

```bash
 docker images -a
```

- Started a container with auto delete after stop the container.

```bash
 docker run -p 5000:5000 --name ts-docker-container-module3 --rm ts-docker-module3:v2
```

- We will see any log folder is not creating in our project directory. Beacuse the log folder is creating within container.

![alt text](/module_3/image_1.PNG)

- Throw error forcefully (hard reload the page)

![alt text](/module_3/image_2.PNG)

- and observe error log.

![alt text](/module_3/image_3.PNG)
![alt text](/module_3/image_4.PNG)

- stop the container.

```bash
docker container stop ts-docker-container-module3
```

- Rerun the container

```bash
 docker run -p 5000:5000 --name ts-docker-container-module3 --rm ts-docker-module3:v2
```

![alt text](/module_3/image_5.PNG)

- Now we won't be able to see the log. This is an issue.
- This issue occurs because of as container has its internal file system, when we delete the container, the file system is also deleted like if we reset our computer all the files will be deleted. When we create a container with auto delete after stopping the container, the container deleted with all of its file. So we are unable to get the log files after rerunning the container.

- Run a container without auto removing mode

```bash
 docker run -p 5000:5000 --name ts-docker-container-module3 ts-docker-module3:v2
```

- Then stop it.

```bash
docker container stop ts-docker-container-module3
```

- Rerun the container

```bash
docker container start --attach ts-docker-container-module3
```

- We can see now that previous log is not removed.

- Suppose we create container without removed mode. Run the container. Stop the container. Then remove the container.

```bash
docker container prune
```

- If we create and run the container, then we can see the error logs are removed. The same issue.
- When we provide a new image to production, this issue will occur and all of our previous logs will be deleted

## 3-4 Introduction To Docker Volumes

- The solution of this issue is `Docker Volumes`.
- Understanding Volumes:
  - Volumes are folders on your host machine hard drive which are mounted("made available", mapped) into containers.
  - Host (Your Computer)
  - /same-path <----> /app/user-data
- we want the files of log folder within container will survive istead of deleting the container.
- Docker volume will connect/mount the log folder within it with our a folder of our computer.
- if we want to reset our computer and don't want to lost important files, we can keep those important files within a pendrive or an ssd which is a totally different place from our computer. after reseting computer files will be removed but from ssd or pendrive we can get the files. in the same way we can use docker volume which will keep the log folder to our computer besides of container, so after deleting the container we can get the log files.

```bash
COPY . .
```

- By using the above command docker copy all code from our host computer to docker container or docker image. we will implement this concept in case of docker volume for log folder.
- copy . . -- connected with image and volumes -- connected with container

```bash
VOLUME ["/app/logs"]
```

```bash
docker build -t ts-docker-module3:v3 .
```

```bash
 docker run -p 5000:5000 --name ts-docker-container2-module3 --rm ts-docker-module3:v3
```

- Then test the application again by repeating those steps. (Force to throw an error)

```bash
docker container stop ts-docker-container2-module3
```

```bash
 docker run -p 5000:5000 --name ts-docker-container2-module3 --rm ts-docker-module3:v3
```

## 3-5 Named Volumes & Removing Anonymous

- Two types of external data storages
  - volumes (managed by docker)
  - bind mounts (managed by user/your)
- volumes two types
  - anonymous volumes
    - docker sets up a folder / path on your host machine. exact location is unknown to you (=dev). Managed via docker volume commands.
  - named volumes
    - a defined path in the container is mapped to the createdd volume / mount e.g. /some-path on your hosting machine is mapped to /app/data

```bash
docker volume --help
```

#### Anonymous Volume

- if a container is running then we can see the volume name

```bash
docker volume ls
```

- anonymous volume will be removed if container is stopped.

#### Named Volume

- comment out the `VOLUME ["/app/logs"]`

```bash
 docker run -p 5000:5000 --name ts-docker-container2-module3 --rm -v ts-docker-logs:/app/logs ts-docker-module3:v3
```

```bash
docker volume ls
```

```bash
docker container stop ts-docker-container2-module3
```

```bash
docker volume ls
```

- name volume won't be deleted if container is stopped.

```bash
 docker run -p 5000:5000 --name ts-docker-container2-module3 --rm -v ts-docker-logs:/app/logs ts-docker-module3:v3
```

- Now we can see previous log messages as they are stored.

- To remove the volume:

```bash
docker volume rm ts-docker-logs
```

```bash
docker volume prune
```

- Great for data which should be persistent but which you don't nedd to edit directly.
- you ddefine a folder/ path on your host machine.
- great for persisten, editable (by you) data (e.g. source code).

**14 Dec, 2025**

## 3-6 Getting Started With Bind Mounts

- We use named volume to solve the issue of anonymous volume.
- Use case of anonymous volume (have to study)
- Volumes is contolled by docker
- Docker knows in which place of the local machine the mirror log folder is located. In case of anonymous volume the folder name (log folder) is anonymous and in case of named volume the folder name (log folder) is given by us. Still the folder location is unknown in both case.
- Instead of deleting container, to keep the log folder in product or in AWS (where we run the container) we use volumes concept in docker.
- Bind Mounts is contorlled by ourself.

- Two types of external data storages

  - volumes (managed by docker)
  - bind mounts (managed by user/your)

- Volumes are folders on your host machine hard drive which are mounted("made available", mapped) into containers.
- Host (Your Computer)
  - /same-path <----> /app/user-data
- Volumes persist if a container shuts down. If a container (re-)starts and mounts a volume, any data inside of that volume is available in the container.
- A contianer can write data into a volume and read data from it.

**15 Dec, 25**

- Bind mount is like container.
- Volume (unknown location) and Bind mount (known location) both are folder in our local (outside of container).
- But in bind mount we explicitly select the folder path in our local machine. if we make any change in this folder it reflect to the container and vice verse if any changes happen to the container it will reflect to our local machine folder. In this way we create a connection between our local machine and the container.

```bash
 docker run -p 5000:5000 --name ts-docker-container3-module3 -v ts-docker-logs://app/logs// -w //app -v "F://9. Docker/docker-with-typescript-backend-module3"://app --rm ts-docker-module3:v3
```

- `-v ts-docker-logs://app/logs//` here `-v` means named volume and `volume-name://app/logs` indicated volume name and `/app/logs` indicates our working directory app folder and logs folder within it. `-v "F:/9. Docker/docker-with-typescript-backend-module3"://app` here `-v` is for bind mount and we have to give `absolute` path and `//app` indicates. `-w //app` here `-w` indicates working directory.

- right click on mouse on hover any file of root directory of project and select `Reveal in File Explorer`.

## 3-7 Combining & Merging Different Volumes

F:\9. Docker\docker-with-typescript-backend-module3\package.json

- open git bash within project directory and select the path:
  `/f/9. Docker/docker-with-typescript-backend-module3`

**16 Dec, 2025**

```bash
 docker run -p 5000:5000 `
--name ts-docker-container3-module3 `
-v ts-docker-logs:/app/logs `
-v "F:/9. Docker/docker-with-typescript-backend-module3:/app" `
-w /app `
--rm ts-docker-module3:v3
```

```bash
 docker run -p 5000:5000 --name ts-docker-container3-module3 -v ts-docker-logs:/app/logs -v "F:/9. Docker/docker-with-typescript-backend-module3:/app" -w /app --rm ts-docker-module3:v3
```

```bash
 docker run -p 5000:5000 `
--name container-name `
-v volume-name:the file/folder name which should keep within the container `
-v "porject-path:/app" `
-w /app `
--rm image-name:image-tag
```

- bind mount = by running above command we are trying to connect the whole code base with container - but this will overwrite our current container code with these codebase code
- when we will enter docker technology, we won't keep logs, node_modules folder in our local code base, we will try to manage all these folder within container.
- so in our local code base we have no node_modules, logs folder.
- so by running the above code our code code will overwrite to container, but our code base has no node_modules folder, so container node_modules will also remove.
- so we have to tell container to copy our code base and overwrite it but except the node_modules folder.
- so we have to make survive node_modules folder within container.
- and whenever we talk about survive in docker, we need docker volume.
- to do this we will add another volume with the above command, this volume will be anonymous volume.

```bash
 docker run -p 5000:5000 `
--name ts-docker-container3-module3 `
-v ts-docker-logs:/app/logs `
-w /app `
-v "F:/9. Docker/docker-with-typescript-backend-module3:/app" `
-v /app/node_modules `
--rm ts-docker-module3:v3
```

```bash
 docker run -p 5000:5000 --name ts-docker-container3-module3 -v ts-docker-logs:/app/logs -w /app -v "F:/9. Docker/docker-with-typescript-backend-module3:/app" -v /app/node_modules --rm ts-docker-module3:v3
```

- `-v /app/node_modules ` this part creating anonymous volume
- anonymous volume will be deleted if container is deleted. but named-volume won't be deleted if the container is deleted.
- we are keeping node_modules folder as anonymous volume because when a container will be created, node_modules will also created from package.json so we don't need to survive node_modules folder after deleting a container
- at first we are providing named-volume (`-v ts-docker-logs:/app/logs`) because when container is created we need previous log data, and only named-volume is survived after deleting a container so we keep logs folder in named-volume.
- `"F:/9. Docker/docker-with-typescript-backend-module3:/app"` - connecting whole app with container.

- make a change to local code base app.ts file, and see the change in the website without building new image.

```bash
app.get("/", (req: Request, res: Response) => {
  res.status(200).send(`
   <html>
      <head>
        <title>Docker Logs Viewer</title>
        <link rel="stylesheet" href="/styles.css">
      </head>
      <body>
        <h1>Welcome to the Docker Logs Viewer Page 16 Dec, 25!</h1>
        <p>Go to <a href="/logs/errors">Error Logs</a> or <a href="/logs/successes">Success Logs</a>.</p>
      </body>
    </html>
  `);
});
```

## 3-8 Polishing The Bind Mount Command

- but see the changes we have to add a flag in package.json

```bash
"dev": "ts-node-dev --respawn --transpile-only --poll src/server.ts",
```

- we added `--poll` flag

- then run this command without building image :

```bash
 docker run -p 5000:5000 `
--name ts-docker-container3-module3 `
-v ts-docker-logs:/app/logs `
-w /app `
-v "F:/9. Docker/docker-with-typescript-backend-module3:/app" `
-v /app/node_modules `
--rm ts-docker-module3:v3
```

or

```bash
 docker run -p 5000:5000 --name ts-docker-container3-module3 -v ts-docker-logs:/app/logs -w /app -v "F:/9. Docker/docker-with-typescript-backend-module3:/app" -v /app/node_modules --rm ts-docker-module3:v3
```

- optimize the above command (it can execute in git bash - not in powershell):

```bash
 docker run -p 5000:5000 `
--name ts-docker-container3-module3 `
-v ts-docker-logs:/app/logs `
-w /app `
-v "/$(pwd)":/app `
-v /app/node_modules `
--rm ts-docker-module3:v3
```

```bash
 docker run -p 5000:5000 --name ts-docker-container3-module3 -v ts-docker-logs:/app/logs -w /app -v "/$(PWD)":/app -v /app/node_modules --rm ts-docker-module3:v3
```

- `pwd` - present working directory
- optimize the above command (it can execute in powershell):

```bash
 docker run -p 5000:5000 `
--name ts-docker-container3-module3 `
-v ts-docker-logs:/app/logs `
-w /app `
-v "${PWD}:/app" `
-v /app/node_modules `
--rm ts-docker-module3:v3
```

```bash
 docker run -p 5000:5000 --name ts-docker-container3-module3 -v ts-docker-logs:/app/logs -w /app -v "/${PWD}:/app" -v /app/node_modules --rm ts-docker-module3:v3
```

- `pwd` - present working directory
- optimize the above command (it can execute in command prompt):

```bash
 docker run -p 5000:5000 `
--name ts-docker-container3-module3 `
-v ts-docker-logs:/app/logs `
-w /app `
-v "%cd%":/app `
-v /app/node_modules `
--rm ts-docker-module3:v3
```

```bash
 docker run -p 5000:5000 --name ts-docker-container3-module3 -v ts-docker-logs:/app/logs -w /app -v "%cd%":/app -v /app/node_modules --rm ts-docker-module3:v3
```

- `cd` - current directory

## 3-9 Running a Container Directly with VS Code

- install `Dev Containers` extension of VS code
- `.devcontainer` create this folder wihtin project root
- create a file `devcontainer.json` wihtin `.devcontainer` folder
- the file will contain follwing code

```bash
{
  // container name
  "name": "ts-docker-container3-module3",
  "image": "node:20",
  "workspaceFolder": "/app",
  "mounts": [
    // Bind mount for your local project
    "source=/F:/9. Docker/docker-with-typescript-backend-module3,target=/app,type=bind",

    // Named volume for logs (similar to: -v ts-docker-logs://app/logs)
    "source=ts-docker-logs,target=/app/logs,type=volume",

    // Anonymous volume for node_modules (similar to: -v //app/node_modules)
    "target=/app/node_modules,type=volume"
  ],
  "runArgs": [
    "--name",
    "ts-docker-container3-module3",
    "-p",
    "5000:5000",
    "--rm" // Automatically remove the container after exiting VS Code
  ],
  "postCreateCommand": "npm install"
}
```

- ctrl+shift+p and write `reopen dev container`
- a new vs code window open and a log can be seen

![alt-text](/module_3/image_6.PNG)

- we are now in linux
- delete node_modules, logs folder from local code base.
- now from linux terminal we can run the project by using following command:

```bash
yarn dev
```

- make any change to local code base, it will show in website.
- if we make any change to container in linux environment, then it will show in website.

## 3-10 Working with .env file & .dockerignore file

- we use `.dockerignore` file

  - to reduce image size

- build a new image

```bash
docker build -t ts-docker-m3:v4 .
```

- if `.env` file remain in root directory

```bash
 docker run -p 5000:5000 --name ts-docker-container3-module3 -v ts-docker-logs:/app/logs -w /app -v "/$(PWD)":/app -v /app/node_modules --rm --env-file ./.env ts-docker-module3:v3
```

- if `.env` file remain in any other directory

```bash
 docker run -p 5000:5000 --name ts-docker-container3-module3 -v ts-docker-logs:/app/logs -w /app -v "/$(PWD)":/app -v /app/node_modules --rm --env-file /config/.env ts-docker-module3:v3
```
