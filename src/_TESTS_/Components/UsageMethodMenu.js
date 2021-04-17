const Values = {
  NonPrescription: 1,
  SingleVision: 2,
  NearVision: 3,
  Progressive: 4,
  Bifocal: 5,
};

const USAGE_BUTTON_CLASS = "usageItem__itemWrap___A_xb9";

const GetXPath = (usage) => `//div[@class='${USAGE_BUTTON_CLASS}'][${usage}]`;

const Set = async (usage) => {
  const usageDiv = await page.$x(GetXPath(usage));
  await usageDiv[0].click();
};

module.exports = { Values, GetXPath, Set };
