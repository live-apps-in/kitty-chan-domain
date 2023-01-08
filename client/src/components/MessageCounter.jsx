import React, { useEffect, useState } from 'react'
import '../css/MessageCounter.css'
import { comma_separate_number } from '../helper/helper';
import { fetchMessageCount } from '../service/analytics';


export const MessageCounter = () => {
    const [count, setCount] = useState(0);

    //Fetch Initial Message Count
    useEffect(() => {        
        const fetchCount = async() => {
            const initialCount = await fetchMessageCount() || 0
            setCount(initialCount)
        }
        fetchCount()
    }, [])
    
    ///Fetch count in an interval of time
    useEffect(() => {
        const interval = setInterval(async () => {
        const countApi = await fetchMessageCount()
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
