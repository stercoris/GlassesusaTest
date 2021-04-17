const Values = {
  FillItOutOnline: 1,
  UploadOrSendLater: 2,
  UseMySavedPrescription: 3,
};

const GetXPath = (type) =>
  `(//button[contains(@class, 'prescription__tab___3c_io')])[${type}]`;

const Set = async (type) => {
  const button = await page.$x(GetXPath(type));
  await button[0].click();
};

module.exports = {
  Values,
  GetXPath,
  Set,
};
