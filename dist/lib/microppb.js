"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var BASE_URL = "https://" + ['m', 'i', 'r', 'o', 'p', 'p', 'b', '.', 'c', 'o', 'm'].join('') + "/ASOT";
var axios_1 = __importDefault(require("axios"));
var cheerio_1 = __importDefault(require("cheerio"));
exports.default = {
    /**
     * Gets an episode link.
     * @param episode The episode number to get the link to.
     * @returns
     */
    getDetails: function (episode) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                if (episode === '') {
                    throw new TypeError('Bad episode number.');
                }
                return [2 /*return*/, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                        var body, date, link;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, this._getPage(episode)];
                                case 1:
                                    body = _a.sent();
                                    date = this._getDate(body);
                                    link = this._getDirectLink(body);
                                    resolve({
                                        date: date,
                                        downloadUrl: link
                                    });
                                    return [2 /*return*/];
                            }
                        });
                    }); })];
            });
        });
    },
    /**
     * Gets the direct link
     * @param body The body of the page.
     * @returns
     */
    _getDirectLink: function (body) {
        var $ = cheerio_1.default.load(body);
        var link = $('#links > a:contains("Direct link")').attr('href');
        return link;
    },
    /**
     * Get episode date.
     * @param body The body of the page.
     * @returns The date of release of the episode.
     */
    _getDate: function (body) {
        var MONTHS = [
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December'
        ];
        var $ = cheerio_1.default.load(body);
        var table = $('#info_table > tr > td').html();
        if (table == null) {
            throw new Error('Cannot parse body.');
        }
        var fields = table.split('<br>')
            .map(function (field) { return field.replace(/[\r\n\t]/g, ''); })
            .map(function (field) { return field.replace(/(<([^>]+)>)/ig, ''); });
        var dateString = fields[2];
        var datePieces = dateString
            .replace('Release Date:', '')
            .replace(',', '')
            .trim()
            .split(' ');
        var year = parseInt(datePieces[2]);
        var month = MONTHS.findIndex(function (month) { return month === datePieces[0]; });
        var date = parseInt(datePieces[1]);
        return new Date(year, month, date);
    },
    /**
     * Gets an HTML page for an episode.
     * @param episode The episode number to get the link to.
     * @returns
     */
    _getPage: function (episode) {
        return new Promise(function (resolve, reject) {
            var url = BASE_URL + "/" + episode;
            axios_1.default.get(url)
                .then(function (response) {
                if (response.status === 200) {
                    resolve(response.data);
                }
                else {
                    reject();
                }
            })
                .catch(function (err) { return reject(err); });
        });
    },
    /**
     * Gets the OneDrive link.
     * @param body The body of the page.
     * @returns
     */
    _getOneDriveLink: function (body) {
        var $ = cheerio_1.default.load(body);
        var link = $('#links > a:contains("OneDrive")').attr('href');
        return link;
    }
};
