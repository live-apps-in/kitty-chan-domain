import { sendUnaryData, ServerUnaryCall } from '@grpc/grpc-js';
import { inject, injectable } from 'inversify';
import {
  IBasicGuild,
  IGuildMember,
  IGuildMessageWithFF,
  IMessageReaction,
} from '../modules/interface/shared.interface';
import { CommandService } from '../modules/service/commands.service';
import { GamesService } from '../modules/service/games/games.service';
import { GuildService } from '../modules/service/guild.service';
import { LanguageFilter } from '../modules/service/languageFilter.service';
import { LoggerService } from '../modules/service/logger.service';
import { PortalService } from '../modules/service/portal.service';
import { RolesService } from '../modules/service/roles/roles.service';
import { FeatureFlagService } from '../modules/service/shared/featureFlag.service';
import { WakeService } from '../modules/service/wake.service';
import { SharedService } from '../modules/service/shared/shared.service';
import { TYPES } from '../core/inversify.types';
import { EventsServiceHandlers } from '../proto/kitty_chan/EventsService';
import { NoResponse } from '../proto/kitty_chan/NoResponse';
import { ServiceStatus } from '../modules/service/shared/service_status.service';

@injectable()
export class EventsHandler implements EventsServiceHandlers {
  [name: string]: any;
  constructor(
    @inject(TYPES.LanguageFilter) private readonly langFilter: LanguageFilter,
    @inject(TYPES.SharedService) private readonly sharedService: SharedService,
    @inject(TYPES.LoggerService) private readonly loggerService: LoggerService,
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
    this.loggerService.log_message_count(guildMessage);

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

    ///Non-English Detection (Only Detects Hindi)
    if (guildMessage?.featureFlag?.hindi) {
      const isNonEnglish = await this.langFilter.non_english_detection(
        guildMessage,
      );
      if (isNonEnglish) return callback(null);
    }

    if (guildMessage?.featureFlag?.strongLanguage) {
      ///Strong Language Detection
      const isStrongLang = await this.langFilter.strong_language_detection(
        guildMessage,
      );
      if (isStrongLang) return;
    }

    ///Commands
    const isCommand = await this.commandService.validateCommand(guildMessage);
    if (isCommand) return;

    ///Wake Words
    this.wakeService.validate(guildMessage);

    ///Games
    this.gameService.call(guildMessage);

    ///Log Good Text Count
    this.loggerService.text_count_logger(guildMessage);
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
    const payload = call.request as IGuildMember;

    this.guildService.syncCreateMemberWithLiveCord(payload);
  }

  /**Guild Member Remove */
  async guildMemberRemove(
    call: ServerUnaryCall<any, NoResponse>,
    callback: sendUnaryData<any>,
  ) {
    callback(null);
    const payload = call.request as IGuildMember;

    this.guildService.syncRemoveMemberWithLiveCord(payload);
  }
}
