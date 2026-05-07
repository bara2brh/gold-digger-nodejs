import http from 'node:http';
import path from 'node:path';
import fs from 'node:fs/promises'
import { getContentType } from './utils/getContentType.js';

const PORT = 8000
const __dirname = import.meta.dirname

const server = http.createServer(async(req,res)=>{
    
    const filePath = path.join(__dirname,'public', req.url =='/' ? 'index.html' : req.url.slice(1))
    res.statusCode = 201
    const ext = path.extname(filePath)
    const contentType = getContentType(ext)
    res.setHeader('Content-Type',contentType)
    console.log('server started at port',PORT)
    res.end(await fs.readFile(filePath,'utf-8'))
})
 
server.listen(PORT)