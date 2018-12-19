const utils = require("./util"),
  percollate = require("percollate"),
  markdownpdf = require("markdown-pdf"),
  schedule = require('node-schedule'),
  fs = require("fs"),
  {
    javaScriptCourse,
    es6Course,
    baseOpt,
    fe9ReactCourse,
    reactJsBook,
    typeScriptCourse,
    nodeJsCourse,
    interviewReview,
    computerGeneral,
    layoutExample,
    liaoXueFengJs,
    frontEndForward,
    manyBooks
  } = require("./config");
  const request = require("request")

const getHtml = (url,usePup) => {
  if(usePup) {
    return utils.parseBodyPup(url)
  }
  return utils.parseBody(url);
};
const getJSCourse = () => {
  const { url, name, wrapEle, getUrlList, css } = javaScriptCourse;

  getHtml(url).then(res => {
    const urlList = getUrlList(res, wrapEle, url);
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

const getTypeScriptCourse = () => {
  const { url, name, getUrlList, css,pageApi,usePup   } = typeScriptCourse;
  getHtml(pageApi).then(res => {
    const urlList = getUrlList(res, url);
    percollate.configure();
    percollate.pdf(urlList, {
      output: name,
      css,
      usePup
    });
  });
}

const getNodeJsCourse = () => {
  const { url, name, wrapEle, getUrlList, css,usePup,pageApi } = nodeJsCourse;

  getHtml(pageApi).then(res => {
    const urlList = getUrlList(res, wrapEle, url);
    percollate.configure();
    percollate.pdf(urlList, {
      output: name,
      css,
      usePup
    });
  });
}

const getJsReview = () => {
  const { url, name, wrapEle, getUrlList, css,usePup,pageApi } = interviewReview;

  getHtml(pageApi).then(res => {
    const urlList = getUrlList(res, wrapEle, url);
    percollate.configure();
    percollate.pdf(urlList, {
      output: name,
      css,
    });
  });
}

const getComputerGeneral = () => {
  const { url, name, wrapEle, getUrlList, css,usePup,pageApi } = computerGeneral;

  getHtml(pageApi).then(res => {
    const urlList = getUrlList(res, wrapEle, url);
    
    percollate.configure();
    percollate.pdf(urlList, {
      output: name,
      css,
    });
  });
}

const getLayoutExample = () => {
  const { url, name, css } = layoutExample;
  percollate.configure();
  percollate.pdf([url], {
    output: name,
    css,
  });
}

const getLiaoXueFengJs =  () => {
  const { url, name, wrapEle, getUrlList, css,usePup,pageApi } = liaoXueFengJs;

  getHtml(pageApi,true).then(res => {
    const urlList = getUrlList(res, wrapEle, url)
    console.log('urlList---',urlList.length)
    const arr = utils.toDoubleDimensionalArray(urlList,5)
    console.log('---',arr.length)

    let i = 0
    let rule = new schedule.RecurrenceRule()
    let unsavedFiles = []
    rule.minute = [15,30,45,59]
    const task = schedule.scheduleJob(rule, function(){
      i++
      console.log('i---',i)
      percollate.configure();
      percollate.pdf(arr[i-1], {
        output: (i-1) + name,
        css,
        usePup
      });
      if(i === arr.length) {
        i = 0
        // 获得未生成pdf文件的index值
        unsavedFiles = utils.getUnsavedIndex(arr.length)
        return
      }
      // 第一次生成失败的再次生成
      if(unsavedFiles.length) {
        percollate.configure();
        percollate.pdf(arr[unsavedFiles[i-1]], {
          output: (unsavedFiles[i-1]) + name,
          css,
          usePup
        });
      } else {
        utils.mergePdfs(arr.length,'廖雪峰JavaScript全栈教程.pdf')
        task.cancel()
      }
    });

  });
}

const getFrontEndForward = () => {

}

const getManyBooks = () => {
  const { url, wrapEle, getUrlList,  } = manyBooks;
  getHtml(url).then(res => {
    const {urlList,titleList} = getUrlList(res, wrapEle, url);
    console.log("urlList", urlList);
    fs.writeFile('./url.txt',JSON.stringify(urlList),(err) => {
      if(!err) {
        console.log('保存url成功！')
      }
    })
  });
}

const getPdf = {
  0:getJSCourse,          // 阮一峰JS教程
  1:getEs6Course,         // 阮一峰ES6教程
  2:getFe9ReactCourse,    // 九部知识库精选集-react
  3:getReactJsBook,       // ReactJs小书
  4:getTypeScriptCourse,  // TypeScript入门教程
  5:getNodeJsCourse,      // 七天学会NodeJs
  6:getJsReview,          // 前端JS面试知识点总结
  7:getComputerGeneral,   // 计算机通识
  8:getLayoutExample,     // 各种常见布局实现和案例分析
  9:getLiaoXueFengJs,     // 廖雪峰JavaScript全栈教程
  10:getFrontEndForward,  // 前端基础进阶--这波能反杀
  11:getManyBooks,        // 获取大量计算机PDF书籍
}

// 获取pdf
getPdf[11]()


