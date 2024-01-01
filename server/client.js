import { io } from "socket.io-client"
const socket = io("http://localhost:3001")

socket.on("foo", (arg) => {
    console.log(arg)
})

socket.emit("foobar", "can we do it?")