#!/bin/bash

# 定义变量
GIT_REPO="https://github.com/TeenaWhiteGabrial/easy-mock.git"
APP_DIR="/usr/src/app"
APP_BRANCH="v1.0"
DOCKER_COMPOSE_FILE="docker-compose.yml"
APP_PORT=3000  # 你的应用服务端口
MONGO_PORT=27017  # MongoDB服务端口
APP_CONTAINER_NAME="topaz-app"  # 应用容器名称
MONGO_CONTAINER_NAME="mongodb"  # MongoDB容器名称

# 配置 Git 缓存和超时设置
git config --global http.postBuffer 524288000
git config --global http.lowSpeedLimit 0
git config --global http.lowSpeedTime 999999

# 检查并删除已存在的目录
if [ -d "$APP_DIR" ]; then
  echo "Directory $APP_DIR already exists. Removing it."
  rm -rf "$APP_DIR"
fi

# 尝试克隆 Git 仓库
echo "Cloning Git repository..."
git clone --branch "$APP_BRANCH" "$GIT_REPO" "$APP_DIR"
if [ $? -ne 0 ]; then
  echo "Failed to clone Git repository. Please check your network connection."
  exit 1
fi

# 进入应用目录
cd "$APP_DIR" || exit

# 检查是否成功进入应用目录
if [ $? -ne 0 ]; then
  echo "Failed to enter the application directory. Please check the directory path."
  exit 1
fi

# 停止并移除现有的 Docker 容器
echo "Stopping and removing existing Docker containers..."
docker-compose -f "$DOCKER_COMPOSE_FILE" down

# 检查并停止占用APP_PORT的进程
echo "Checking for processes using port $APP_PORT..."
sudo lsof -i :$APP_PORT | grep LISTEN
if [ $? -eq 0 ]; then
  echo "Port $APP_PORT is in use. Stopping the process using it."
  sudo lsof -ti :$APP_PORT | xargs sudo kill -9
fi

# 检查并停止占用MONGO_PORT的进程
echo "Checking for processes using port $MONGO_PORT..."
sudo lsof -i :$MONGO_PORT | grep LISTEN
if [ $? -eq 0 ]; then
  echo "Port $MONGO_PORT is in use. Stopping the process using it."
  sudo lsof -ti :$MONGO_PORT | xargs sudo kill -9
fi

# 检查并删除现有的应用容器
if [ "$(docker ps -aq -f name=$APP_CONTAINER_NAME)" ]; then
  echo "Removing existing application container..."
  docker stop $APP_CONTAINER_NAME
  docker rm $APP_CONTAINER_NAME
fi

# 检查并删除现有的 MongoDB 容器
if [ "$(docker ps -aq -f name=$MONGO_CONTAINER_NAME)" ]; then
  echo "Removing existing MongoDB container..."
  docker stop $MONGO_CONTAINER_NAME
  docker rm $MONGO_CONTAINER_NAME
fi

# 构建和启动容器
echo "Building and starting Docker containers..."
docker-compose -f "$DOCKER_COMPOSE_FILE" up --build -d

# 检查是否成功启动容器
if [ $? -ne 0 ]; then
  echo "Failed to start Docker containers. Please check your Docker Compose configuration."
  exit 1
fi

# 检查应用容器状态
docker ps -a | grep $APP_CONTAINER_NAME
if [ $? -ne 0 ]; then
  echo "Application container failed to start. Checking logs..."
  docker logs $APP_CONTAINER_NAME
  exit 1
fi

# 打印成功提示信息
echo "Application started successfully!"
