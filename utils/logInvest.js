import path from 'node:path';
import fs from 'node:fs/promises'

export async function logInvest(body, __dirname) {

    const filePath = path.join(__dirname, 'logs', 'purchaseHistory.txt')

    let fileContent = await fs.readFile(filePath, 'utf-8')
    
    const date = new Date;
    fileContent += `${date.toISOString()} amount paid : ${await body.amount}, Price per Oz: ${await body.currentPrice} , gold sold: ${(await body.amount / await body.currentPrice).toFixed(4)} Oz \n`
    await fs.writeFile(filePath, fileContent)
}