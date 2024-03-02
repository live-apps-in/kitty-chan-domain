import { Client } from '@live-apps/discord';
import { Controller, Inject } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { PROVIDER_TYPES } from 'src/common/constants/provider.types';
import { DiscordEventsType } from 'src/common/enum/discord-events.enum';
import {
  IBasicGuild,
  IGuildMember,
  IGuildMessage,
  IGuildPresence,
  IMessageDelete,
  IMessageReaction,
  IMessageUpdate,
} from 'src/common/interface/guild.interface';
import { HealthService } from 'src/common/services/health.service';
import { AnalyticsService } from 'src/modules/analytics/analytics.service';
import { AutoSailConfigService } from 'src/modules/auto-sail/auto-sail-config.service';
import { AutoSailTriggerEvents } from 'src/modules/auto-sail/enum/auto-sail-trigger-events.enum';
import { CommandService } from 'src/modules/commands/commands.service';
import { WelcomerService } from 'src/modules/greet/welcomer.service';
import { GuildService } from 'src/modules/guild/guild.service';
import { LanguageFilter } from 'src/modules/language/language-filter.service';
import { LoggerService } from 'src/modules/logger/logger.service';
import { ReactionRolesService } from 'src/modules/roles/reaction-roles.service';

@Controller()
export class EventsController {
  constructor(
    @Inject(PROVIDER_TYPES.DiscordClient)
    private readonly discordClient: Client,
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
    @Inject(ReactionRolesService)
    private readonly reactionRolesService: ReactionRolesService,
    @Inject(GuildService)
    private readonly guildService: GuildService,
    @Inject(WelcomerService)
    private readonly welcomerService: WelcomerService,
  ) {}
  @GrpcMethod('EventsService', 'messageCreate')
  async messageCreate(message: IGuildMessage) {
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
  async messageUpdate(message: IMessageUpdate) {
    this.loggerService.messageUpdateDelete(
      message,
      DiscordEventsType.messageUpdate,
    );

    this.analyticsService.log_message(message, DiscordEventsType.messageUpdate);
  }

  @GrpcMethod('EventsService', 'messageDelete')
  async messageDelete(message: IMessageDelete) {
    this.loggerService.messageUpdateDelete(
      message,
      DiscordEventsType.messageDelete,
    );

    this.analyticsService.log_message(message, DiscordEventsType.messageDelete);
  }

  @GrpcMethod('EventsService', 'messageReactionAdd')
  async messageReactionAdd(message: IMessageReaction) {
    this.reactionRolesService.setReactionRole(message);
  }

  @GrpcMethod('EventsService', 'messageReactionRemove')
  messageReactionRemove(message: IMessageReaction) {
    this.reactionRolesService.removeReactionRole(message);
  }

  @GrpcMethod('EventsService', 'guildCreate')
  async guildCreate(guild: IBasicGuild) {
    this.guildService.guildCreate(guild);
  }

  @GrpcMethod('EventsService', 'guildUpdate')
  async guildUpdate(guild: IBasicGuild) {
    this.guildService.guildUpdate(guild);
  }

  @GrpcMethod('EventsService', 'guildDelete')
  async guildDelete(guild: IBasicGuild) {
    this.guildService.guildDelete(guild);
  }

  @GrpcMethod('EventsService', 'guildMemberCreate')
  async guildMemberCreate(guildMember: IGuildMember) {
    await Promise.all([
      this.welcomerService.handle(guildMember),

      this.guildService.guildMemberCreate(guildMember),

      this.analyticsService.log_member(
        guildMember,
        DiscordEventsType.memberCreate,
      ),
    ]);
  }

  @GrpcMethod('EventsService', 'guildMemberUpdate')
  async guildMemberUpdate(guildMember: IGuildMember) {
    await Promise.all([
      this.loggerService.memberUpdate(guildMember),

      //Update Member cache
      this.discordClient.member.fetch(guildMember.guildId, guildMember.userId, {
        ignoreCache: true,
      }),

      this.analyticsService.log_member(
        guildMember,
        DiscordEventsType.memberUpdate,
      ),
    ]);
  }

  @GrpcMethod('EventsService', 'guildMemberRemove')
  async guildMemberRemove(guildMember: IGuildMember) {
    await Promise.all([
      //Sync Guild Member
      this.guildService.guildMemberDelete(guildMember),

      this.analyticsService.log_member(
        guildMember,
        DiscordEventsType.memberDelete,
      ),
    ]);
  }

  @GrpcMethod('EventsService', 'guildPresenceUpdate')
  async guildPresenceUpdate(guildPresence: IGuildPresence) {
    await this.guildService.guildPresenceUpdate(guildPresence);
  }
}
