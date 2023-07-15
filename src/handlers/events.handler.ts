import { sendUnaryData, ServerUnaryCall } from '@grpc/grpc-js';
import { inject, injectable } from 'inversify';
import {
  IBasicGuild,
  IGuildMember,
  IGuildMemberUpdate,
  IGuildMessageWithFF,
  IMessageDelete,
  IMessageReaction,
  IMessageUpdate,
} from '../modules/interface/shared.interface';
import { CommandService } from '../modules/service/commands.service';
import { GamesService } from '../modules/service/games/games.service';
import { GuildService } from '../modules/service/guild.service';
import { StatsLoggerService } from '../modules/service/stats_logger.service';
import { PortalService } from '../modules/service/portal.service';
import { RolesService } from '../modules/service/roles/roles.service';
import { FeatureFlagService } from '../modules/service/shared/featureFlag.service';
import { WakeService } from '../modules/service/wake.service';
import { TYPES } from '../core/inversify.types';
import { EventsServiceHandlers } from '../proto/kitty_chan/EventsService';
import { NoResponse } from '../proto/kitty_chan/NoResponse';
import { ServiceStatus } from '../modules/service/shared/service_status.service';
import { WelcomerService } from '../modules/service/welcomer.service';
import { LoggerService } from '../modules/service/logger.service';
import { liveClient } from '../modules/app';
import { LanguageFilter } from '../modules/language/languageFilter.service';

@injectable()
export class EventsHandler implements EventsServiceHandlers {
  [name: string]: any;
  constructor(
    @inject(TYPES.LanguageFilter) private readonly langFilter: LanguageFilter,
    @inject(TYPES.StatsLoggerService)
    private readonly statsLoggerService: StatsLoggerService,
    @inject(TYPES.WakeService) private readonly wakeService: WakeService,
    @inject(TYPES.CommandService)
    private readonly commandService: CommandService,
    @inject(TYPES.FeatureFlagService)
    private readonly featureFlagService: FeatureFlagService,
    @inject(TYPES.PortalService) private readonly portalService: PortalService,
    @inject(TYPES.GameService) private readonly gameService: GamesService,
    @inject(TYPES.RolesService) private readonly rolesService: RolesService,
    @inject(TYPES.GuildService) private readonly guildService: GuildService,
    @inject(TYPES.ServiceStatus) private readonly serviceStatus: ServiceStatus,
    @inject(TYPES.WelcomerService)
    private readonly welcomerService: WelcomerService,
    @inject(TYPES.LoggerService) private readonly loggerService: LoggerService,
  ) {}

  /**Message Create Events */
  async messageCreate(
    call: ServerUnaryCall<any, NoResponse>,
    callback: sendUnaryData<any>,
  ) {
    ///Acknowledge gRPC call
    callback(null);

    const guildMessage = call.request as IGuildMessageWithFF;

    //Validate if Bot message
    if (guildMessage.isBot) return;

    ///Log
    this.statsLoggerService.log_message_count(guildMessage);

    ///Service Stats
    const serviceStats = await this.serviceStatus.validateCommand(guildMessage);
    if (serviceStats) return;

    ///Fetch feature flags
    const featureFlag = await this.featureFlagService.getFeatureFlag(
      guildMessage,
    );
    if (!featureFlag) return;

    guildMessage.featureFlag = { ...featureFlag };

    ///Check Portal Intent
    const isPortal = await this.portalService.validate_channel(guildMessage);
    if (isPortal) return;

    ///Check Game Intent
    const isGame = await this.gameService.validateGame(guildMessage);
    if (isGame) return;

    ///Language Services
    const languageRes = await this.langFilter.languageFactory(guildMessage);
    if (languageRes.strongLanguage) return;

    ///Commands
    const isCommand = await this.commandService.validateCommand(guildMessage);
    if (isCommand) return;

    ///Wake Words
    this.wakeService.validate(guildMessage);

    ///Games
    this.gameService.call(guildMessage);

    ///Log Good Text Count
    this.statsLoggerService.text_count_logger(guildMessage);
  }

  /**Guild Message Update */
  async messageUpdate(
    call: ServerUnaryCall<any, NoResponse>,
    callback: sendUnaryData<any>,
  ) {
    callback(null);

    const message = call.request as IMessageUpdate;
    this.loggerService.messageUpdate(message);
  }

  /**Guild Message Delete */
  async messageDelete(
    call: ServerUnaryCall<any, NoResponse>,
    callback: sendUnaryData<any>,
  ) {
    callback(null);

    const message = call.request as IMessageDelete;
    this.loggerService.messageDelete(message);
  }

  /**Add Message Reaction Events */
  async messageReactionAdd(
    call: ServerUnaryCall<any, NoResponse>,
    callback: sendUnaryData<any>,
  ) {
    callback(null);

    const payload = call.request as IMessageReaction;
    this.rolesService.setReactionRole(payload);
  }

  /**Remove Message Reaction Events */
  async messageReactionRemove(
    call: ServerUnaryCall<any, NoResponse>,
    callback: sendUnaryData<any>,
  ) {
    callback(null);

    const payload = call.request as IMessageReaction;
    this.rolesService.removeReactionRole(payload);
  }

  /**Guild Create Events */
  async guildCreate(
    call: ServerUnaryCall<any, NoResponse>,
    callback: sendUnaryData<any>,
  ) {
    callback(null);

    const payload = call.request as IBasicGuild;
    this.guildService.guildCreate(payload);
  }

  /**Guild Create Events */
  async guildDelete(
    call: ServerUnaryCall<any, NoResponse>,
    callback: sendUnaryData<any>,
  ) {
    callback(null);

    const payload = call.request as IBasicGuild;
    this.guildService.guildDelete(payload);
  }

  /**Guild Member Add */
  async guildMemberAdd(
    call: ServerUnaryCall<any, NoResponse>,
    callback: sendUnaryData<any>,
  ) {
    callback(null);
    const guildMember = call.request as IGuildMember;

    this.welcomerService.handle(guildMember);

    //Sync Guild Member
    this.guildService.guildMemberCreate(guildMember);
  }

  /**Guild Member Remove */
  async guildMemberRemove(
    call: ServerUnaryCall<any, NoResponse>,
    callback: sendUnaryData<any>,
  ) {
    callback(null);
    const guildMember = call.request as IGuildMember;

    //Sync Guild Member
    this.guildService.guildMemberDelete(guildMember);
  }

  /**Guild Member Update */
  async guildMemberUpdate(
    call: ServerUnaryCall<any, NoResponse>,
    callback: sendUnaryData<any>,
  ) {
    callback(null);
    const guildMember = call.request as IGuildMemberUpdate;

    //Logger Service
    this.loggerService.memberUpdate(guildMember);

    //Update Member cache
    await liveClient.member.fetch(guildMember.guildId, guildMember.userId, {
      ignoreCache: true,
    });
  }
}
