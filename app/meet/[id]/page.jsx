'use client'
import React, { useCallback, useContext, useEffect, useReducer, useState } from 'react'
import { ICE_SERVERS, RTC_PORT } from '@/CONST';
import { Peer } from 'peerjs'
import { io } from 'socket.io-client';

let testVar = 0;
const allVideos = [] // by Id
const firstLoad = () => {
  testVar += 1
  console.count("File is loaded?")
}
firstLoad()

const InMeet = ({ params }) => {
  const [count, setCount] = useState(0);
  const [grid, setGrid] = useState([]);

  let myStream = null;
  let videoGrid = null;
  function addStream(stream, isMuted) {
    setGrid(cur => { return [...cur, stream] })
    console.log("Grid of streams after update: ", grid)
    
    const video = document.createElement("video")
    video.srcObject = stream
    video.muted = isMuted;
    video.addEventListener("loadedmetadata", (evt) => {
      console.log("after ", evt, "Gotcha stream ", stream, " and video ", video)
      video.play()
    })

    allVideos[stream.id] = video
    videoGrid.appendChild(video)
  }
  useEffect(() => {
    videoGrid = document.querySelector("#video-grid")
  }, [grid])

  useEffect(() => {
    console.count("Meeting Page mounted")
    const socket = io(`http://localhost:${RTC_PORT}`)
    const myPeer = new Peer({ iceServers: ICE_SERVERS }, {
      host: '/',
      port: 3002
    });
    console.log(myPeer)
    navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true
    }).then(stream => {
      myStream = stream;
      addStream(stream, true);
      console.log("Query-ed media device and added stream")

      myPeer.on('call', call => {
        call.answer(stream);
        console.log(myId, ' is called and sent ', stream);
        initVideoForCall(call);
      });

      socket.on('user-connected', (userId) => {
        connectToUser(userId, stream);
      })
    });

    return () => {
      console.log("Component unmounted");
      setGrid([])
      for (video in allVideos) video.remove()
    }
  }, [])

  return (grid &&
    <div className='flex-col flex-start'>
      <h1> Meeting in Room {params.id} </h1>
      <button className='outline_btn'
        type='button'
        onClick={() => { setCount((c) => ++c) }}>
        {count}
      </button>
      <div
        className='grid grid-rows-2 grid-cols-3 w-full h-full'
        id='video-grid'
      >
        {/* {grid.map((stream, idx) => {
          video.setAttribute("key", idx)
          if (stream === myStream) video.muted = true;
          const video = document.createElement("video")
          video.srcObject = stream
          video.addEventListener("loadedmetadata", (evt) => {
            video.play()
            console.log("after ", evt, "Gotcha stream ", stream, " and video ", video)
          })
          return <video>{video.innerHTML}</video>;
        })} */}
      </div>

    </div>
  )
}

export default InMeet