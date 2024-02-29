import { Controller, Inject } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { DiscordEventsType } from 'src/common/enum/discord-events.enum';
import {
  IGuildMessage,
  IMessageDelete,
  IMessageUpdate,
} from 'src/common/interface/guild.interface';
import { HealthService } from 'src/common/services/health.service';
import { AnalyticsService } from 'src/modules/analytics/analytics.service';
import { AutoSailConfigService } from 'src/modules/auto-sail/auto-sail-config.service';
import { AutoSailTriggerEvents } from 'src/modules/auto-sail/enum/auto-sail-trigger-events.enum';
import { CommandService } from 'src/modules/commands/commands.service';
import { LanguageFilter } from 'src/modules/language/language-filter.service';
import { LoggerService } from 'src/modules/logger/logger.service';

@Controller()
export class EventsController {
  constructor(
    @Inject(AnalyticsService)
    private readonly analyticsService: AnalyticsService,
    @Inject(HealthService)
    private readonly healthService: HealthService,
    @Inject(LanguageFilter)
    private readonly languageFilterService: LanguageFilter,
    @Inject(AutoSailConfigService)
    private readonly autoSailConfigService: AutoSailConfigService,
    @Inject(CommandService)
    private readonly commandService: CommandService,
    @Inject(LoggerService)
    private readonly loggerService: LoggerService,
  ) {}
  @GrpcMethod('EventsService', 'messageCreate')
  async messageCreate(message: IGuildMessage): Promise<any> {
    //Return if bot message
    if (message.isBot) {
      return;
    }

    //Log Message info
    this.analyticsService.log_message(message, DiscordEventsType.messageCreate);

    //Public health check
    const isHealthCheckCommand =
      await this.healthService.validateCommand(message);
    if (isHealthCheckCommand) {
      return;
    }

    //Language Services
    this.languageFilterService.languageFactory(message);

    //AutoSail
    this.autoSailConfigService.process(
      message,
      AutoSailTriggerEvents.MESSAGE_CREATE,
    );

    //Validate Command Intent
    const isCommandIntent = await this.commandService.validateCommand(message);

    if (isCommandIntent) {
      return;
    }
  }

  @GrpcMethod('EventsService', 'messageUpdate')
  async messageUpdate(message: IMessageUpdate): Promise<any> {
    this.loggerService.messageUpdateDelete(
      message,
      DiscordEventsType.messageUpdate,
    );

    this.analyticsService.log_message(message, DiscordEventsType.messageUpdate);
  }

  @GrpcMethod('EventsService', 'messageDelete')
  messageDelete(message: IMessageDelete): any {
    this.loggerService.messageUpdateDelete(
      message,
      DiscordEventsType.messageDelete,
    );

    this.analyticsService.log_message(message, DiscordEventsType.messageDelete);
  }

  @GrpcMethod('EventsService', 'messageReactionAdd')
  messageReactionAdd(data: any): any {
    console.log(data);
  }

  @GrpcMethod('EventsService', 'messageReactionRemove')
  messageReactionRemove(data: any): any {
    console.log(data);
  }

  @GrpcMethod('EventsService', 'guildCreate')
  guildCreate(data: any): any {
    console.log(data);
  }

  @GrpcMethod('EventsService', 'guildUpdate')
  guildUpdate(data: any): any {
    console.log(data);
  }

  @GrpcMethod('EventsService', 'guildDelete')
  guildDelete(data: any): any {
    console.log(data);
  }

  @GrpcMethod('EventsService', 'guildMemberCreate')
  guildMemberCreate(data: any): any {
    console.log(data);
  }

  @GrpcMethod('EventsService', 'guildMemberUpdate')
  guildMemberUpdate(data: any): any {
    console.log(data);
  }

  @GrpcMethod('EventsService', 'guildMemberRemove')
  guildMemberRemove(data: any): any {
    console.log(data);
  }

  @GrpcMethod('EventsService', 'guildPresenceUpdate')
  guildPresenceUpdate(data: any): any {}
}
