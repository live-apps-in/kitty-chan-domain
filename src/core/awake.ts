//////Keep Heroku server awake by sending API calls every 1 min

import axios from "axios"

setInterval(() => {
    axios.get('https://kitty-chan-discord.herokuapp.com/ping')
    .then(res=>console.log(res.data))
},10000)