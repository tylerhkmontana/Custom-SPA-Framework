const express = require('express')
const app = express()
const server = require('http').createServer(app)
const io = require('socket.io')(server)
const fs = require('fs')

const path = require('path')

app.use(express.static('public'))
app.use('/static', express.static(path.join(__dirname, 'public', 'components')))
app.use('/lib/jquery', express.static(path.join(__dirname, 'node_modules/jquery/dist')))

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'))
})

io.on('connection', (socket) => {
  socket.on('req component', (componentPath) => {
    const basePath = path.join(__dirname, 'public', 'components')

    console.log(path.join(basePath, componentPath))
    fs.readFile(path.join(basePath, componentPath), (err, file) => {
      let component
      if(err) {
        console.log(err)
        component = '<h1>NOT FOUND</h1>'
      } else {
        component = file.toString()
      }

      socket.emit('res component', component)
    })
  })
})

const port = process.env.PORT || 3000
server.listen(port, () => {
  console.log(`Server Running on port ${port}`)
})