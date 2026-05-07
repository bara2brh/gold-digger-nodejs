import { sendResponse } from './sendResponse.js'
import { getContentType } from './getContentType.js';
import path from 'node:path';
import fs from 'node:fs/promises'

export async function serveStatic(req, res, baseDir) {
    const filePath = path.join(baseDir, req.url == '/' ? 'index.html' : req.url.slice(1))
    const ext = path.extname(filePath)
    const contentType = getContentType(ext)
    const payload = await fs.readFile(filePath, 'utf-8')
    sendResponse(res, 201, contentType, payload)

}