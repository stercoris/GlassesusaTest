const Helper = require("../Helpers.js");
const UsageMenu = require("./Components/UsageMethodMenu.js");
const PackageMenu = require("./Components/PackageMenu.js");
const PrescriptionTypeMenu = require("./Components/Prescription/PrescriptionTypeMenu.js");
const LensTypesMenu = require("./Components/LensTypes/LensTypesMenu");
const {
  GetSelectXPath,
  Selectors,
  CloseDialogueBox,
} = require("./Components/Prescription/SelectorsMenu.js");

var page = global.page;

describe("Tests", () => {
  test("Close AD", async () => {
    // Верхняя кнопка закрытия работает как часы, в то же время нижняя - как плохие часы.
    const SKIP_AD_BUTTON = ".btn-closeWelcome";

    const waitForBtn = async () =>
      await page.waitForSelector(SKIP_AD_BUTTON, {
        visible: true,
      });

    const pressCloseBtn = async () => await page.click(SKIP_AD_BUTTON);

    await expect(waitForBtn()).resolves.not.toThrow();
    await expect(pressCloseBtn()).resolves.not.toThrow();
  });

  test("Set Usage To Single Vision", async () => {
    await expect(
      UsageMenu.ClickUsageBtn(UsageMenu.Usages.SingleVision)
    ).resolves.not.toThrow();
  });

  test("Set Options In Prescription Menu And Close Dialogue Boxes", async () => {
    //Sphere
    await Helper.SelectOption(GetSelectXPath(Selectors.SphereRight), "-13.50");
    await Helper.SelectOption(GetSelectXPath(Selectors.SphereLeft), "-13.50");
    await expect(CloseDialogueBox()).rejects.toThrow();

    //Cylinder
    await Helper.SelectOption(GetSelectXPath(Selectors.CylinderRight), 10);
    await Helper.SelectOption(GetSelectXPath(Selectors.CylinderLeft), 10);
    await expect(CloseDialogueBox()).resolves.not.toThrow();

    //Axis
    await Helper.SelectOption(GetSelectXPath(Selectors.CylinderRight), 10);
    await Helper.SelectOption(GetSelectXPath(Selectors.CylinderLeft), 10);
    await expect(CloseDialogueBox()).resolves.not.toThrow();

    // Примерно на этой строчке я перечитал задание
  });

  test("Try To Change Lens Package", async () => {
    await expect(
      PackageMenu.SelectPackage(PackageMenu.PackageOptions.Basic)
    ).rejects.toThrow();

    await expect(
      PackageMenu.SelectPackage(PackageMenu.PackageOptions.LiteAndThin)
    ).rejects.toThrow();

    await expect(
      PackageMenu.SelectPackage(PackageMenu.PackageOptions.SuperThin)
    ).resolves.not.toThrow();
  });

  test("Change Prescription Menu", async () => {
    await PrescriptionTypeMenu.ClickPrescriptionBtn(
      PrescriptionTypeMenu.PrescriptionTypes.UploadOrSendLater
    );
  });

  test("Change Lens Package", async () => {
    await expect(
      PackageMenu.SelectPackage(PackageMenu.PackageOptions.Basic)
    ).resolves.not.toThrow();

    await expect(
      PackageMenu.SelectPackage(PackageMenu.PackageOptions.SuperThin)
    ).resolves.not.toThrow();

    await expect(
      PackageMenu.SelectPackage(PackageMenu.PackageOptions.LiteAndThin)
    ).resolves.not.toThrow();
  });

  test("Change Lens Color", async () => {
    await LensTypesMenu.PressColorButton(
      LensTypesMenu.LensTypes.Mirrored.Silver
    );
    await LensTypesMenu.PressColorButton(
      LensTypesMenu.LensTypes.Polorized.Gray
    );
    await LensTypesMenu.PressColorButton(
      LensTypesMenu.LensTypes.Colorized.Yellow
    );
  });
});
