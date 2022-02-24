const {Schema, model} = require('mongoose')

const Document = new Schema({
    _id: String,
    data: Object
})

export default model('Document', Document)