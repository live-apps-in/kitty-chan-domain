import axios from 'axios';

//////Keep Heroku server awake by sending API calls every 2 mins
setInterval(() => {
	axios.get('https://kitty-chan-discord.herokuapp.com/ping')
		.then(res => console.log(res.data))
		.catch(err => { });
},12000);