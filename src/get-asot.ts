const pkg = require('../package.json');

import commander from 'commander';

import { download } from './options';

commander
  .version(pkg.version)
  .option('-e, --episode <n>', 'download ASoT episode number')
  .parse(process.argv);

if (commander.episode) {
  download(commander.episode);
}
