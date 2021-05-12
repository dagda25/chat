const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
  users: [{ type: Types.ObjectId, ref: 'Message' }]
})

module.exports = model('Message', schema)