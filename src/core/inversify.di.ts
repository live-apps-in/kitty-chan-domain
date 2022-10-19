import 'reflect-metadata'
import { Container } from 'inversify'

///Controller
import '../app/controller/app.controller'
import { LanguageFilter } from '../app/service/languageFilter'
import { TYPES } from './inversify.types'
import { App } from '../app/app'

const container = new Container({
    defaultScope: 'Singleton'
})

///Bindings
container.bind<App>(TYPES.App).to(App)
container.bind<LanguageFilter>(TYPES.LanguageFilter).to(LanguageFilter)

export default container