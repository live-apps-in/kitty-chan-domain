import { injectable } from 'inversify';

@injectable()
export class UtilityService{
	async match_wake_phrase(messageChunk: string[], phraseLib: string[][]) {
		let isMatch = false;

	
		for (let index = 0; index < phraseLib.length; index++) {
			if (isMatch) break;

			//Length of single wake word array
			const wakeWordCount = phraseLib[index].length;
			let matchCount = 0;
			const temp_wake_words = [...phraseLib[index]];

			//Loop Single Wake word array
			for (let i = 0; i < temp_wake_words.length; i++) {
				if (isMatch) break;
				const wakeWord = temp_wake_words[i];

				//Loop message chunk
				for (let j = 0; j < messageChunk.length; j++) {
					const element = messageChunk[j].toLowerCase();
					if (wakeWord === element) {
						temp_wake_words[i] = '';
						matchCount += 1;
					}
				}
				if (matchCount >= wakeWordCount) isMatch = true;
                
			}
            
		}
        
		return isMatch;
	}
}