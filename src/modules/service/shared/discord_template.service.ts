import { injectable } from 'inversify';
import { DiscordEmbeds } from '@live-apps/discord';

@injectable()
export class DiscordTemplateService {
  async fillEmbedTemplate(payload: any, template: DiscordEmbeds) {
    const filledTemplate = { ...template };

    for (const key in payload) {
      if (payload.hasOwnProperty(key)) {
        //Dynamic value mapping using this key
        const placeholder = '${' + key + '}';

        //Title
        filledTemplate.title = filledTemplate.title.replace(
          placeholder,
          payload[key],
        );

        //Description
        filledTemplate.description = filledTemplate.description.replace(
          placeholder,
          payload[key],
        );

        //Author
        filledTemplate.author.name = filledTemplate.author.name.replace(
          placeholder,
          payload[key],
        );
        filledTemplate.author.icon_url = filledTemplate.author.icon_url.replace(
          placeholder,
          payload[key],
        );
      }
    }

    return filledTemplate;
  }
}
