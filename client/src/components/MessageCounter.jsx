import axios from 'axios';
import React, { useEffect, useState } from 'react'
import '../css/MessageCounter.css'
import { comma_separate_number } from '../helper/helper';

export const MessageCounter = () => {
    const [count, setCount] = useState(1939494394);
    const countText = count
    // const kitty_url = 'http://localhost:5000'
    const kitty_url = 'https://kittychan.jagalive.in'

    const fetchCount = async () => {
        const countData = await axios.get(kitty_url + '/analytics/message_count')
        if (countData.data)  return countData.data.messageCount 
        return 0
        
    }

    useEffect(() => {
        document.title = `kitty chan`;
        
        /// seconds Interval
        const interval = setInterval(async () => {
        const countApi = await fetchCount()
      setCount(countApi || 0);
    }, 3000);

    return () => clearInterval(interval);
  }, [count]); 
    
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
