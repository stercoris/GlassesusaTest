const fs = require("fs");
const os = require("os");
const path = require("path");
const mkdirp = require("mkdirp");
const puppeteer = require("puppeteer");
const Config = require("./Config");

const DIR = path.join(Config.DIR, "jest_puppeteer_global_setup");

module.exports = async function () {
  const browser = await puppeteer.launch({ headless: Config.HEADLESS });

  // store the browser instance so we can teardown it later
  // this global is only available in the teardown but not in TestEnvironments
  global.browser = browser;
  // use the file system to expose the wsEndpoint for TestEnvironments
  mkdirp.sync(DIR);
  fs.writeFileSync(path.join(DIR, "wsEndpoint"), browser.wsEndpoint());
};
