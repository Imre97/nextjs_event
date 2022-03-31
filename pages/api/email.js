import fs from 'fs'
import path from 'path'

export function buildEmailPath(){
     return path.join(process.cwd(), 'data', 'emailData.json')
}

export function extractEmail(filePath) {
    const fileData = fs.readFileSync(filePath)
    const data = JSON.parse(fileData)
    return data
}



function handler(req, res) {
    if(req.method === 'POST') {
        const emailAddress = JSON.parse(req.body)
        


        const filePath = buildEmailPath()
        const data = extractEmail(filePath)
        data.push(emailAddress)
        fs.writeFileSync(filePath, JSON.stringify(data))
        res.status(201).json({message: data})
    }
}

export default handler