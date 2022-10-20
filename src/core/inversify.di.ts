import 'reflect-metadata';
import { Container } from 'inversify';

///Controller
import '../app/controller/app.controller';
import { LanguageFilter } from '../app/service/languageFilter.service';
import { TYPES } from './inversify.types';
import { App } from '../app/app';
import { ResponseService } from '../app/service/response.service';
import { SharedService } from '../app/shared/shared.service';
import { ViolationRepository } from '../app/repository/violation.repo';

const container = new Container({
	defaultScope: 'Singleton'
});

///Bindings
container.bind<App>(TYPES.App).to(App);
container.bind<LanguageFilter>(TYPES.LanguageFilter).to(LanguageFilter);
container.bind<ResponseService>(TYPES.ResponseService).to(ResponseService);
container.bind<SharedService>(TYPES.SharedService).to(SharedService);
container.bind<ViolationRepository>(TYPES.ViolationRepository).to(ViolationRepository);


export default container;