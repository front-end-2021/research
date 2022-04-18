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
	password:
	```
4. Install Redis on [Redis.io](https://redis.io/docs/getting-started/installation/install-redis-on-windows/)
5. Complete: ![Complete install](https://raw.githubusercontent.com/front-end-2021/research/main/redis/assets/wsl_Ubuntu.jpg)

## Run project
1. Install node packages
	```
	npm install
	```
2. Start Redis server
	```
	redis-server
	```
3. Run project on development mode
	```
	npm run dev
	```

## Presentation
![Present](https://raw.githubusercontent.com/front-end-2021/research/main/redis/assets/RunRedisServer.jpg)