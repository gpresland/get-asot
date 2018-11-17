const BASE_URL: string = `https://${['m', 'i', 'r', 'o', 'p', 'p', 'b', '.', 'c', 'o', 'm'].join('')}/ASOT`;

import axios from 'axios';
import cheerio from 'cheerio'

export interface Details {
  date: Date,
  downloadUrl: string
}

export default {
  /**
   * Gets an episode link.
   * @param episode The episode number to get the link to.
   * @returns
   */
  async getDetails(episode: string): Promise<Details> {
    if (episode === '') {
      throw new TypeError('Bad episode number.');
    }
    return new Promise<Details>(async (resolve, reject) => {
      const body = await this._getPage(episode);
      const date = this._getDate(body);
      const link = this._getDirectLink(body);
      resolve({
        date: date,
        downloadUrl: link
      });
    });
  },

  /**
   * Gets the direct link
   * @param body The body of the page.
   * @returns
   */
  _getDirectLink(body: string) {
    const $ = cheerio.load(body);
    const link = $('#links > a:contains("Direct link")').attr('href');
    return link;
  },

  /**
   * Get episode date.
   * @param body The body of the page.
   * @returns The date of release of the episode.
   */
  _getDate(body: string): Date {
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
    const table: string | null = $('#info_table > tr > td').html();
    if (table == null) {
      throw new Error('Cannot parse body.');
    }
    const fields: string[] = table.split('<br>')
      .map((field) => field.replace(/[\r\n\t]/g, ''))
      .map((field) => field.replace(/(<([^>]+)>)/ig, ''));
    const dateString: string = fields[2];
    const datePieces: string[] = dateString
      .replace('Release Date:', '')
      .replace(',', '')
      .trim()
      .split(' ');
    const year: number = parseInt(datePieces[2]);
    const month: number = MONTHS.findIndex(month => month === datePieces[0]);
    const date: number = parseInt(datePieces[1]);
    return new Date(year, month, date);
  },

  /**
   * Gets an HTML page for an episode.
   * @param episode The episode number to get the link to.
   * @returns
   */
  _getPage(episode: string): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      const url: string = `${BASE_URL}/${episode}`;
      axios.get(url)
        .then(response => {
          if (response.status === 200) {
            resolve(response.data);
          } else {
            reject();
          }
        })
        .catch(err => reject(err));
    });
  },

  /**
   * Gets the OneDrive link.
   * @param body The body of the page.
   * @returns
   */
  _getOneDriveLink(body: string) {
    const $ = cheerio.load(body);
    const link = $('#links > a:contains("OneDrive")').attr('href');
    return link;
  }
};
