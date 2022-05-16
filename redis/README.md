## Install Redis on Windows use WSL (Windows Support Linux)
1. List valid Linux distributions
	```
	wsl --list --online
	```
2. Install Ubuntu
	```
	wsl --install -d Ubuntu
	```
3. Config User name in Ubuntu terminal window
	```
	username:
	password: t(number=0)ilatoi(shift&-)0(char=o)7
	```
4. Install Redis on [Redis.io](https://redis.io/docs/getting-started/installation/install-redis-on-windows/)
	```
	sudo apt-add-repository ppa:redislabs/redis
	sudo apt-get update
	sudo apt-get upgrade
	sudo apt-get install redis-server
	```
5. Complete: ![Complete install](https://raw.githubusercontent.com/front-end-2021/research/main/redis/assets/wsl_Ubuntu.jpg)

## Start the Redis server
1. start
	```
	sudo service redis-server start
	```
2. stop: ```sudo service redis-server stop```
3. connect to Redis:
	```redis-cli```

## Init project
1. Install node packages
	```
	npm install
	```

## Run project
1. Start Redis server
	```
	redis-server
	```
2. Run project on development mode
	```
	npm run dev
	```
3. Call api: 
	* localhost:8001/photos/
	* localhost:8001/photos/{id}

## Presentation
![Present](https://raw.githubusercontent.com/front-end-2021/research/main/redis/assets/RunRedisServer.jpg)