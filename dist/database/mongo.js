"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
require("dotenv/config");
const MONGO_URI = process.env.MONGO_URI;
(0, mongoose_1.connect)(MONGO_URI)
    .then(res => console.log('MongoDB Atlas Connected'));
