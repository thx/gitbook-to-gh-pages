### 工具背景

[gitbook](https://www.npmjs.com/package/gitbook-cli) 是一个使用markdown很方便书写文档的本地工具，[github pages](https://pages.github.com/)则是托管文档的线上服务，本工具旨在提供本地使用gitbook开发文档，然后一键发布到github pages的功能

### 使用流程：

 - 先安装 gitbook 工具 `npm i -g gitbook-cli`
 - 创建一个空目录，执行 `gitbook init`
 - 执行 `gitbook serve`，创建本地服务进行本地文档编写、预览等
 - 项目中创建一个publish.js文件，键入以下代码，然后控制台执行`node publish`即可发布到github pages上

```
require('gitbook-to-gh-pages)()
```
 - 访问[userName].github.io/[projectName] 即可看到线上文档效果


