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
