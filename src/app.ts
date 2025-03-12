// 导入所需模块
import Koa from "koa";
import http from "http";
import koaBody from "koa-body"; // 处理请求体
import koaCors from "koa-cors"; // 处理跨域
import { getIpAddress } from "./utils/util"; // 获取IP地址工具
import { loggerMiddleware } from "./log/log"; // 日志中间件
import { FIXED_KEY } from "./config/constant"; // 配置文件
import { errorHandler, responseHandler } from "./middleware/response"; // 响应处理中间件
import * as fs from 'fs'; // 文件系统模块
import * as path from 'path'; // 路径处理模块

// 创建Koa应用实例
const app = new Koa();

// 跨域处理
app.use(koaCors())
// 日志中间件
app.use(loggerMiddleware);

// 错误处理中间件
app.use(errorHandler);

// 处理请求体，支持multipart/form-data格式
app.use(koaBody({ multipart: true }));

// 自动加载路由
async function loadRouters() {
  const routerDir = path.join(__dirname, 'router');
  try {
    const routerFiles = await fs.promises.readdir(routerDir);
    for (const file of routerFiles) {
      if (file.endsWith('.ts') || file.endsWith('.js')) {
        const router = require(path.join(routerDir, file)).default;
        app.use(router.routes()).use(router.allowedMethods());
      }
    }
  } catch (error) {
    console.error('Error loading routers:', error);
    process.exit(1);
  }
}

// 启动服务器
async function startServer() {
  const port = FIXED_KEY.port || 3000; // 添加默认端口
  const server = http.createServer(app.callback());

  server.listen(port);
  server.on("error", (err: Error) => {
    console.error('Server error:', err);
    process.exit(1);
  });

  server.on("listening", () => {
    const ip = getIpAddress();
    const address = `http://${ip}:${port}`;
    const localAddress = `http://localhost:${port}`;
    console.log(`app started at address \n\n${localAddress}\n\n${address}`);
  });
}

// 主函数
async function main() {
  await loadRouters();
  await startServer();
}

main().catch(err => {
  console.error('Application startup failed:', err);
  process.exit(1);
});
// 统一响应处理中间件
app.use(responseHandler);
