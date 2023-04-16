import * as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';
import { GuildGrpcController } from '../../api/live_cord/controller/guild/guild.gRPC.controller';
import { RolesGrpcController } from '../../api/live_cord/controller/roles/roles.gRPC.controller';
import { RolesAPIService } from '../../api/live_cord/service/roles/roles.service';
import { CommandService } from '../../app/service/commands.service';
import { GamesService } from '../../app/service/games/games.service';
import { GuildService } from '../../app/service/guild.service';
import { LanguageFilter } from '../../app/service/languageFilter.service';
import { LoggerService } from '../../app/service/logger.service';
import { PortalService } from '../../app/service/portal.service';
import { RolesService } from '../../app/service/roles/roles.service';
import { FeatureFlagService } from '../../app/service/shared/featureFlag.service';
import { WakeService } from '../../app/service/wake.service';
import { SharedService } from '../../app/shared/shared.service';
import container from '../../core/inversify.di';
import { TYPES } from '../../core/inversify.types';
import { EventsHandler } from '../../handlers/events.handler';
import { ProtoGrpcType } from '../../proto/kitty_chan';
import { RedisService } from '../../shared/redis.service';

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
const sharedService = container.get<SharedService>(TYPES.SharedService);
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
const redisService = container.get<RedisService>(TYPES.RedisService);

const eventsGrpcController = new EventsHandler(
  languageFilterService,
  sharedService,
  loggerService,
  wakeService,
  commandService,
  featureFlagService,
  portalService,
  gameService,
  rolesService,
  guildService,
  redisService,
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
  proto.kitty_chan.ReactionRoleService.service,
  rolesGrpcController,
);
gRpcServer.addService(
  proto.kitty_chan.GuildService.service,
  guildGrpcController,
);
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
