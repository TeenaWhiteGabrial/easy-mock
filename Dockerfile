# 制作镜像，一切操作都是在容器内
# 使用官方Node.js镜像，并指定版本20.8.1。
FROM node:20.8.1

# 创建一个/usr/src/app文件夹，-p标识如果目录不存在，则递归创建
RUN mkdir -p /usr/src/app

# 将工作目录设置为 /usr/src/app，即后续的命令都在这个目录下执行。这样做可以简化后续指令中的路径，避免重复写路径
WORKDIR /usr/src/app

# 将主机上的 package.json、package-lock.json 和 pnpm-lock.yaml 文件复制到容器内的 /usr/src/app/ 目录下。这些文件包含了应用程序的依赖信息。
# 不会受到WORKDIR设置影响，即：/usr/src/app/usr/src/app/ 
COPY package*.json pnpm-lock.yaml /usr/src/app/ 

# 安装依赖
RUN npm install

COPY src /usr/src/app/

RUN npm run build

EXPOSE 8080

CMD ["pm2-runtime", "start", "dist/app.js"]