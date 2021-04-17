const Values = {
  Twenty: 1,
  Thirty: 2,
  Fifty: 3,
  SeventyFive: 4,
  EightyFive: 5,
};
const SLIDER_BREAKPOINTS_CLASS = "customizationInputRange__range___3tbdV";
const SLIDER_POINT_CLASS = "customizationInputRange__slider___1_FsC";

const GetXPath = (darkness) =>
  `//button[contains(@class, '${SLIDER_BREAKPOINTS_CLASS}')][${darkness}]`;

const Set = async (darkness) => {
  //ahahahahahahaahhahahahahaha
  const sliderBreakpoint = (await page.$x(GetXPath(darkness)))[0];
  const sliderPoint = (
    await page.$x(`//div[@class='${SLIDER_POINT_CLASS}']`)
  )[0];

  await sliderBreakpoint.hover();
  await sliderPoint.hover();

  const sliderCurrentPosition = await sliderPoint.boundingBox();
  const sliderBreakpointPosition = await sliderBreakpoint.boundingBox();

  await page.mouse.move(
    sliderCurrentPosition.x + sliderCurrentPosition.width / 2,
    sliderCurrentPosition.y + sliderCurrentPosition.height / 2
  );
  await page.mouse.down();

  await page.mouse.move(
    sliderBreakpointPosition.x + sliderBreakpointPosition.width / 2,
    sliderBreakpointPosition.y + sliderBreakpointPosition.height / 2
  );
  await page.mouse.up();
};

module.exports = { Values, GetXPath, Set };
