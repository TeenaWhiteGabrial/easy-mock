#!/bin/bash

# 定义变量
GIT_REPO="https://github.com/TeenaWhiteGabrial/easy-mock.git"
APP_DIR="/path/to/your/app"
APP_BRANCH="v1.0"
DOCKER_COMPOSE_FILE="docker-compose.yml"

# 检查并删除已存在的目录
if [ -d "$APP_DIR" ]; then
  echo "Directory $APP_DIR already exists. Removing it."
  rm -rf "$APP_DIR"
fi

# 拉取代码
echo "Cloning Git repository..."
git clone --branch "$APP_BRANCH" "$GIT_REPO" "$APP_DIR"

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

# 构建和启动容器
echo "Building and starting Docker containers..."
docker-compose -f "$DOCKER_COMPOSE_FILE" up --build -d

# 检查是否成功启动容器
if [ $? -ne 0 ]; then
  echo "Failed to start Docker containers. Please check your Docker Compose configuration."
  exit 1
fi

# 打印成功提示信息
echo "Application started successfully!"
