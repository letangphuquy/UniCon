'use client'

import { useEffect, useState } from 'react'
import { useRouter } from "next/navigation"
import { io } from "socket.io-client"
import { RTC_PORT } from '@/CONST'
const socket = io(`http://localhost:${RTC_PORT}`)

socket.on("foo", (arg) => {
    console.count(arg)
})

const Meeting = () => {
  const router = useRouter();
  const [text, setText] = useState("")
  useEffect(() => {
    socket.emit("foobar", "can we do it?")
    
    return () => {
      // socket.off("foo");
    }
  }, [])

  const [joinId, setJoinId] = useState("");
  const onJoinClicked = (e) => {
    e.preventDefault();
    router.push(`/meet/${joinId}`)
  }

  const [createId, setCreateId] = useState("");
  const onCreateClicked = (e) => {
    e.preventDefault();
    setCreateId(socket.id);
  }

  return (
    <div>
      <h1 className="head_text"> Meeting </h1>
      <p className="desc font-inter"> 
        Join, Create or View your groups' current meetings
      </p>
      <form className="form" onSubmit={onJoinClicked}>
        <label>
          <span className="form_label"> Join with ID: </span>
          <input className="form_input"
            type="text"
            placeholder="Meet ID"
            value={joinId}
            onChange={(e) => {
              e.preventDefault(); 
              setJoinId(e.target.value)
            }}
          />
          <div className="flex-end mt-4">
            <button 
              type="submit" 
              className="orange_btn"
              onClick={onJoinClicked}
            > 
              Join 
            </button>
          </div>
        </label>
      </form>
      
      <form className="form" onSubmit={onCreateClicked}>
        <label>
          <span className="form_label"> Create a new Meet </span>
          <input className="form_input hover:cursor-pointer"
            type="text"
            placeholder="Click Create to get ID"
            value={createId}
            onChange={(e) => setCreateId(e.target.value)}
            onClick={() => navigator.clipboard.writeText(createId)}
            readOnly
          />
        </label>
          <button className="green_btn max-w-[6rem] mx-auto"
            type="submit" 
            onClick={onCreateClicked}
          > Create </button>
          
      </form>

      <p> {text} </p>
    </div>
  )
}

export default Meeting