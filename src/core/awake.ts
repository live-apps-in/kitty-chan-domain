//////Keep Heroku server awake by sending API calls every 1 min

import axios from 'axios';

setInterval(() => {
	axios.get('http://localhost:5000/ping');
	// .then(res => console.log(res.data))
},10000);