const fs = require("fs");
const os = require("os");
const path = require("path");
const puppeteer = require("puppeteer");
const NodeEnvironment = require("jest-environment-node");
const Config = require("./Config");

const DIR = path.join(Config.DIR, "jest_puppeteer_global_setup");

class PuppeteerEnvironment extends NodeEnvironment {
  constructor(config) {
    super(config);
  }

  async setup() {
    await super.setup();
    // get the wsEndpoint
    const wsEndpoint = fs.readFileSync(path.join(DIR, "wsEndpoint"), "utf8");
    if (!wsEndpoint) {
      throw new Error("wsEndpoint not found");
    }

    // connect to puppeteer
    this.global.browser = await puppeteer.connect({
      browserWSEndpoint: wsEndpoint,
    });

    const page = await this.global.browser.newPage();
    await page._client.send("Emulation.clearDeviceMetricsOverride");
    await page.goto(Config.ENDPOINT_URL);

    this.global.page = page;
  }

  async teardown() {
    await this.global.page.screenshot({ path: "final.png", fullPage: true });
    await super.teardown();
  }

  runScript(script) {
    return super.runScript(script);
  }
}

module.exports = PuppeteerEnvironment;
