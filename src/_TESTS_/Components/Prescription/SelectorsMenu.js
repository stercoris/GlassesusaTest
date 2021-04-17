const Values = {
  SphereRight: 1,
  SphereLeft: 4,
  CylinderRight: 2,
  CylinderLeft: 5,
  AxisRight: 3,
  AxisRight: 6,
  PD: 7,
};

const SELECT_CLASS = "prescriptionSelect__wrapSelect___2S1cx";

const GetXPath = (selectNum) =>
  `(//div[@class='${SELECT_CLASS}']/select)[${selectNum}]`;

const CloseDialogueBox = async () => {
  const box = await page.waitForXPath("//button[@class='rc-dialog-close']", {
    visible: true,
    timeout: 1000,
  });
  await box.click();
};

module.exports = { Values, GetXPath, CloseDialogueBox };
