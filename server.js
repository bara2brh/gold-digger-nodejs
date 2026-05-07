import http from 'node:http';
import path from 'node:path';
import fs from 'node:fs/promises'
import { getContentType } from './utils/getContentType.js';
import { serveStatic } from './utils/serveStatic.js';
import { handleLivePrices , handleInvest } from './handlers/handleLivePrices.js';

const PORT = 8000
const __dirname = import.meta.dirname
const baseDir = path.join(__dirname, 'public')

const server = http.createServer(async (req, res) => {

    if (req.url.startsWith('/api/getLivePrices')) {
        if (req.method == 'GET') {
            res.setHeader('Access-Control-Allow-Origin', '*')
            await handleLivePrices(req, res)
        } else if(req.method=='POST'){
            handleInvest(req,res,baseDir)
        }
    } else {
        serveStatic(req, res, baseDir)
    }
    console.log('server started at port', PORT)
})

server.listen(PORT)