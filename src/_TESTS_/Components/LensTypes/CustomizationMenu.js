const Values = {
  Basic: 1,
  Gradient: 2,
  PersonilizedDarness: 3,
};

const CUSTOMIZATION_CONTAINER_CLASS = "lens-colors-container";

const CUSTOMIZATION_RADIOS_CLASS = "radiobutton__radiobutton___3osmA";
const ACTIVE_CUSTOMIZATION_RADIOS_CLASS = "radiobutton__active___1Qu_n";

const GetXPath = (option) =>
  `(//div[contains(@class, '${CUSTOMIZATION_CONTAINER_CLASS}')]//div[contains(@class,'${CUSTOMIZATION_RADIOS_CLASS}')])[${option}]`;

const Set = async (option) => {
  const radioButton = (await page.$x(GetXPath(option)))[0];
  await radioButton.click();
  const className = await page.evaluate(
    (domEl) => domEl.className,
    radioButton
  );

  if (!className.includes(ACTIVE_CUSTOMIZATION_RADIOS_CLASS)) {
    throw new Error("Radio button is not activated!");
  }
};

module.exports = { Values, GetXPath, Set };
