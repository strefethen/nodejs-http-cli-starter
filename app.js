#!/usr/bin/env node --harmony
const program = require('commander');
const json_colorz = require('json-colorz');
const chalk = require('chalk');
const FileCookieStore = require('tough-cookie-filestore');
const fs = require("fs");
var request = require('request');

var headers = {
  'Accept': 'application/json',
  'Content-Type': 'application/json',
}

var cookiepath = "cookies.json";

// create the json file if it does not exist
if(!fs.existsSync(cookiepath)){
    fs.closeSync(fs.openSync(cookiepath, 'w'));
}

// use the FileCookieStore with the request package
var jar = request.jar(new FileCookieStore(cookiepath));
request = request.defaults({ jar : jar });

program
  .arguments('<url>')
  .option('-m --method <method>', 'HTTP method', /^(GET|POST|PUT)$/i, 'GET')
  .option('-u, --username <username>', 'The user to authenticate as')
  .option('-p, --password <password>', 'The user\'s password')
  .action(function(url) {
      if (program.username && program.password) {
        headers['Authorization'] = 'Basic ' + new Buffer(`${program.username}:${program.password}`).toString('base64')
      }
      request(
        {
          url : url,
          method: program.method,
          headers: headers,
          strictSSL: false,
        }
        , function(error, response, body) {
          if (error) {
            console.log(chalk.red(error));
            process.exit(1);
          } else {
            json_colorz(JSON.parse(body));
          }
        }
      );
  })
  .parse(process.argv);