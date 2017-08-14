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

// create cookies.json file if it does not exist
if(!fs.existsSync(cookiepath)){
    fs.closeSync(fs.openSync(cookiepath, 'w'));
}

var jar = request.jar(new FileCookieStore(cookiepath));
request = request.defaults({ jar : jar });

program
  .arguments('<url>')
  .option('-m, --method', 'HTTP method use for the request', /^(GET|POST|PUT)$/i, 'GET')
  .option('-u, --username', 'The user to authenticate as')
  .option('-p, --password', 'The user\'s password')
  .option('-b, --body', 'The body of a POST request')
  .option('-c, --content-type', 'The content-type header value for a POST request')
  .action(function(url) {
      if (program.username && program.password) {
        headers['Authorization'] = 'Basic ' + new Buffer(`${program.username}:${program.password}`).toString('base64')
      }
      var options = {
          url : url,
          method: program.method,
          headers: headers,
          strictSSL: false,
        }
      if (program.method === "POST") {
        options['body'] = program.body;
      }
      request(options, function(error, response, body) {
          if (error) {
            console.log(chalk.red(error));
            process.exit(1);
          } else {
            if (response.headers['content-type'].startsWith('application/json')) {
              json_colorz(JSON.parse(body));
            } else {
              console.log(body);
            }
          }
        }
      );
  })
  .parse(process.argv);