import * as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';
import { CommandService } from '../../modules/commands/commands.service';
import { GuildService } from '../../modules/guild/guild.service';
import { GuildStatsService } from '../../modules/stats/guild-stats.service';
import { PortalService } from '../../modules/portal/portal.service';
import { RolesService } from '../../modules/roles/roles.service';
import { TYPES } from '../../core/inversify.types';
import { EventsHandler } from '../../handlers/events.handler';
import { ProtoGrpcType } from '../../proto/kitty_chan';
import { ServiceStatus } from '../../common/services/service-status.service';
import { WelcomerService } from '../../modules/greet/welcomer.service';
import { LoggerService } from '../../modules/logger/logger.service';
import container from '../../core/inversify.di';
import { LanguageFilter } from '../../modules/language/language-filter.service';
import { AutoSailConfigService } from '../../modules/auto-sail/auto-sail-config.service';
import { CronHandler } from '../../handlers/cron.handler';
import { CronService } from '../../modules/cron/cron.service';

/**
 * Load Proto
 */
const PROTO_FILE = './src/proto/kitty_chan.proto';
const packageDefinition = protoLoader.loadSync(PROTO_FILE);
const proto = grpc.loadPackageDefinition(
  packageDefinition,
) as unknown as ProtoGrpcType;

/**
 * gRPC Controller
 */
const languageFilterService = container.get<LanguageFilter>(
  TYPES.LanguageFilter,
);
const guildStatsService = container.get<GuildStatsService>(
  TYPES.GuildStatsService,
);
const commandService = container.get<CommandService>(TYPES.CommandService);
const portalService = container.get<PortalService>(TYPES.PortalService);
const rolesService = container.get<RolesService>(TYPES.RolesService);
const guildService = container.get<GuildService>(TYPES.GuildService);
const serviceStatus = container.get<ServiceStatus>(TYPES.ServiceStatus);
const welcomerService = container.get<WelcomerService>(TYPES.WelcomerService);
const loggerService = container.get<LoggerService>(TYPES.LoggerService);
const autoSailConfigService = container.get<AutoSailConfigService>(
  TYPES.AutoSailConfigService,
);

/**Events Service */
const eventsGrpcController = new EventsHandler(
  languageFilterService,
  guildStatsService,
  commandService,
  portalService,
  rolesService,
  guildService,
  serviceStatus,
  welcomerService,
  loggerService,
  autoSailConfigService,
);

/**Cron Service */
const cronService = container.get<CronService>(TYPES.CronService);
const cronGrpcController = new CronHandler(cronService);

/**gRPC Server */
const gRpcServer = new grpc.Server();

gRpcServer.addService(
  proto.kitty_chan.EventsService.service,
  eventsGrpcController,
);

gRpcServer.addService(proto.kitty_chan.CronService.service, cronGrpcController);

gRpcServer.bindAsync(
  process.env.GRPC_URL,
  grpc.ServerCredentials.createInsecure(),
  (err, port) => {
    if (err) {
      console.error(`Failed to start gRPC server: ${err}`);
      return;
    }
    console.log(`gRPC Server listening on port ${port}`);
    gRpcServer.start();
  },
);
