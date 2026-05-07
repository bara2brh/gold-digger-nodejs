import { sendResponse } from './sendResponse.js'
import { getContentType } from './getContentType.js';
import path from 'node:path';
import fs from 'node:fs/promises'

export async function serveStatic(req, res, baseDir) {
    try {
        const filePath = path.join(baseDir, req.url == '/' ? 'index.html' : req.url)
        const ext = path.extname(filePath)
        const contentType = getContentType(ext)
        const payload = await fs.readFile(filePath)
        sendResponse(res, 201, contentType, payload)
    } catch (err) {
        const filePath = path.join(baseDir, '404.html')
        const ext = path.extname(filePath)
        const contentType = getContentType(ext)
        const payload = await fs.readFile(filePath)
        sendResponse(res, 404, contentType, payload)
    }


} 