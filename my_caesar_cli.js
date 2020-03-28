const fs = require('fs');
const util = require('util');
const path = require('path');
const parseArgs = require('minimist');
const stream = require('stream');
const { CoderStream } = require('./CoderStream');

const pipeline = util.promisify(stream.pipeline);

const ALIASES = {
    a: 'action',
    s: 'shift',
    i: 'input',
    o: 'output',
};

const cliArgs = parseArgs(process.argv.slice(2), { alias: ALIASES });

const { action, shift, input, output } = cliArgs;

const inputTarget = input && path.resolve(__dirname, input);
const outputTarget = output && path.resolve(__dirname, output);

const readStream = inputTarget ? fs.createReadStream(inputTarget, { encoding: 'utf8' }) : process.stdin;
const writeStream = outputTarget ? fs.createWriteStream(outputTarget) : process.stdout;
const coderStream = new CoderStream(action, shift);

pipeline(readStream, coderStream, writeStream).then(
    () => console.log('The pipeline has ended'),
    error => console.error('Sorry, something went wrong...')
);
