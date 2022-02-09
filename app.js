#!/usr/bin/env node

'use strict';
const Parser = require('rss-parser');
const term = require('terminal-kit').terminal;
const { Command } = require('commander');

const program = new Command();
const parser = new Parser();

program.name('rssterm').description('Cli to rss utilities').version('1.0.0');

program.option('-u, --url <type>', 'Rss url', String);

program.parse(process.argv);

const options = program.opts();

async function rssReader(url) {
  let feed = await parser.parseURL(url);

  term.green.bold('\n' + feed.title + '\n');

  feed.items.forEach((item) => {
    term.brightYellow('\n' + item.title + ' : ');
    term.blue(item.link + '\n');
    term.grey(item.contentSnippet + '\n');
  });
}

// terminate
function terminate() {
  term.grabInput(false);
  setTimeout(function () {
    process.exit();
  }, 100);
}

term.on('key', function (name, matces, data) {
  if (name === 'CTRL_C') {
    terminate();
  }
});

rssReader(options.url);
