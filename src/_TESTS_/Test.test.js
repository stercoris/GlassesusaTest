const Helper = require("../Helpers.js");
const UsageMenu = require("./Components/UsageMethodMenu.js");
const PackageMenu = require("./Components/PackageMenu.js");
const PrescriptionTypeMenu = require("./Components/Prescription/PrescriptionTypeMenu.js");
const LensTypesMenu = require("./Components/LensTypes/LensTypesMenu");
const SelectorMenu = require("./Components/Prescription/SelectorsMenu.js");
const CustomizationMenu = require("./Components/LensTypes/CustomizationMenu.js");
const CustomizationSliderController = require("./Components/LensTypes/CustomizationSliderController.js");

const page = global.page;

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
      UsageMenu.Set(UsageMenu.Values.SingleVision)
    ).resolves.not.toThrow();
  });

  test("Set Options In Prescription Menu And Close Dialogue Boxes", async () => {
    //Sphere
    await Helper.SelectOption(
      SelectorMenu.GetXPath(SelectorMenu.Values.SphereRight),
      "-13.50"
    );
    await Helper.SelectOption(
      SelectorMenu.GetXPath(SelectorMenu.Values.SphereLeft),
      "-13.50"
    );
    await expect(SelectorMenu.CloseDialogueBox()).rejects.toThrow();

    //Cylinder
    await Helper.SelectOption(
      SelectorMenu.GetXPath(SelectorMenu.Values.CylinderRight),
      10
    );
    await Helper.SelectOption(
      SelectorMenu.GetXPath(SelectorMenu.Values.CylinderLeft),
      10
    );
    await expect(SelectorMenu.CloseDialogueBox()).resolves.not.toThrow();

    //Axis
    await Helper.SelectOption(
      SelectorMenu.GetXPath(SelectorMenu.Values.CylinderRight),
      10
    );
    await Helper.SelectOption(
      SelectorMenu.GetXPath(SelectorMenu.Values.CylinderLeft),
      10
    );
    await expect(SelectorMenu.CloseDialogueBox()).resolves.not.toThrow();

    // Примерно на этой строчке я перечитал задание
  });

  test("Try To Change Lens Package", async () => {
    await expect(PackageMenu.Set(PackageMenu.Values.Basic)).rejects.toThrow();

    await expect(
      PackageMenu.Set(PackageMenu.Values.LiteAndThin)
    ).rejects.toThrow();

    await expect(
      PackageMenu.Set(PackageMenu.Values.SuperThin)
    ).resolves.not.toThrow();
  });

  test("Change Prescription Menu", async () => {
    await PrescriptionTypeMenu.Set(
      PrescriptionTypeMenu.Values.UploadOrSendLater
    );
  });

  test("Change Lens Package", async () => {
    await expect(
      PackageMenu.Set(PackageMenu.Values.Basic)
    ).resolves.not.toThrow();

    await expect(
      PackageMenu.Set(PackageMenu.Values.SuperThin)
    ).resolves.not.toThrow();

    await expect(
      PackageMenu.Set(PackageMenu.Values.LiteAndThin)
    ).resolves.not.toThrow();
  });

  test("Change Lens Color", async () => {
    await expect(
      LensTypesMenu.Set(LensTypesMenu.Values.Mirrored.Silver)
    ).resolves.not.toThrow();

    await expect(
      LensTypesMenu.Set(LensTypesMenu.Values.Polorized.Gray)
    ).resolves.not.toThrow();

    await expect(
      CustomizationSliderController.Set(
        CustomizationSliderController.Values.EightyFive
      )
    ).rejects.toThrow();

    await expect(
      LensTypesMenu.Set(LensTypesMenu.Values.Colorized.Yellow)
    ).resolves.not.toThrow();
  });

  test("Chage Lens Customization", async () => {
    await expect(
      CustomizationMenu.Set(CustomizationMenu.Values.Gradient)
    ).resolves.not.toThrow();
    await expect(
      CustomizationMenu.Set(CustomizationMenu.Values.PersonilizedDarness)
    ).resolves.not.toThrow();

    await expect(
      CustomizationSliderController.Set(
        CustomizationSliderController.Values.EightyFive
      )
    ).resolves.not.toThrow();
  });

  test("Add To Card", async () => {
    const buyButton = (
      await page.$x(`//button[contains(@class, 'sc-bdVaJa eRfYNN')]`)
    )[0];

    expect(buyButton.click()).resolves.not.toThrow();

    await page.waitForNavigation({ waitUntil: "networkidle2" });
  });
});
