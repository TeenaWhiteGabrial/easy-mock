# 使用官方Node.js镜像，并指定版本20.8.1
FROM node:20.8.1

# 设置工作目录
WORKDIR /usr/src/app

# 复制package.json和package-lock.json文件
COPY package*.json ./

# 安装项目依赖
RUN npm install

RUN npm build
# 复制项目文件到容器中
COPY . .

# 暴露应用端口
EXPOSE 3000

# 使用PM2启动应用
CMD ["pm2-runtime", "start", "dist/app.js", "--only", "test"]
