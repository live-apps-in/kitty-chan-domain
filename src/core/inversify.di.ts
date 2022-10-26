import 'reflect-metadata';
import { Container } from 'inversify';

///Controller
import '../app/controller/app.controller';
import '../api/texts/text.controller';
import { LanguageFilter } from '../app/service/languageFilter.service';
import { TYPES } from './inversify.types';
import { App } from '../app/app';
import { ResponseService } from '../app/service/response.service';
import { SharedService } from '../app/shared/shared.service';
import { ViolationRepository } from '../app/repository/violation.repo';
import { LoggerService } from '../app/service/logger.service';
import { TextLogRepository } from '../app/repository/textLogRepo';
import { WhiteListService } from '../app/service/shared/whitelist.service';

const container = new Container({
	defaultScope: 'Singleton'
});

///Bindings
container.bind<App>(TYPES.App).to(App);
container.bind<LanguageFilter>(TYPES.LanguageFilter).to(LanguageFilter);
container.bind<ResponseService>(TYPES.ResponseService).to(ResponseService);
container.bind<SharedService>(TYPES.SharedService).to(SharedService);
container.bind<LoggerService>(TYPES.LoggerService).to(LoggerService);
container.bind<ViolationRepository>(TYPES.ViolationRepository).to(ViolationRepository);
container.bind<TextLogRepository>(TYPES.TextLogRepository).to(TextLogRepository);
container.bind<WhiteListService>(TYPES.WhiteListService).to(WhiteListService);


export default container;