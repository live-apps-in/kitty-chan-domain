import React, { useEffect, useState } from 'react'
import '../css/MessageCounter.css'
import { comma_separate_number } from '../helper/helper';
import { fetchMessageCount } from '../service/analytics';
import io from "socket.io-client";

// const socket = io("http://localhost:5000");
const socket = io("https://kittychan.jaga.live");

socket.on("connect", () => {
  console.log("Connected to the server");
});

export const MessageCounter = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {        
    const fetchCount = async() => {
      const initialCount = await fetchMessageCount() || 0
      setCount(initialCount)
    }
    fetchCount()
  }, [])
  

    //Listen to Live Count Events
    socket.on('messageCount', data => {
      setCount(count + 1)
    })
   
  return (
<div class="container">
  <div class="counter">
    <h1>kitty chan</h1>
              <div class="odometer" className="odometer" id="odometer">{comma_separate_number(count)}</div>
    <h3 class="title">Live Message Count!</h3>
  </div>
</div>
  )
}
