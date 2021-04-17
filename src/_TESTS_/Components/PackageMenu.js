const Values = {
  Basic: 1,
  LiteAndThin: 2,
  SuperThin: 3,
};

const RADIO_DIV_CLASS = "radiobutton__radiobutton___3osmA";
const ACTIVE_RADIO_DIV_CLASS = "radiobutton__active___1Qu_n";

const GetXPath = (option) =>
  `(//div[contains(@class, '${RADIO_DIV_CLASS}')])[${option}]`;

const Set = async (option) => {
  const radioPackages = (await page.$x(GetXPath(option)))[0];
  await radioPackages.click();
  const className = await page.evaluate(
    (domEl) => domEl.className,
    radioPackages
  );

  if (!className.includes(ACTIVE_RADIO_DIV_CLASS)) {
    throw new Error("Radio button is not activated!");
  }
};

module.exports = { Values, GetXPath, Set };
