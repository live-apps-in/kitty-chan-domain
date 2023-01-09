import React, { useEffect, useState } from 'react'
import '../css/MessageCounter.css'
import { comma_separate_number } from '../helper/helper';
import { fetchMessageCount } from '../service/analytics';
import io from "socket.io-client";

// const socket = io("http://localhost:5000");
const socket = io("https://kittychan.jagalive.in");
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
  
  //Fetch Initial Message Count
  socket.on('messageCount', data => {
    setCount(count + 1)
  })
    ///Fetch count in an interval of time
    // useEffect(() => {
    //     const interval = setInterval(async () => {
    //     const countApi = await fetchMessageCount()
    //   setCount(countApi || 0);
    // }, 3000);

  //   return () => clearInterval(interval);
  // }, [count]); 
    
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
