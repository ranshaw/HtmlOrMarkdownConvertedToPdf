const request = require("./util"),
  percollate = require("percollate"),
  markdownpdf = require("markdown-pdf"),
  puppeteer = require("puppeteer"),
  merge = require("easy-pdf-merge"),
  fs = require("fs"),
  {
    javaScriptCourse,
    es6Course,
    baseOpt,
    fe9ReactCourse,
    reactJsBook
  } = require("./config");

const getHtml = url => {
  return request.parseBody(url);
};
const getJSCourse = () => {
  const { url, name, wrapEle, getUrlList, css } = javaScriptCourse;

  getHtml(url).then(res => {
    const urlList = getUrlList(res, wrapEle, url);
    urlList.length = 5;
    percollate.configure();
    percollate.pdf(urlList, {
      output: name,
      css
    });
  });
};

const getEs6Course = () => {
  const { url, name, wrapEle, getUrlList, pageApi } = es6Course;

  getHtml(pageApi).then(res => {
    const urlList = getUrlList(res, wrapEle, url);

    // 生成的pdf文件中包含markdown代码
    // percollate.configure();
    // percollate.pdf(urlList, {
    //   output: name,
    //   css: baseOpt.css,
    //   sandbox: true
    // });

    const reqList = [];
    urlList.forEach(v => {
      console.log("请求地址---", v);
      reqList.push(getHtml(v));
    });
    console.log("开始发出请求...");

    Promise.all(reqList)
      .then(arrRes => {
        console.log("所有请求都成功了---");
        const md = arrRes.join(" ");
        // console.log(md);
        const optPath =
          "/Users/apple/Documents/my/LearningLog/NodeJs/网页生成pdf/";

        fs.writeFileSync(`${name}.md`, md, function(err) {
          if (err) {
            return console.error(err);
          }
          console.log("数据写入成功！");
        });
        console.log("开始生成pdf文件...");
        markdownpdf({
          paperFormat: "A6"
          // paperOrientation: "landscape"
        })
          .from(`${optPath}${name}.md`)
          .to(`${optPath}${name}.pdf`, function() {
            console.log("生成pdf文件成功");
          });
      })
      .catch(err => {
        console.log("请求报错---", err);
      });
  });
};

const getFe9ReactCourse = () => {
  const { url, name, wrapEle, getUrlList, css, usePup } = fe9ReactCourse;
  getHtml(url).then(res => {
    const urlList = getUrlList(res, wrapEle, url);
    // console.log("urlList", urlList);
    percollate.configure();
    percollate.pdf(urlList, {
      output: name,
      css,
      usePup
    });
  });
};

const getReactJsBook = () => {
  const { url, name, getUrlList, css,   } = reactJsBook;
  const urlList = getUrlList(url);
    percollate.configure();
    percollate.pdf(urlList, {
      output: name,
      css,
      toc: true
    });
}

const getPdf = {
  0:getJSCourse,       // 阮一峰JS教程
  1:getEs6Course,      // 阮一峰ES6教程
  2:getFe9ReactCourse, // 九部知识库精选集-react
  3:getReactJsBook,    // ReactJs小书
}

// 获取pdf
getPdf[3]()
 
