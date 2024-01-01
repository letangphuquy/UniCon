'use client'

import { io } from "socket.io-client"
import { useEffect, useState } from 'react'
const socket = io("http://localhost:3001")

const Meeting = () => {
  const [text, setText] = useState("")
  useEffect(() => {
    socket.on("foo", (arg) => {
        console.log(arg)
        setText(arg)
    })
    
    socket.emit("foobar", "can we do it?")
  
    return () => {
      // socket.off("foo");
    }
  }, [])  
  return (
    <div>
      <h1>Meeting: Join, Create or view one's groups' current meetings</h1>
      <p> {text} </p>
    </div>
  )
}

export default Meeting