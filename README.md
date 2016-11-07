# root-size
使用rem作为布局单位，实现弹性布局，页面等比适应所有“分辨率”的设备。



## 工具

* [x] 构建工具 [webpack](http://webpack.github.io/)
* [x] 编译JS [babel](http://babeljs.io/)
  * [x] es2015
  * [x] stage-1
* [x] 检测语法
  * [x] JS [eslint](http://eslint.org/)
* [x] 自动生成文档 [esdoc](https://esdoc.org/)
* [x] 单元测试
  * [x] [mocha](mochajs.org)
  * [x] [chai](chaijs.com)
  * [x] [jsdom](https://github.com/tmpvar/jsdom)
* [x] git-hooks


## npm scripts

* test 单元测试
* build 构建项目
* build:dev 构建开发环境代码
* build:pro 构建生成环境代码
* compile 编译源码
* lint 检测语法
* lint:watch 实时检测语法
* install-git-hooks 安装git钩子
* doc 自动生成文档
* prepublish 发布到npm前执行的脚本
* postpublish 发布到npm后执行的脚本