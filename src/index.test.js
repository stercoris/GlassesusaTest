import puppeteer from "puppeteer";

const URL =
  "https://www.glassesusa.com/shiny-blackblue-extra-large/oakley-oo9102-holbrook/46-000638.html";

var browser;
var page;

beforeAll(async (done) => {
  browser = await puppeteer.launch({ headless: false });
  page = await browser.newPage();
  await page.goto(URL);
  done();
}, 30000);

afterAll(async (done) => {
  await page.screenshot({ path: "example.png", fullPage: true });
  await browser.close();
  done();
});

describe("Tests", () => {
  test("Find button", async (done) => {
    const SKIP_AD_BUTTON = ".dyWelcomePopup__noThanks";
    const waitForButton = page.waitForSelector(SKIP_AD_BUTTON, {
      hidden: false,
      timeout: 10000,
    });

    await expect(waitForButton).resolves.not.toThrow();
    expect(() => page.click(SKIP_AD_BUTTON)).not.toThrow();
    done();
  }, 30000);

  test("Usage method", async (done) => {
    const USAGE_BUTTON =
      "//div[@class='usageItem__item___2MdX6 usageItem__active___26lZz usages__expProgItem___24grw']";

    const waitForButton = page.waitForXPath(USAGE_BUTTON, {
      timeout: 18000,
    });

    await expect(waitForButton).resolves.not.toThrow();

    expect(() => page.click(USAGE_BUTTON)).not.toThrow();
    done();
  }, 30000);

  test("Lens package", async (done) => {
    done();
  });
});
