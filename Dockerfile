# 使用官方Node.js镜像，并指定版本20.8.1
FROM node:20.8.1 AS builder

# 设置工作目录
WORKDIR /usr/src/app

# 复制package.json和pnpm-lock.yaml文件
COPY package*.json pnpm-lock.yaml ./

# 安装pnpm 
RUN npm install -g pnpm

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

# 安装pm2
RUN npm install -g pm2

# 暴露应用端口
EXPOSE 3000

# 使用PM2启动应用
CMD ["pm2-runtime", "start", "dist/src/index.js"]
