"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const inversify_express_utils_1 = require("inversify-express-utils");
require("reflect-metadata");
const inversify_di_1 = __importDefault(require("./core/inversify.di"));
const inversify_types_1 = require("./core/inversify.types");
const hbs = __importStar(require("express-handlebars"));
const path_1 = __importDefault(require("path"));
require("./core/awake");
require("./database/mongo");
const server = new inversify_express_utils_1.InversifyExpressServer(inversify_di_1.default);
server.setConfig((app) => {
    app.use(express_1.default.json());
    app.use((0, cors_1.default)());
    // Register `hbs.engine` with the Express app.
    app.engine('.hbs', hbs.engine({
        extname: '.hbs',
        defaultLayout: false,
        layoutsDir: path_1.default.join(__dirname, '../views')
    }));
    app.set('view engine', '.hbs');
});
function bootstrap() {
    return __awaiter(this, void 0, void 0, function* () {
        //Start App
        const _app = inversify_di_1.default.get(inversify_types_1.TYPES.App);
        _app.start();
    });
}
bootstrap();
const app = server.build();
app.listen(process.env.PORT || 5000, () => {
    console.log('App Started');
});
/////* PUBLIC PAGES *//////
app.get('/privacy-policy', (req, res) => {
    res.render('privacy-policy.hbs');
});
