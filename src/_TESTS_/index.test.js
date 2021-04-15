const puppeteer = require("puppeteer");

// https://github.com/mattphillips/jest-expect-message
// https://www.npmjs.com/package/jest-cucumber
var page = global.page;

describe("Tests", () => {
  test("Find button", async () => {
    // Верхняя кнопка закрытия работает как часы, в то же время нижняя - как плохие часы.
    const SKIP_AD_BUTTON = ".btn-closeWelcome";

    const waitForBtn = async () =>
      await page.waitForSelector(SKIP_AD_BUTTON, {
        visible: true,
      });

    const pressCloseBtn = async () => await page.click(SKIP_AD_BUTTON);

    await expect(waitForBtn()).resolves.not.toThrow();
    await expect(pressCloseBtn()).resolves.not.toThrow();
  }, 10000);

  test("Usage method menu", async () => {
    const SELECTED_USAGE = 2;
    const USAGE_BUTTON = `//div[@class='usageItem__itemWrap___A_xb9'][${SELECTED_USAGE}]`;

    const clickUsageBtn = async () => {
      const usageDiv = await page.$x(USAGE_BUTTON);
      await usageDiv[0].click();
    };

    await expect(clickUsageBtn()).resolves.not.toThrow();
  }, 10000);

  test("Prescriprion Menu", async () => {
    var Selectrors = {
      SphereRight: 1,
      SphereLeft: 4,
      CylinderRight: 2,
      CylinderLeft: 5,
      AxisRight: 3,
      AxisRight: 6,
      PD: 7,
    };
    const GetSelector = (selectNum) =>
      `(//div[@class='prescriptionSelect__wrapSelect___2S1cx']/select)[${selectNum}]`;

    const SelectOption = async (selectorNum, option) => {
      const selector = (await page.$x(GetSelector(selectorNum)))[0];
      await page.evaluate(
        (selector, option) => {
          if (typeof option == "string" || option instanceof String) {
            return (selector.value = option);
          } else {
            return (selector[option].selected = true);
          }
        },
        selector,
        option
      );
    };

    await SelectOption(Selectrors.SphereRight, 10);
    await SelectOption(Selectrors.SphereLeft, 10);
    await SelectOption(Selectrors.CylinderRight, 10);
    await SelectOption(Selectrors.CylinderLeft, 10);
    //await SphereRightSel.select()
    //await page.select(GetSelector(Selectrors.SphereLeft), "-6.00");
  });
});
