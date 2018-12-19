### 项目介绍
本项目旨在收集和整理网络上优秀和免费的教程，将其转为PDF文件，以便在阅读器上阅读，项目中提供的PDF文件为A6大小，适合在IReader T6中阅读，如果不能适配你的阅读器，请Fork源代码，自行修改导出的参数。如果大家有优秀的课程想要分享，欢迎在Issues中提出，我会及时更新出PDF文件。

新增大量.mobi和.epub格式电子书，内容收集于网络，如有侵权，请联系我删除。
* :tada: 标记的为收集于网络
* :hammer: 标记的为自己生成
### PDF文件
本项目导出的PDF文件都放在百度网盘中，下面为分享的链接
> **链接:https://pan.baidu.com/s/1LykoDdRxJvd36ZJcTf709A  密码:f177**
#### JavaScript
:globe_with_meridians: 网盘位置：PDFS > JavaScript
* :hammer: 阮一峰JavaScript教程.pdf
* :hammer: 阮一峰ES6教程.pdf
* :hammer: TypeScript入门教程.pdf
* :hammer: 廖雪峰JavaScript教程.pdf
* :tada: 第三方JavaScript编程.epub
* :tada: 精通D3.js：交互式数据可视化高级编程.epub
* :tada: JavaScript框架设计.epub
* :tada: JavaScript高级程序设计（第3版） - 泽卡斯.mobi
* :tada: JavaScript语言精粹(修订版).epub
* :tada: 超实用的JavaScript代码段 (代码逆袭).epub
* :tada: JavaScript权威指南(原书第6版).mobi
* :tada: JavaScript设计模式与开发实践（图灵原创）.epub
* :tada: 超实用的jQuery代码段.epub
* :tada: JavaScript函数式编程
* :tada: 学习JavaScript数据结构与算法（第2版）.epub
* :tada: AngularJS实战 - 陶国荣 著.mobi
* :tada: 揭秘Angular 2.pdf

#### HTML5+CSS
:globe_with_meridians: 网盘位置：PDFS > H5+Css3
* :tada: HTML5与CSS3基础教程(第8版)(图灵程序设计丛书).epub
* :tada: H5+移动营销设计宝典.epub
* :tada: 现代前端技术解析.epub
* :tada: HTML5权威指南.pdf
* :tada: 《HTML5 canvas开发详解(第2版)》富尔顿 等（作者）epub
* :tada: 《CSS高效开发实战：CSS 3、LESS、SASS、Bootstrap、Foundation》谢郁（作者）mobi
* :tada: CSS设计指南 (第3版).epub
* :tada: HTML5实战.epub
* :tada: CSS世界（异步图书）张鑫旭.epub


#### ReactJs
:globe_with_meridians: 网盘位置：PDFS > ReactJs
* :hammer: ReactJs小书
* :hammer: 九部知识库之ReactJS精选文章

#### NodeJS
:globe_with_meridians: 网盘位置：PDFS > NodeJs
* :hammer: 七天学会NodeJS.pdf
* :tada: Node.js权威指南(实战).epub
* :tada: Node即学即用(图灵程序设计丛书).epub
* :tada: 超实用的Node.js代码段(代码逆袭).epub


#### 面试复习
:globe_with_meridians: 网盘位置：PDFS > 面试复习
* :hammer: 前端面试复习知识点集合
* :hammer: 计算机通识
* :hammer: 各种常见布局实现和案例分析

#### 其他
### 添加方法
更改node_modules中percollate里面index.js中的cleanup方法，将
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

 ### 启动
 安装依赖
 > npm install 

启动项目
 > node index

### PS
点击右上角的Watch，会收到项目的最新动态，如果通过本项目生成的电子书不能适配你的阅读器，请Fork代码，自行修改配置然后从新生成，
项目会持续更新，喜欢的请Star！
