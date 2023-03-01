import axios from "axios";

///KITTY CHAN URL
// const kitty_url = 'http://localhost:5000'
const kitty_url = 'https://kittychan.jaga.live'

export const fetchMessageCount = async() => {
    const countData = await axios.get(kitty_url + '/analytics/message_count')
    if (countData.data)  return countData.data.messageCount 
    return 0
};
