var page = global.page;

// https://github.com/JedWatson/react-select/issues/856#issuecomment-215458457
// https://stackoverflow.com/questions/59686300/how-to-get-text-from-xpath-in-puppeteer-node-js
async function GetTextByXPath(xPath) {
  const element = (await page.$x(xPath))[0];
  return await page.evaluate((domEl) => domEl.innerText, element);
}

// async function GetClassByXPath(xPath) {
//   const element = (await page.$x(xPath))[0];
//   await page.evaluate((domEl) => domEl.className, element);
// }

async function SelectOption(xPath, option) {
  await page.waitForXPath(xPath, {
    visible: true,
  });
  const select = (await page.$x(xPath))[0];

  if (typeof option == "string" || option instanceof String) {
    await select.select(option);
  } else {
    const optionText = await GetTextByXPath(xPath + `/option[${option}]`);
    await select.select(optionText);
  }
}

module.exports = { SelectOption };
