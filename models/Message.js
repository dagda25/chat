const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
  message: {type: String, required: true},
  date: {type: Date, default: Date.now},
  author: { type: Types.ObjectId, ref: 'User' },
  receiver: {type: Types.ObjectId, ref: 'User'}
})

module.exports = model('Message', schema)