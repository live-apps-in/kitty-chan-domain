import LanguageLibs from '../modules/language/model/language_libs.model';

/* Data Libs */
export let strong_language_en = [];
export let hinglish_words = [];
export class OnInit {
  async bootstrap() {
    await this.loadSystemLanguageLibs();
  }

  /**
   * Load Content Library
   */
  private async loadSystemLanguageLibs() {
    const languageLibs = await LanguageLibs.find({ system: true });

    languageLibs.map((e) => {
      if (e.name === 'strong_language_en') strong_language_en = e.data;
      if (e.name === 'hindi') hinglish_words = e.data;
    });
  }
}
