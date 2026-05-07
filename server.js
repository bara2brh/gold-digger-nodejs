import http from 'node:http';
import path from 'node:path';
import fs from 'node:fs/promises'
import { getContentType } from './utils/getContentType.js';
import { serveStatic } from './utils/serveStatic.js';

const PORT = 8000
const __dirname = import.meta.dirname
const baseDir = path.join(__dirname, 'public')
const server = http.createServer(async (req, res) => {

    console.log('server started at port', PORT)
    serveStatic(req,res,baseDir)

})

server.listen(PORT)