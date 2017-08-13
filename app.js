#!/usr/bin/env node --harmony
const program = require('commander');
const request = require('request');
const json_colorz = require('json-colorz');
const chalk = require('chalk');

var headers = {
  'Accept': 'application/json',
  'Content-Type': 'application/json',
}

program
  .arguments('<url>')
  .option('-u, --username <username>', 'The user to authenticate as')
  .option('-p, --password <password>', 'The user\'s password')
  .action(function(url) {
      if (program.username && program.password) {
        headers['Authorization'] = 'Basic ' + new Buffer(`${program.user}:${program.password}`).toString('base64')
      }
      request(
        {
          url : url,
          method: 'GET',
          headers: headers,
          strictSSL: false,
          jar: true,
        }
        , function(error, response, body) {
          if (error) {
            console.log(chalk.red(error));
          } else {
            json_colorz(JSON.parse(body));
          }
        }
      )
  })
  .parse(process.argv);