import { injectable } from 'inversify';
import DiscordTemplate from '../modules/template/model/discord_templates.model';

@injectable()
export class TemplateRepo {
  async findById(templateId: string) {
    return DiscordTemplate.findOne({ _id: templateId });
  }
}
