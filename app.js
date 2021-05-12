const express = require('express')
const config = require('config')
const path = require('path')
const mongoose = require('mongoose')
var cors = require('cors')

const app = express()
const http = require(`http`);
const server = http.createServer(app);
const io = require(`socket.io`)(server);
app.locals.io = io;

app.use(cors());

app.use(express.json({ extended: true }))

app.use('/api/auth', require('./routes/auth.routes'))
app.use('/api/', require('./routes/link.routes'))
app.use('/t', require('./routes/redirect.routes'))

app.use('/', express.static(path.join(__dirname, 'client', 'public')));
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'client', 'public', 'index.html'))
})

if (process.env.NODE_ENV === 'production') {
  app.use('/', express.static(path.join(__dirname, 'client', 'public')))

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  })
}

const PORT = 5000



async function start() {
  try {
    console.log('try')
    await mongoose.connect(config.get('mongoUri'), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    })
    io.on(`connection`, (socket) => {
      console.log('connected ', socket.id)
      const sessionID = socket.id;
      socket.on(`comment`, (data) => {
        socket.broadcast.emit(`comment`, data);
      });
    });
    server.listen(PORT, () => console.log(`App has been started on port ${PORT}...`))
  } catch (e) {
    console.log('Server Error', e.message)
    process.exit(1)
  }
}

start()

