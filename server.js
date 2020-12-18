const express = require('express')
const app = express()
const server = require('http').createServer(app)
const io = require('socket.io')(server)
const fs = require('fs')

const path = require('path')

// Static Path for most of the files
app.use(express.static('public'))
// Static Path for spa components
app.use('/static', express.static(path.join(__dirname, 'public', 'components')))


app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'))
})


// Handles SPA
io.on('connection', (socket) => {

  // Listents to the request from component on client side
  socket.on('req component', (componentPath) => {
    const basePath = path.join(__dirname, 'public', 'components')

    //Reads Component File
    fs.readFile(path.join(basePath, componentPath), (err, file) => {
      let component
      if(err) {
        console.log(err)
        component = '<h1>NOT FOUND</h1>'
      } else {
        component = file.toString()
      }

      // Sends component file to the client
      socket.emit('res component', component)
    })
  })
})

const port = process.env.PORT || 3000
server.listen(port, () => {
  console.log(`Server Running on port ${port}`)
})