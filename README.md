# Pomelo Blog - A Realtime Collaborative Blog

A blogging system that allows any user to create blogs, share with other users in the system and write collaboratively in realtime.

### The system is built using Django, Django Rest Famework and ReactJs.
It is a work in progress. Lot of features are yet to be implemented.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

```
You need to have Docker and Docker Compose installed in your system.
```

### Installing

Clone the repository and perform ---
```
sudo docker-compose build
sudo docker-compose up db
sudo docker-compose web manage.py migrate
sudo docker-compose up
```
