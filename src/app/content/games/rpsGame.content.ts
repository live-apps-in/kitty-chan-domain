import { randomNumber } from '../../../utils/calc';

export const RPS_GAME_Content = {
	start: 'You have challenged me for a Rock Paper Scissor game! This is a Best Of 5 game. \nYou start sending **rock**, **paper**, **scissors** to play. Type **stop** to end the game. All the Best!',

	shoot: (payload: any) => {
		const { username, winner, isDraw, rounds = 0, currentUserWinCount, currentKittyWinCount, match_over, match_winner} = payload;
        
		///Round Draw
		if (isDraw) return 'It\'s a Draw';

		///User Match winner
		if (match_over && match_winner==='user') return build_user_winner_phrase(username);

		///kitty Match winner
		if (match_over && match_winner==='kitty') return build_kitty_winner_phrase();
        
		///User Round Winner
		if (winner === 'user') return `${username} WON this round! \n**Rounds ${rounds}/5**  ---  ${username} - ${currentUserWinCount} | kitty chan - ${currentKittyWinCount}`;
		///kitty Game Winner
		if (winner === 'kitty') return `kitty chan WON this round! \n**Rounds ${rounds}/5**  ---  ${username} - ${currentUserWinCount} | kitty chan - ${currentKittyWinCount}`;

	}
};

const user_winner_phrase = [
	'alright, I knew you would win',
	'It\'s just a fluke, i will get you next time',
	'ok ok, you win'
];

const kitty_winner_phrase = [
	'easy for me, better luck next time kiddo',
	'sit down, don\'t challenge me again',
	'I\'ve expected more from you!'
];


const build_user_winner_phrase = (username: string) => {
	const randomPhrase = user_winner_phrase[randomNumber(0, 1)];

	return `**${username}** WON this Game! \n\n *${randomPhrase}*\n\n You can send **restart** & **stop** if you wish to play or end the game`;
};


const build_kitty_winner_phrase = () => {
	const randomPhrase = kitty_winner_phrase[randomNumber(0, 1)];

	return `**kitty chan** WON this Game! \n\n *${randomPhrase}*\n\n You can send **restart** & **stop** if you wish to play or end the game`;
};