# 使用官方Node.js镜像，并指定版本20.8.1
FROM node:20.8.1 AS builder

# 设置工作目录
WORKDIR /usr/src/app

# 复制package.json和package-lock.json文件
COPY package*.json ./

# 安装pnpm 
RUN npm install pnpm -g

# 安装项目依赖
RUN pnpm install

# 复制项目文件到容器中
COPY . .

# 编译 TypeScript 项目
RUN pnpm run build

# 第二个阶段，用于生成最终镜像
FROM node:20.8.1

# 设置工作目录
WORKDIR /usr/src/app

# 从第一个阶段复制构建产物
COPY --from=builder /usr/src/app /usr/src/app

# 暴露应用端口
EXPOSE 3000

# 写日志
RUN ls -l /usr/src/app

# 使用PM2启动应用
CMD ["pnpm", "run", "test"]
