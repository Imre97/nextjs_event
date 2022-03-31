import fs from 'fs'
import path from 'path'

export function buildCommentPath(){
     return path.join(process.cwd(), 'data', 'comments.json')
}

export function extractComment(filePath) {
    const fileData = fs.readFileSync(filePath)
    const data = JSON.parse(fileData)
    return data
}




function handler(req, res){
    const eventId = req.query.eventId

    if(req.method === 'POST') {
        const { email, name, text } = req.body

        const filePath = buildCommentPath()
        const data = extractComment(filePath)

        const newComment = {
            id: new Date().toISOString(),
            email: email,
            name: name,
            text: text,
            event: eventId
        }

        data.push(newComment)
        fs.writeFileSync(filePath, JSON.stringify(data))

        res.status(201).json({message: 'Success!'})
    }

    if(req.method === 'GET'){
        const filePath = buildCommentPath()
        const data = extractComment(filePath)

        const filteredEvents = data.filter(item => item.event == eventId)
        
        res.status(200).json({message: 'nagyszerű vagy', comments: filteredEvents})
    }

}

export default handler