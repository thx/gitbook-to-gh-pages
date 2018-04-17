### 工具背景

[gitbook](https://www.npmjs.com/package/gitbook-cli) 是一个使用markdown很方便书写文档的本地工具，[github pages](https://pages.github.com/)则是托管文档的线上服务，本工具旨在提供本地使用gitbook开发文档，然后一键发布到github pages的功能

### 使用方式：

项目中创建一个publish.js文件，键入以下代码，然后控制台执行`node publish`即可

```
require('gitbook-to-gh-pages)()
```

### 依赖

需要先安装 gitbook `npm i -g gitbook-cli`

