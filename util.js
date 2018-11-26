const request = require("request");
const pup = require("puppeteer")

const parseBody = (url) => {
  return new Promise((resolve, reject) => {
    request(url, (error, res, body) => {
      console.log(error)
      if (!error && res.statusCode === 200) {
        resolve(body);
      } else {
        reject("获取页面失败" + error);
      }
    });
  });
}

const parseBodyPup = async (url) => {
  const browser = await pup.launch();
  const page = await browser.newPage();
  await page.goto(url, { waitUntil: "networkidle0" });
  return new Promise((resolve,reject) => {
			page.content().then(v => {
         resolve(v)
         browser.close();
			}).catch((error) => {
        reject('获取页面内容失败！' + error)
        browser.close();
			});
  })
}

module.exports = {
  parseBody,
  parseBodyPup
};
