const os = require("os");
const path = require("path");
const rimraf = require("rimraf");
const Config = require("./Config");

const DIR = path.join(Config.DIR, "jest_puppeteer_global_setup");
module.exports = async function () {
  // close the browser instance
  await global.browser.close();
  // clean-up the wsEndpoint file
  rimraf.sync(DIR);
};
