const request = require("request");

function parseBody(url) {
  return new Promise((resolve, reject) => {
    request(url, (error, res, body) => {
      if (!error && res.statusCode === 200) {
        resolve(body);
      } else {
        reject("获取页面失败" + error);
      }
    });
  });
}

const htmlToPdf = async pdfUrls => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  var pdfFiles = [];

  for (var i = 0; i < pdfUrls.length; i++) {
    await page.goto(pdfUrls[i], { waitUntil: "networkidle0" });

    var pdfFileName = "sample" + (i + 1) + ".pdf";
    pdfFiles.push(pdfFileName);
    await page.pdf({ path: pdfFileName, format: "A6" });
  }

  await browser.close();

  await _mergeMultiplePDF(pdfFiles);
};

const _mergeMultiplePDF = pdfFiles => {
  return new Promise((resolve, reject) => {
    merge(pdfFiles, "samplefinal.pdf", function(err) {
      if (err) {
        console.log(err);
        reject(err);
      }

      console.log("Success");
      resolve();
    });
  });
};

module.exports = {
  parseBody
};
