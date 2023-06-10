import * as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';
import { GuildGrpcController } from '../../api/live_cord/controller/guild/guild.gRPC.controller';
import { RolesGrpcController } from '../../api/live_cord/controller/roles/roles.gRPC.controller';
import { RolesAPIService } from '../../api/live_cord/service/roles/roles.service';
import { CommandService } from '../../modules/service/commands.service';
import { GamesService } from '../../modules/service/games/games.service';
import { GuildService } from '../../modules/service/guild.service';
import { LanguageFilter } from '../../modules/service/languageFilter.service';
import { LoggerService } from '../../modules/service/logger.service';
import { PortalService } from '../../modules/service/portal.service';
import { RolesService } from '../../modules/service/roles/roles.service';
import { FeatureFlagService } from '../../modules/service/shared/featureFlag.service';
import { WakeService } from '../../modules/service/wake.service';
import container from '../../core/inversify.di';
import { TYPES } from '../../core/inversify.types';
import { EventsHandler } from '../../handlers/events.handler';
import { ProtoGrpcType } from '../../proto/kitty_chan';
import { ServiceStatus } from '../../modules/service/shared/service_status.service';
import { WelcomerService } from '../../modules/service/welcomer.service';

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
const rolesApiService = container.get<RolesAPIService>(TYPES.RolesAPIService);
const languageFilterService = container.get<LanguageFilter>(
  TYPES.LanguageFilter,
);
const loggerService = container.get<LoggerService>(TYPES.LoggerService);
const wakeService = container.get<WakeService>(TYPES.WakeService);
const commandService = container.get<CommandService>(TYPES.CommandService);
const featureFlagService = container.get<FeatureFlagService>(
  TYPES.FeatureFlagService,
);
const portalService = container.get<PortalService>(TYPES.PortalService);
const gameService = container.get<GamesService>(TYPES.GameService);
const rolesService = container.get<RolesService>(TYPES.RolesService);
const guildService = container.get<GuildService>(TYPES.GuildService);
const serviceStatus = container.get<ServiceStatus>(TYPES.ServiceStatus);
const welcomerService = container.get<WelcomerService>(TYPES.WelcomerService);

const eventsGrpcController = new EventsHandler(
  languageFilterService,
  loggerService,
  wakeService,
  commandService,
  featureFlagService,
  portalService,
  gameService,
  rolesService,
  guildService,
  serviceStatus,
  welcomerService,
);
const rolesGrpcController = new RolesGrpcController(rolesApiService);
const guildGrpcController = new GuildGrpcController();

/**
 * gRPC Server Config
function middleware(call: grpc.ServerUnaryCall<any, any>, callback: grpc.sendUnaryData<any>, next: () => void) {
  const metadata = call.metadata.getMap();
  // Access metadata headers here
  console.log(metadata);

  // Proceed with the request
  next();
}
 */
const gRpcServer = new grpc.Server();
gRpcServer.addService(
  proto.kitty_chan.EventsService.service,
  eventsGrpcController,
);

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
