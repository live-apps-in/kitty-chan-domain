import { injectable } from 'inversify';
import { DiscordEmbeds } from '@live-apps/discord';

@injectable()
export class DiscordTemplateService {
  async fillEmbedTemplate(payload: any, template: DiscordEmbeds) {
    const filledTemplate = { ...template };

    for (const key in payload) {
      if (payload.hasOwnProperty(key)) {
        const placeholder = '${' + key + '}';
        filledTemplate.title = filledTemplate.title.replace(
          placeholder,
          payload[key],
        );
        filledTemplate.description = filledTemplate.description.replace(
          placeholder,
          payload[key],
        );
      }
    }

    return filledTemplate;
  }
}
