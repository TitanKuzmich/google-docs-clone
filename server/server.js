const mongoose = require('mongoose')
const Document = require('./Document')

mongoose.connect('mongodb://localhost/google-docs-clone')

const io = require('socket.io')(3001, {
    cors: {
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST']
    }
})

const defaultValue = ""

io.on('connection', socket => {
    socket.on('get-document', documentId => {
        const document = findOrCreateDocument(documentId)
        socket.join(documentId)
        socket.emit('load-document', document.data)

        socket.on('send-changes', delta => {
            console.log(delta)
            socket.broadcast.to(documentId).emit('received-changes', delta)
        })

        socket.on('save-document', async data=> {
            await Document.findByIdAndUpdate(documentId, {data})
        })
    })
})

async function findOrCreateDocument(id) {
    if (id == null) return

    const document = await Document.findById(id)
    if(document) return document
    return await Document.create({ _id: id, data: defaultValue })
}