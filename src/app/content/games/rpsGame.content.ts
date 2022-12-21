export const RPS_GAME_Content = {
	start: 'You have challenged me for a Rock Paper Scissor game! This is a Best Of 5 game. All the best',

	shoot: (payload: any) => {
		const { username, winner, isDraw, rounds = 0, currentUserWinCount, currentKittyWinCount, match_over, match_winner} = payload;
        
		///Round Draw
		if (isDraw) return 'It\'s a Draw';

		///User Match winner
		if (match_over && match_winner==='user') return `${username} WON the Game!`;

		///kitty Match winner
		if (match_over && match_winner==='kitty') return 'kitty chan WON the Game!';
        
		///User Round Winner
		if (winner === 'user') return `${username} WON this round! \n*Rounds ${rounds}/5**  ---  ${username} - ${currentUserWinCount} | kitty chan - ${currentKittyWinCount}`;
		///kitty Game Winner
		if (winner === 'kitty') return `kitty chan WON this round! \n**Rounds ${rounds}/5**  ---  ${username} - ${currentUserWinCount} | kitty chan - ${currentKittyWinCount}`;

	}
};