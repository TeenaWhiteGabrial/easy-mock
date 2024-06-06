# 使用官方Node.js镜像，并指定版本20.8.1
FROM node:20.8.1

# 在容器内创建目录
RUN mkdir -p /usr/src/app

# 设置工作目录
WORKDIR /usr/src/app

# 复制package.json和pnpm-lock.yaml文件
COPY package*.json pnpm-lock.yaml /usr/src/app/

# 安装pnpm
RUN npm install -g pnpm

# 安装项目依赖
RUN pnpm install

# 复制项目文件到容器中
COPY . /usr/src/app/

# 编译 TypeScript 项目
RUN pnpm run build



# 暴露应用端口
EXPOSE 3000

# 使用PM2启动应用
CMD ["pm2-runtime", "start", "dist/app.js"]