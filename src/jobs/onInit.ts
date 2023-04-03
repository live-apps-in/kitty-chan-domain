import DataLibs from '../model/data_libs.model';

/* Data Libs */
export let bad_words = [];
export let hinglish_words = [];
export class OnInit{
	async bootstrap() {
		await this.loadDataLibs();
	}

	/**
	 * Load Content Library
	 */
	private async loadDataLibs() {
		const data_libs = await DataLibs.find({});

		data_libs.map(e => {
			if (e.name === 'strong_language') bad_words = e.data;
			if (e.name === 'hindi') hinglish_words = e.data;
		});
		
	}
}