const $ = require("cheerio");
// PDF样式
const baseOpt = {
  css: "@page { size: 8.2in 14.5in } html { font-size: 18pt }"
};

// 阮一峰JS教程
const javaScriptCourse = {
  url: "https://wangdoc.com/javascript", // 要爬取的网站地址
  name: "阮一峰JavaScript教程.pdf", // 导出的文件名字
  wrapEle: ".menu-list", //  导航父元素的class
  css: "@page { size: A6 landscape } html { font-size: 18pt } ", // 生成pdf的大小和字体
  getUrlList(body, ele, url) {
    // 从返回的html中获取章节地址
    let urlList = [];
    $(body)
      .find(ele)
      .eq(0)
      .find("li a")
      .each((i, v) => {
        const pathStr = $(v).attr("href");
        const path = pathStr.slice(pathStr.indexOf("/"));
        urlList.push(url + path);
      });
    return urlList;
  }
};

// 阮一峰ES6教程
const es6Course = {
  url: "http://es6.ruanyifeng.com/",
  pageApi: "http://es6.ruanyifeng.com/sidebar.md",
  name: "阮一峰ECMAScript6入门",
  wrapEle: "#sidebar ol",
  getUrlList(body, ele, url) {
    const reg = /(?<=\]\(#)\S+(?=\))/g;
    const urlList = body
      .match(reg)
      .filter(v => {
        return !v.includes("http");
      })
      .map(v => {
        const urlPath = url + v + ".md";
        return urlPath;
      });
    return urlList;
  }
};
module.exports = {
  javaScriptCourse,
  es6Course,
  baseOpt
};
