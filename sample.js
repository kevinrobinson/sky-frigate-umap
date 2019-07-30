// local
const fs = require('fs');
const path = require('path');
const _ = require('lodash');
const file = fs.readFileSync('paths.txt').toString();
const paths = file.split("\n");
const sampled = _.sampleSize(paths, 1000);

sampled.forEach(src => {
  const dest = `./sample1000/${path.basename(src)}`;
  fs.copyFileSync(`./${src}`, dest);
});
console.log('Done.');
