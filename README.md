### 项目介绍
本项目旨在收集和整理网络上优秀和免费的教程，将其转为PDF文件，以便在阅读器上阅读，项目中提供的PDF文件为A6大小，适合在IReader T6中阅读，如果不能适配你的阅读器，请Fork源代码，自行修改导出的参数。如果大家有优秀的课程想要分享，欢迎在Issues中提出，我会及时更新出PDF文件。
### PDF文件
在项目目录pdfs下,进入书的详情页，点击右侧的**Download**按钮即可下载
* [阮一峰JavaScript教程](https://github.com/ranshaw/HtmlOrMarkdownConvertedToPdf/blob/master/pdfs/%E9%98%AE%E4%B8%80%E5%B3%B0JavaScript%E6%95%99%E7%A8%8B.pdf)
* [阮一峰ES6教程](https://github.com/ranshaw/HtmlOrMarkdownConvertedToPdf/blob/master/pdfs/%E9%98%AE%E4%B8%80%E5%B3%B0ECMAScript6%E5%85%A5%E9%97%A8.pdf)
* [九部知识库之ReactJS精选文章](https://github.com/ranshaw/HtmlOrMarkdownConvertedToPdf/blob/master/pdfs/%E4%B9%9D%E9%83%A8%E7%9F%A5%E8%AF%86%E5%BA%93%E4%B9%8BReactJs.pdf)
* [ReactJs小书](https://github.com/ranshaw/HtmlOrMarkdownConvertedToPdf/blob/master/pdfs/ReactJs%E5%B0%8F%E4%B9%A6.pdf)
* [TypeScript入门教程](https://github.com/ranshaw/HtmlOrMarkdownConvertedToPdf/blob/master/pdfs/TypeScript%E5%85%A5%E9%97%A8%E6%95%99%E7%A8%8B.pdf)
* [前端面试复习知识点集合](https://github.com/ranshaw/HtmlOrMarkdownConvertedToPdf/blob/master/pdfs/%E5%89%8D%E7%AB%AF%E9%9D%A2%E8%AF%95%E5%A4%8D%E4%B9%A0%E7%9F%A5%E8%AF%86%E7%82%B9%E9%9B%86%E5%90%88.pdf)
* [计算机通识](https://github.com/ranshaw/HtmlOrMarkdownConvertedToPdf/blob/master/pdfs/%E8%AE%A1%E7%AE%97%E6%9C%BA%E9%80%9A%E8%AF%86.pdf)
* [各种常见布局实现和案例分析](https://github.com/ranshaw/HtmlOrMarkdownConvertedToPdf/blob/master/pdfs/%E5%90%84%E7%A7%8D%E5%B8%B8%E8%A7%81%E5%B8%83%E5%B1%80%E5%AE%9E%E7%8E%B0%E5%92%8C%E6%A1%88%E4%BE%8B%E5%88%86%E6%9E%90.pdf)
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

 
