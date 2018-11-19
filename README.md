### PDF文件
在项目目录pdfs下
* 阮一峰JavaScript教程
* 阮一峰ES6教程
* 九部知识库之ReactJS精选文章
* ReactJs小书

### 添加方法
更改index.js中的cleanup方法，将
```
const content = (await got(encodeURI(decodeURI(url)), {
				 
			})).body;
```
改为
```
let content
		if(options.usePup) {
			const browser = await pup.launch();
			const page = await browser.newPage();
			await page.goto(url, { waitUntil: "networkidle0" });
		
			content = await page.content().then(v => {
				return v
			}).catch((err) => {
				spinner.fail('获取页面内容失败！')
			});
			await browser.close();
		} else {
			content = (await got(encodeURI(decodeURI(url)), {
				 
			})).body;
		}
```
如果网页内容是动态生成的，设置usePup为true即可
### 依赖模块

- [cheerio](https://www.npmjs.com/package/cheerio)
  > cheerio 是 nodejs 的抓取页面模块，为服务器特别定制的，快速、灵活、实施的 jQuery 核心实现。适合各种 Web 爬虫程序
- [request](https://www.npmjs.com/package/request)
  > Request 是 Node.js 中的一个模块，目标是用最可能简单的方式，在 Node.js 发起 HTTP 请求。此外也支持最新的 HTTPS 协议
- [percollate](https://github.com/danburzo/percollate)
  > 一个通过网址将网页转成 PDF 的命令行工具，NodeJS 版本要大于 8.6.0，如果出现安装失败，请翻墙后再安装
- [markdown-pdf](https://www.npmjs.com/package/markdown-pdf)
  > 将 markdown 文件转成 PDF 文件

### 命令行导出 PDF 文件

`percollate`是一位外国友人做的一个命令行工具，是对`puppeteer`做了一层封装，暴露出常用的 API, 我们来看下文档中的例子

一个页面

> `percollate pdf --output some.pdf https://example.com`

多个页面

> `percollate pdf --output some.pdf https://example.com/page1 https://example.com/page2`

操作很简单是不是，哇哦，我们是不是可以美滋滋的将自己喜欢的文章转成 PDF 在手机或者电脑上看了，嗯，没错是的，不过这也就能玩个文章，如果想拿下整个网站的所有文章就心有余而力不足了，比如下面的这个

![](https://user-gold-cdn.xitu.io/2018/11/13/1670be92cf983fb6?w=1084&h=740&f=png&s=117870)
当然，不排除有些比较有毅力的同学，把所有 url 都拿到，然后拼到命令行中，就像我曾经在工作中见过某同事在项目做完后，一行一行的去删 console.log()，为的是线上版本的控制台不出现打印的信息，得说下我们使用 webpack 打包的，这在打包的时候添加一个配置就能解决的问题，我们干嘛要费那老鼻子的劲，拒绝假努力，我们来点有效率的。

### NodeJs 爬虫将整个网站生成 PDF 文件

首先我们来瞅一眼阮大神的 Javascript 教程的网站，地址为 https://wangdoc.com/javascript/basic/introduction.html, 我们能看到网页右边为所有章节的导航，打开 Chrome 开发者工具，我们能看到
![](https://user-gold-cdn.xitu.io/2018/11/11/16701b5c7895393d?w=2804&h=1066&f=png&s=448585)
红框圈出的地方即为每个章节对应的地址，到此，你应该能想到接下里我们要干什么了吧，就是通过爬虫拿到所有的章节地址，文章中的地址为相对路径，我们再拼上域名，就成了可以访问的地址了,至于怎么去抓取所有的文章地址，在这里略去，比较简单，相信你看一眼就能懂，源码在下面哟。

那么我们想在 NodeJs 中使用`percollate`，该如何操作呢？前面已经说了`percollate`是个命令行工具，文档上并没有告诉我们怎么在 Node 环境中怎么调用，难道我们要放弃，直接用 puppeteer 或者 phantomjs 去撸吗？怎么可能？秉着你是 NodeJs 的包，肯定能在 NodeJs 环境跑的宗旨，我把 percollate 打印出来瞅瞅
![](https://user-gold-cdn.xitu.io/2018/11/11/167031fa7658837d?w=1252&h=208&f=png&s=179800)
哟，percollate 对象下有一个 pdf 的方法，这不就是我们想要的吗？来一起去瞅瞅源码，看看这个方法要怎么使用，找到项目下面的 index.js 文件，别问我为什么要看这个文件，程序员都知道的

![](https://user-gold-cdn.xitu.io/2018/11/11/1670325b6c358579?w=1632&h=1174&f=png&s=228849)
我们在页面搜索 pdf，最终能找到

![](https://user-gold-cdn.xitu.io/2018/11/11/167032719eb25733?w=1892&h=1300&f=png&s=256874)
当然我们也可以通过打印 percollate.pdf 查看函数的内容

![](https://user-gold-cdn.xitu.io/2018/11/11/1670328515438b40?w=932&h=544&f=png&s=338550)
ok,我们现在知道 pdf 方法接收两个参数，一个是 urls，一个是 options，通过名字基本就能推测出这两个参数的内容，urls 为要转成 pdf 的网址的数组，options 是对转成的 pdf 文件的一些配置，事实确如我们所料，现在我们可以愉快的生成 pdf 文件了，美滋滋！实际上你执行之后得到的 pdf 文件是这个样子的

![](https://user-gold-cdn.xitu.io/2018/11/11/1670331703440f6f?w=1846&h=1170&f=png&s=787690)
what？为什么是 html?出现这种情况我的第一反应是需要添加某些配置，但文档都是关于命令行操作的，又没有相关的解释，我了个擦，咋办？还能咋办，看源码和 Issues， 以我五级的英语水平在 Issues 中发现这样一个标题

![](https://user-gold-cdn.xitu.io/2018/11/13/1670c275256a64a4?w=984&h=83&f=png&s=17414)
这位老哥想在浏览器中用 percollate，哟，老哥可以呀，我 Node 里面还没跑起来，你就想在浏览器中跑了，点进来看看，竟然真有所发现

![](https://user-gold-cdn.xitu.io/2018/11/13/1670c2bd43781de2?w=928&h=434&f=png&s=99460)
他把上面那位老哥想做的事给做出来了，起一个服务，然后通过 web api 去生成 PDF 文件，来看看源码，然后我找到下面一段代码

![](https://user-gold-cdn.xitu.io/2018/11/13/1670c34f0b43d4a9?w=918&h=353&f=png&s=51899)
原来我们是少执行了一个 percollate.configure 的方法，加上之后，执行一波

![](https://user-gold-cdn.xitu.io/2018/11/13/1670c390c3563589?w=1896&h=1336&f=png&s=794312)

这下真的美滋滋了,当然这样生成的 PDF 文件使用的是默认配置，如果你想生成适配你手机或者阅读器的 PDF 文件，就需要添加你的自定义配置了，

```
 percollate.pdf(urlList, {
      output: "阮一峰JavaScript教程.pdf",
      css: "@page { size: A6 landscape } html { font-size: 18pt } "
    });
```

关于 css 属性的文档，[点击查看](https://www.w3.org/TR/css-page-3/#page-size)。

### 完整代码

新建一个 util.js，增加一个用于发送请求的方法：

```
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

module.exports = {
  parseBody
};
```

新建 config 文件，添加配置

```
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
```

新建 index.js 为项目的入口文件，引入相关依赖

```
const request = require("./util"),
  percollate = require("percollate"),
  markdownpdf = require("markdown-pdf"),
  fs = require("fs"),
  { javaScriptCourse, es6Course, baseOpt } = require("./config");

const getHtml = url => {
  return request.parseBody(url);
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

// 生成pdf文件
getJSCourse()
```

以上是全部代码，总共不超过 80 行，执行之后，我们能看到终端打印的日志

![](https://user-gold-cdn.xitu.io/2018/11/11/167030a024651e48?w=1252&h=660&f=png&s=415321)
成功之后，在项目的目录下就能看到生成的 pdf 文件
![](https://user-gold-cdn.xitu.io/2018/11/11/167030cf622ea194?w=634&h=540&f=png&s=46579)

### 将 Markdown 文件生成 PDF

这个以阮一峰大神 ES6 教程为例，地址为：http://es6.ruanyifeng.com ，打开网站后，我们发现，网站是通过接口动态生成内容的，网站请求返回的内容都为 Markdown，

![](https://user-gold-cdn.xitu.io/2018/11/13/1670c53a199e2523?w=696&h=538&f=png&s=184250)
我们略过抓取文章地址的过程，详情可在文章附上的源码中查看，执行的转化代码为

```
percollate.configure();
    percollate.pdf(urlList, {
      output: name,
      css: baseOpt.css,
      sandbox: true // 设置为false,动态生成的内容抓取不到
    });
```

生成的 PDF 文件如下，没有转成我们希望的样子，内容为原始的 Markdown 语法

![](https://user-gold-cdn.xitu.io/2018/11/13/1670c71c0d87fb88?w=2500&h=1136&f=png&s=1020705)
到此，我没有再研究`percollate`添加某个配置之后，是否就可以完美的将 Markdown 转成 PDF 文件，因为我知道 Node 有一个包 markdown-pdf 可以将 Markdown 转成 PDF 文件，还知道 VScode 有一个插件也可以将 Markdown 转成 PDF 文件，这样的话，我们首先要生成一个包含所有内容的 Markdown 文件，Node 的 fs 模块可以很容易的完成这件事情，生成 Markdown 文件以后，再使用上面讲述的两种方法将 Markdown 转成 PDF 即可，代码如下

```
 const urlList = getUrlList(res, wrapEle, url);

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
```

关于使用 VScode 将 Markdown 文件转为 PDF 的方法，我这里就不赘述了，参考[markdown-preview-enhanced](https://shd101wyy.github.io/markdown-preview-enhanced/#/zh-cn/phantomjs) 。

 
