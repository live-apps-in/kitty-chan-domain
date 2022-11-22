import { randomNumber } from '../../utils/calc';
import { sad_phrase_response } from '../data/wake_phrase/sad_phrase';


export const sad_phrase_response_builder = (libIndex: number) => {
	const resContent = sad_phrase_response[libIndex];
	const resContentLength = resContent.length;
    
	if (resContentLength === 1) {
		return resContent[0];
	}

	const randomResponse = randomNumber(1, resContentLength);
	const resMessage = resContent[randomResponse - 1 ];
	return resMessage;

};