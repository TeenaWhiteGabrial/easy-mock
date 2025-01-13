import { WebSocketServer } from 'ws';
import OpenAI from "openai";

const openai = new OpenAI(
  {
    apiKey: 'sk-caba1a0e93254c6a970547eb8647c807',
    baseURL: "https://dashscope.aliyuncs.com/compatible-mode/v1",
  }
)

const wss = new WebSocketServer({ port: 8080, path:'/getAphorism' })

wss.on('connection', (ws) => {
  console.log('connect successful!')
  ws.on('message', async (message: Array<Buffer>) => {
    const msg = message.toString()

    const completion = await openai.chat.completions.create({
      model: "qwen-plus-latest",  //模型列表：https://help.aliyun.com/zh/model-studio/getting-started/models
      messages: [
        { role: "system", content: "你擅长古诗词句，根据给出的历史人物名字，随机生成这个人物作的一句诗词。诗词不允许重复。不需要解释。我的历史人物名字是：${keyword}" },
        { role: "user", content: msg }
      ],
    });

    ws.send(JSON.stringify(completion.choices[0].message.content))
  })
})
