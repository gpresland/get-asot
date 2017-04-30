/**
 * Link Finder
 *
 * Finds link for ASoT.
 *
 * @author    gpresland
 *
 */
'use strict';
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t;
    return { next: verb(0), "throw": verb(1), "return": verb(2) };
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
/**
 * Base URL
 * @type {String}
 */
var URL = 'https://miroppb.com/ASOT';
var Promise = require("bluebird");
var cheerio = require("cheerio");
var request = require("request");
exports["default"] = {
    /**
     * Gets an episode link
     *
     * @param  {Srting}  episode  The episode number to get the link to
     * @return {Promise}
     */
    getEpisodeLink: function (episode) {
        return __awaiter(this, void 0, void 0, function () {
            var body, link;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._getPage(episode)];
                    case 1:
                        body = _a.sent();
                        return [4 /*yield*/, this._getDirectLink(body)];
                    case 2:
                        link = _a.sent();
                        return [2 /*return*/, link];
                }
            });
        });
    },
    /**
     * Gets the direct link
     *
     * param  {String}  body  The body of the page
     */
    _getDirectLink: function (body) {
        var $ = cheerio.load(body);
        var link = $('#links > a:contains("Direct link")').attr('href');
        return link;
    },
    /**
     * Gets an HTML page for an episode
     * @param  {Srting}  episode  The episode number to get the link to
     * @return {Promise}
     */
    _getPage: function (episode) {
        return new Promise(function (resolve, reject) {
            request({
                method: 'GET',
                uri: URL + "/" + episode
            }, function (error, response, body) {
                if (error)
                    return reject(error);
                resolve(body);
            });
        });
    },
    /**
     * Gets the OneDrive link
     * *
     * @param  {String}  body  The body of the page
     * @return {String}
     */
    _getOneDriveLink: function (body) {
        var $ = cheerio.load(body);
        var link = $('#links > a:contains("OneDrive")').attr('href');
        return link;
    }
};