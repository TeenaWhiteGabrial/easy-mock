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

# 确认构建产物是否存在
RUN ls -l dist

# 第二个阶段，用于生成最终镜像
FROM node:20.8.1

# 设置工作目录
WORKDIR /usr/src/app

# 从第一个阶段复制构建产物
COPY --from=builder /usr/src/app/dist ./dist
COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app/package*.json ./

# 安装pm2
RUN npm install -g pm2

# 暴露应用端口
EXPOSE 3000

# 验证构建产物是否成功复制
RUN ls -l dist

# 进入容器后的提示信息
RUN echo "You are now inside the container. Use 'ls -l /usr/src/app' to see the directory structure."

RUN pnpm install

RUN pnpm run build

# 使用PM2启动应用
CMD ["pm2-runtime", "start", "dist/app.js"]
