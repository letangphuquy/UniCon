const express = require('express')
const app = express()
const server = require('http').Server(app);
const io = require('socket.io')(server)
const {v4 : uuidV4} = require('uuid')

app.set('view engine', 'ejs')
app.use(express.static('public'))

let roomCounter = 0;
app.get('/', (req, res) => {
    // res.redirect(`/${++roomCounter}`)
    res.redirect(`/${uuidV4()}`)
})

app.get('/:room', (req, res) => {
    res.render('room', { roomId: req.params.room })
})

io.on('connection', socket => {
    socket.on('join-room', (roomId, userId) => {
        console.log(roomId, userId)
        socket.join(roomId)
        // io.to(roomId).emit('user-connected', userId)
        socket.to(roomId).emit('user-connected', userId)
        socket.on('disconnect', () => {
            socket.to(roomId).emit("user-disconnected", userId)
            // io.to(roomId).emit("user-disconnected", userId)
        })
    })
})

server.listen(3000)

