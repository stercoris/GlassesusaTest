var page = global.page;

const Usages = {
  NonPrescription: 1,
  SingleVision: 2,
  NearVision: 3,
  Progressive: 4,
  Bifocal: 5,
};

const USAGE_BUTTON_CLASS = "usageItem__itemWrap___A_xb9";

const GetUsageButton = (usage) =>
  `//div[@class='${USAGE_BUTTON_CLASS}'][${usage}]`;

const ClickUsageBtn = async (usage) => {
  const usageDiv = await page.$x(GetUsageButton(usage));
  await usageDiv[0].click();
};

module.exports = { Usages, ClickUsageBtn };
