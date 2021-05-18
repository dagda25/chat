const { Router } = require('express');
const config = require('config');
const User = require('../models/User');
const Message = require('../models/Message');
const auth = require('../middleware/auth.middleware');
const router = Router();

router.post('/send', auth, async (req, res) => {
  try {
    const { message, userId, receiverId } = req.body;
    
    const author = await User.findById(userId);
    const receiver = await User.findById(receiverId);

    const chat = new Message({
      message,
      author,
      receiver
    });


    await chat.save();
    const { io } = req.app.locals;

    io.emit(`comment`, { message, author: author._id, receiver: receiver._id, date: chat.date });

    res.status(201).json({ message, author: author._id, receiver: receiver._id, date: chat.date });
  } catch (e) {
    console.log(e.message);
    res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' });
  }
});

router.post('/chat', auth, async (req, res) => {
  try {
    const { userId, receiverId, limit } = req.body;

    const author = await User.findById(userId);
    const receiver = await User.findById(receiverId);

    const messages = await Message.find({ $or: [{ author, receiver }, { author: receiver, receiver: author }] }).sort({ date: -1 }).limit(limit || 20);

    res.status(201).json({ messages: messages.reverse() });
  } catch (e) {
    console.log(e.message);
    res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' });
  }
});

router.post('/socket', async (req, res) => {
  try {
    const { socketId, userId } = req.body;

    const user = await User.findById(userId);

    if (user) {
      await User.updateOne({ _id: userId }, { socketId: socketId });
    }

    res.status(201).json({ socketId })
  } catch (e) {
    console.log(e.message);
    res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' });
  }
});

router.post('/users', auth, async (req, res) => {
  try {
    const { userId } = req.body;
    const user = await User.findById(userId);
    const users = await User.find().select('_id email');
    const usersWithMessages = await Promise.all(users.map(async (user) => {
      const userWithMessage = JSON.parse(JSON.stringify(user));
      userWithMessage.messages = await Message.find({ $or: [{ author: user._id, receiver: userId }, { author: userId, receiver: user._id }] }).sort({ date: -1 }).limit(20);
      return await userWithMessage;
    })) 

    res.json({users: usersWithMessages});
  } catch (e) {
    res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' });
  }
});


module.exports = router;
