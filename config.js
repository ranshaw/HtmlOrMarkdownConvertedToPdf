const $ = require("cheerio");
// PDF样式
const baseOpt = {
  css: "@page { size: 8.2in 14.5in } html { font-size: 18pt }",  // 华为p10
  cssIReader: "@page { size: A6 landscape; margin: 14pt } html { font-size: 14pt } ", // iReader T6
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
// 九部知识库精选集-react
const fe9ReactCourse = {
  url: "https://www.yuque.com/fe9/select/",
  name: "九部知识库之ReactJs.pdf",
  wrapEle: ".typo-catalog-detail",
  css: baseOpt.cssIReader,
  usePup: true,
  getUrlList(body, ele, url) {
    let urlList = [];
    const reg = /(?<=decodeURIComponent\()\S+(?=\)\))/g;
    const dataStr = decodeURIComponent(body.match(reg)[0]);
    const data = dataStr.slice(1, dataStr.length - 1);
    const dataJson = JSON.parse(data);
    dataJson.book.toc.forEach((v, i) => {
      if (v.type === "DOC") {
        urlList.push(url + v.url);
      }
    });

    return urlList;
  }
};

// ReactJs小书
const reactJsBook = {
  url: "http://huziketang.mangojuice.top/books/react/lesson",
  name: "ReactJs小书.pdf",
  css: baseOpt.cssIReader,
  // usePup: true,
  getUrlList(url) {
    let urlList = [];
    for(let i = 1; i < 47;i++) {
      urlList.push(url+i)
    }
    return urlList;
  }
};
module.exports = {
  javaScriptCourse,
  es6Course,
  baseOpt,
  fe9ReactCourse,
  reactJsBook
};
