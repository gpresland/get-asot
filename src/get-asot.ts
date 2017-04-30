/**
 * Get ASoT
 *
 * Get A State of Trance episode.
 *
 * @author gpresland
 *
 */

'use strict';

const pkg = require('../package.json');

import * as fs from 'fs';
import * as program from 'commander';
import * as path from 'path';
import * as request from 'request';
import * as progress from 'request-progress';

import linkFinder from './lib/microppb';

program
  .version(pkg.version)
  .option('-e, --episode <n>', 'download ASoT episode number')
  .parse(process.argv);

async function download(episode: string | number) {

  const details = await linkFinder.getDetails(program.episode);
  const filename = `Armin van Buuren - A State of Trance ${program.episode} - ${details.date.day}.${details.date.month}.${details.date.year}.mp3`;
  const filepath = path.resolve(process.cwd(), filename);

  progress(request.get(details.link), {
    //
  })
  .on('progress', (state) => {
    const percentComplete = Math.round(state.percent * 100).toString();
    process.stdout.clearLine();
    process.stdout.cursorTo(0);
    process.stdout.write(`Downloading: ${percentComplete}%`);
  })
  .on('error', (err) => {
    //
  })
  .on('end', () => {
    //
  })
  .pipe(fs.createWriteStream(filepath));
};

download(program.episode);