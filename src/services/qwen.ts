import OpenAI from "openai";
import WebSocket, { WebSocketServer } from 'ws';

const openai = new OpenAI(
    {
        apiKey: 'sk-1c1c01b87ba84bfabee4861bd04f4bcd',
        baseURL:"https://dashscope.aliyuncs.com/compatible-mode/v1"
    }
)

export default class SiteService {
    /** API调用 */
    async getOpenAIMessage() {
        const wss = new WebSocketServer()
        wss.on('connection',async (ws)=>{
            ws.on('message',async (message:string)=>{
                const stream = await openai.chat.completions.create({
                    messages: [
                        { role: "system", content: "You are a helpful assistant." },
                        { role: "user", content: message }
                    ],
                    model: "qwen-max",
                    stream: true
                })
                for await (const chunk of stream) {
                    ws.send(chunk.choices[0]?.delta?.content || '')
                }
            })
            ws.send('连接建立成功')
        })
    }
}