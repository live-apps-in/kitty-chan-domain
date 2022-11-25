import { injectable } from 'inversify';

@injectable()
export class UtilityService{
	async match_wake_phrase(messageChunk: string[], phraseLib: string[][]) {
		const res = {
			isMatch: false,
			libIndex: 0
		};

	
		for (let index = 0; index < phraseLib.length; index++) {
			if (res.isMatch) break;

			//Length of single wake word array
			const wakeWordCount = phraseLib[index].length;
			let matchCount = 0;
			const temp_wake_words = [...phraseLib[index]];
			let temp_block_list = []

			//Loop Single Wake word array
			for (let i = 0; i < temp_wake_words.length; i++) {
				if (res.isMatch) break;
				const wakeWord = temp_wake_words[i];

				//Loop message chunk
				for (let j = 0; j < messageChunk.length; j++) {
					const element = messageChunk[j].toLowerCase();
					if (wakeWord === element && !temp_block_list.includes(wakeWord)) {
						temp_block_list.push(wakeWord)
						temp_wake_words[i] = '';
						matchCount += 1;
					}
				}
				if (matchCount >= wakeWordCount) {
					res.isMatch = true;
					res.libIndex = index;
				}
                
			}
            
		}
        
		return {
			...res
		};
	}
}