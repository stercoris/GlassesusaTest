const LensTypes = {
  Colorized: {
    Gray: 1,
    Brown: 2,
    Green: 3,
    Blue: 4,
    Yellow: 5,
    Red: 6,
    Pink: 7,
    Orange: 8,
    Purple: 9,
  },
  Polorized: {
    Gray: 10,
    Brown: 11,
  },
  Mirrored: {
    Red: 12,
    Blue: 13,
    Gold: 14,
    Green: 15,
    Silver: 16,
  },
};

const COLOR_BTN_CLASS = "lensColorsSlider__image___3RUxi";

const GetColorBtnXPath = (color) =>
  `(//div[contains(@class, '${COLOR_BTN_CLASS}')])[${color}]`;

const PressColorButton = async (color) => {
  const colorButton = (await page.$x(GetColorBtnXPath(color)))[0];
  await page.evaluate((domEl) => domEl.click(), colorButton);
};

module.exports = { LensTypes, GetColorBtnXPath, PressColorButton };
