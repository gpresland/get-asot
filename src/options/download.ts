import { padStart } from 'lodash';
import axios from 'axios';
import fs from 'fs';
import path from 'path';

import downloader from '../lib/microppb';

/**
 * Downloads an episode to disk.
 * @param episode The episode number to download.
 */
export async function download(episode: string) {
  const details = await downloader.getDetails(episode);
  const yearString: string = padStart(details.date.getFullYear().toString(), 4, '0');
  const monthString = padStart((details.date.getMonth() + 1).toString(), 2, '0');
  const dateString = padStart(details.date.getDate().toString(), 2, '0');
  const fileName = `Armin van Buuren - A State of Trance ${episode} - ${dateString}.${monthString}.${yearString}.mp3`;
  const filePath = path.resolve(process.cwd(), fileName);

  console.log(`Downloading episode ${episode} as '${fileName}'..`);

  axios({
    url: details.downloadUrl,
    method: 'GET',
    responseType: 'stream',
  })
    .then(response => {
      response.data.pipe(fs.createWriteStream(filePath));
    })
    .catch(err => console.log(err));
}
