import { investEvent } from '../events/investEvents.js'
import { getLivePrices } from '../utils/getLivePrices.js'
import { parseJSONBody } from '../utils/parseJSONBody.js'
export async function handleLivePrices(req, res) {
    res.statusCode = 200
    res.setHeader('Content-Type', 'text/event-stream')
    res.setHeader('Cache-Control', 'no-cache')
    res.setHeader('Connection', 'keep-alive')
    setInterval(() => {
        const livePrice = getLivePrices()
        res.write(`data: ${JSON.stringify({ event: 'live-price', price: livePrice })}\n\n`)
    }, 2000)

}


export async function handleInvest(req, res,__dirname) {

    res.statusCode=200
    res.setHeader('Content-Type','application/json')
    const parsedBody = await parseJSONBody(req)
    investEvent.emit('invest',parsedBody,__dirname)

}