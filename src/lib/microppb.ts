/**
 * Link Finder
 *
 * Finds link for ASoT.
 *
 * @author    gpresland
 *
 */

'use strict';

/**
 * Base URL
 * @type {String}
 */
const URL = `https://${['m', 'i', 'r', 'o', 'p', 'p', 'b', '.', 'c', 'o', 'm'].join('')}/ASOT`;

import * as _ from 'lodash';
import * as Bluebird from 'bluebird';
import * as cheerio from 'cheerio';
import * as request from 'request';

import * as pad from './pad';

export default {

  /**
   * Gets an episode link
   * @param  {Srting}  episode  The episode number to get the link to
   * @return {Promise}
   */
  async getDetails(episode: string = null): Bluebird<string> {
    if (episode === null) {
      throw new TypeError('BAD EPISODE NUMBER');
    }
    const body = await this._getPage(episode);
    const date = this._getDate(body);
    const link = this._getDirectLink(body);
    return {
      date,
      link
    };
  },

  /**
   * Gets the direct link
   * @param  {String}  body  The body of the page
   * @return {String}
   */
  _getDirectLink(body: string) {
    const $ = cheerio.load(body);
    const link = $('#links > a:contains("Direct link")').attr('href');
    return link;
  },

  /**
   * Get episode ISO8601 date
   * @param  {String}  body  The body of the page
   * @return {String}
   */
  _getDate(body: string) {
    const MONTHS = [
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
    const $ = cheerio.load(body);
    const infoTable = $('#info_table > tr > td').html();
    const fields = infoTable.split('<br>')
      .map((field) => field.replace(/[\r\n\t]/g, ''))
      .map((field) => field.replace(/(<([^>]+)>)/ig, ''));
    const dateItems = fields.find((field) => field.includes('Date Of Release'))
      .replace('Date Of Release:', '')
      .replace(',', '')
      .trim()
      .split(' ');
    let year = dateItems[2];
    let month = MONTHS.findIndex((month) => month === dateItems[0]) + 1;
    let day = dateItems[1];
    month = pad.left(month, 2, 0);
    day = pad.left(day, 2, 0);
    return { year, month, day };
  },

  /**
   * Gets an HTML page for an episode
   * @param  {Srting}  episode  The episode number to get the link to
   * @return {Promise}
   */
  _getPage(episode: string): Bluebird<string> {
    return new Bluebird((resolve, reject) => {
      request({
        method: 'GET',
        uri: `${URL}/${episode}`
      }, function (error, response, body) {
        if (error) return reject(error);
        resolve(body);
      });
    });
  },

  /**
   * Gets the OneDrive link
   * @param  {String}  body  The body of the page
   * @return {String}
   */
  _getOneDriveLink(body: string) {
    const $ = cheerio.load(body);
    const link = $('#links > a:contains("OneDrive")').attr('href');
    return link;
  }
};
