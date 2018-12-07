const request = require("request")
const pup = require("puppeteer")
const merge = require("easy-pdf-merge")
const fs = require('fs')

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

const delay = async (time = 1000,count = 1) => {
  await new Promise(resolve => setTimeout(resolve,time*count))
}

const toDoubleDimensionalArray = (arr,count) => {
    const doubleDimensionalArray = []
    const num = Math.ceil(arr.length/count)
    for(let i = 0; i < num; i++) {
      doubleDimensionalArray.push(arr.slice(i*count,(i+1)*count))
    }
    return doubleDimensionalArray
}

const mergePdfs = (sum,name) => {
  const fileName = []
  let i = 0
  while(i < sum) {
    fileName.push(i + name)
    i++
  }
  console.log('将合并的文件列表---',fileName);
  merge(fileName, name ,function(err){

    if(err)
    return console.log(err);

    console.log('合并文件成功!---');

  });
}

const getUnsavedIndex = (count) => {
  let files = fs.readdirSync('./')
  const pdfFiles = files.filter((v) => {
    return v.includes('.pdf')
  }).map((v) => {
    return Number(v.match(/^\d{1,2}/)[0])
  })
  console.log('pdfFiles---',pdfFiles);
  const unsavedFiles = []
  for(let i = 0; i < count;i++) {
    if(!pdfFiles.includes(i)) {
      unsavedFiles.push(i)
    }
  }
  return unsavedFiles
}

module.exports = {
  parseBody,
  parseBodyPup,
  delay,
  toDoubleDimensionalArray,
  mergePdfs,
  getUnsavedIndex
};
