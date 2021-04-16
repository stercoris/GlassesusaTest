var page = global.page;

const PrescriptionTypes = {
  FillItOutOnline: 1,
  UploadOrSendLater: 2,
  UseMySavedPrescription: 3,
};

const GetPrescriptionButton = (type) =>
  `(//button[contains(@class, 'prescription__tab___3c_io')])[${type}]`;

const ClickPrescriptionBtn = async (type) => {
  const button = await page.$x(GetPrescriptionButton(type));
  await button[0].click();
};

module.exports = {
  PrescriptionTypes,
  GetPrescriptionButton,
  ClickPrescriptionBtn,
};
