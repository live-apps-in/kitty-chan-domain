import axios from 'axios';

//////Keep Heroku server awake by sending API calls every 1 min
setInterval(() => {
	axios.get('https://kitty-chan-discord.herokuapp.com/ping')
		.then(res=>console.log(res.data));
},12000);