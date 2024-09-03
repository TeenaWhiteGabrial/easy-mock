import { WebSocketServer } from 'ws';
import OpenAI from "openai";

const openai = new OpenAI(
  {
    apiKey: 'sk-1c1c01b87ba84bfabee4861bd04f4bcd',
    baseURL: "https://dashscope.aliyuncs.com/compatible-mode/v1"
  }
)

const wss = new WebSocketServer({port:8080})

wss.on('connection',(ws)=>{
    console.log('connect successful!')
    ws.on('message', async (message: Array<Buffer>) => {
      const msg = message.toString()
      const stream = await openai.chat.completions.create({
        messages: [
          { role: "system", content: "You are a helpful assistant." },
          { role: "user", content: msg }
        ],
        model: "qwen-max",
        stream: true
      })
      for await (const chunk of stream) {
        ws.send(chunk.choices[0]?.delta?.content || '')
      }
    })
    ws.send('Nice to meet you!')
})
