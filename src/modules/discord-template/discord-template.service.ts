import { DiscordEmbeds } from '@live-apps/discord';
import { Injectable } from '@nestjs/common';

@Injectable()
export class DiscordTemplateService {
  async fillPlainTemplate(payload: any, plainContent: string) {
    for (const key in payload) {
      if (payload.hasOwnProperty(key)) {
        //Dynamic value mapping using this key
        const placeholder = '${' + key + '}';

        plainContent = plainContent.replace(placeholder, payload[key]);
      }
    }

    return plainContent;
  }

  async fillEmbedTemplate(
    payload: any,
    template: DiscordEmbeds,
  ): Promise<DiscordEmbeds> {
    const filledTemplate = { ...template };

    for (const key in payload) {
      if (payload.hasOwnProperty(key)) {
        //Dynamic value mapping using this key
        const placeholder = '${' + key + '}';

        //Title
        if (filledTemplate.title) {
          filledTemplate.title = filledTemplate.title.replace(
            placeholder,
            payload[key],
          );
        }

        //Description
        if (filledTemplate.description) {
          filledTemplate.description = filledTemplate.description.replace(
            placeholder,
            payload[key],
          );
        }

        //Author
        if (filledTemplate.author) {
          filledTemplate.author.name = filledTemplate?.author?.name?.replace(
            placeholder,
            payload[key],
          );
          filledTemplate.author.icon_url =
            filledTemplate?.author?.icon_url?.replace(
              placeholder,
              payload[key],
            );
        }

        //Image
        if (filledTemplate?.image) {
          filledTemplate.image.url = filledTemplate?.image?.url?.replace(
            placeholder,
            payload[key],
          );
        }

        //Footer
        if (filledTemplate.footer) {
          filledTemplate.footer.text = filledTemplate?.footer?.text?.replace(
            placeholder,
            payload[key],
          );
        }

        //Timestamp
        if (filledTemplate.timestamp) {
          filledTemplate.timestamp = filledTemplate?.timestamp?.replace(
            placeholder,
            payload[key],
          );
        }
      }
    }

    return filledTemplate;
  }
}
