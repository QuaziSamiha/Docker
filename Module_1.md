**14 May, 25**

### 1-1 Get Started With Docker

### 1-2 What is Docker & Why?

- what is docker & why ?

  - docker is a container technology. A tool for creating and managing containers.

- what is container ?
  - a standardize unit of software. A package of code and dependencies to run that code (e.g NodeJS Code + the NodeJS runtime)
  - the same container always yields the exact same application and execution behavior! No matter where or by whom it might be executed.

### 1-3 Virtual Machine vs. Docker Containers

- what is virtual machine: it is like a physical computer but it has no physical existence, work like a totally isolated machine ( suppose you have two desktop pc, between them one has windows os and another has linux. they totally run in a isolate way. These two pc has no communication. In the same way when we installed a virtual machine (which has its own virtual os) on our host operating system, this virtual machine work isolately by using its own os.)

- we can do the same task of docker by using virtual machine.

- suppose we build a project in out virtual machine, and then we share this virtual machine with our team mates, then they can run the project within the virtual machine and get the same output as mine.

- so why don't we use virtual machine as docker?

  - because we keep only one project into one virtual machine to make it isolate. so multiple projects need multiple virtual machines. so we need to keep multiple virtual machine in our host os. after a certain time we will face storage shortage.
  - wastes a lot of space on your hard drive and tends to be slow.

- `Virtual Machine / Virtual OS Pros and Cons`:
  | Pros | Cons |
  |--------------------------------------|----------------------------------------------------------------------|
  | Separated environments | Redundant duplication, waste of space |
  | Environment-specific configuration | Performance can be slow, boot times can be long |
  | Environment configuration can be shared and reproduced reliably | Reproducing on another computer/server is possible but may still be tricky |

- docker helps you build & manage 'containers'

- docker also (like Virtual machine) works on os, it has a docker engine, but docker doesn't installed any virtual os (like vm), so the space for os is totally minimized.

- virtual machine : container with libraries, dependencies, tools, and os.
- docker : container with libraries, dependencies, tools, but without os.

- image or blueprint - we share it.
- if we don't use any container in docker we can delete it, and by using the image or blueprint we can recreate the container again.
- but deleting an vm container and recreate it is not easy.

### 1-4 Docker Setup

- for windows & macOS:
  - requirements met : install docker desktop
  - requirements not met : install docker toolbox
- for linux:
  - by default support docker and docker run in linux environment
  - install docker engine

### 1-5 Docker Installation [Windows]

- [install](https://docs.docker.com/desktop/setup/install/windows-install/)
- WSL - windows subsystem for linux - a way to use docker or linux natively within windows (as windows not support docker)
- WSL - one kind of virtual machine
