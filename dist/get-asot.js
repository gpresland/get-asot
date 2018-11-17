"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var pkg = require('../package.json');
var commander_1 = __importDefault(require("commander"));
var options_1 = require("./options");
commander_1.default
    .version(pkg.version)
    .option('-e, --episode <n>', 'download ASoT episode number')
    .parse(process.argv);
if (commander_1.default.episode) {
    options_1.download(commander_1.default.episode);
}
