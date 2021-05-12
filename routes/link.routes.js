const {Router} = require('express')
const config = require('config')
const shortid = require('shortid')
const Link = require('../models/Link')
const User = require('../models/User')
const Message = require('../models/Message')
const auth = require('../middleware/auth.middleware')
const router = Router()

router.post('/send', async (req, res) => {
  try {
    const { message, userId, receiverId } = req.body;
    console.log(message, userId, receiverId)
    
    const author = await User.findById(userId);
    const receiver = await User.findById(receiverId);

    const chat = new Message({
      message,
      author,
      receiver
    })


    await chat.save();
    const {io} = req.app.locals;

    io.emit(`comment`, {message, author: author._id, receiver: receiver._id, date: Date.now()});

    res.status(201).json({message, author: author._id, receiver: receiver._id, date: Date.now()})
  } catch (e) {
    console.log(e.message)
    res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
  }
})

router.post('/chat', async (req, res) => {
  try {
    const { userId, receiverId, limit } = req.body;
    console.log("api/chat body:", req.body)

    const author = await User.findById(userId);
    const receiver = await User.findById(receiverId);

    const messages = await Message.find({ $or: [{ author, receiver }, { author: receiver, receiver: author }] }).sort({date: -1}).limit(limit || 20);

    res.status(201).json({ messages: messages.reverse() })
  } catch (e) {
    console.log(e.message)
    res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
  }
})

router.get('/users', async (req, res) => {
  try {
    const users = await User.find()
    res.json({ users })
  } catch (e) {
    res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
  }
})

router.get('/', auth, async (req, res) => {
  try {
    const links = await Link.find({ owner: req.user.userId })
    res.json(links)
  } catch (e) {
    res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
  }
})

router.get('/:id', auth, async (req, res) => {
  try {
    const link = await Link.findById(req.params.id)
    res.json(link)
  } catch (e) {
    res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
  }
})

module.exports = router
