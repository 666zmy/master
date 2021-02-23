# antd-demo

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
vue项目移动端适配的方法
1，安装 flexible和 postcss-px2rem（命令行安装）
npm install lib-flexible --save

npm install postcss-px2rem --save
简要介绍这两个包的用途：
例如在Galaxy S III:

在这里插入图片描述

例如在iphone6/7/8:
在这里插入图片描述

flexible会为页面根据屏幕自动添加标签，动态控制initial-scale，maximum-scale，minimum-scale等属性的值。

postcss-px2rem会将px转换为rem，rem单位用于适配不同宽度的屏幕，根据标签的font-size值来计算出结果，1rem=html标签的font-size值。

2, 引入lib-flexible
在项目入口文件main.js 中引入lib-flexible

import ‘lib-flexible’

注意事项（important）: 由于flexible会动态给页面header中添加标签，所以务必请把目录 public/index.html 中的这个标签删除！！！

3, 配置postcss-px2rem
vue-cli3 构建的项目相较于vue-cli2 构建的项目精简了许多，将一些默认配置进行了更好更严密，让开发变得更高效的封装。具体请看vue-cli官网 https://cli.vuejs.org/zh/guide/

px2rem的配置放在vue-cli3 项目中vue.config.js中（找不到？可能你是一个新构建的项目，需要手动在项目根目录创建vue.config.js）

具体配置内容如下：

 1 module.exports = {
 2     css: {
 3         loaderOptions: {
 4           css: {},
 5           postcss: {
 6             plugins: [
 7               require('postcss-px2rem')({
 8                 remUnit: 37.5
 9               })
10             ]
11           }
12         }
13     },
14 }
1
2
3
4
5
6
7
8
9
10
11
12
13
14
OK，重启项目，两个用于移动端适配的包就这样可以愉快的开始使用了！！！

下面来看我们的代码，代码中我们直接用px来写宽高：

1 .testclass {
2 width: 300px;
3 height: 200px;
4 background: #e3e3e3;
5 }
在浏览器中会是什么样的呢？

在这里插入图片描述

没错，已经从px转换成了rem。 what？如果你的没有从px变成rem, 那么你可能需要重启一下项目呦~

温馨提示： remUnit这个配置项的数值是多少呢？？？ 通常我们是根据设计图来定这个值，原因很简单，便于开发。假如设计图给的宽度是750，我们通常就会把remUnit设置为75，这样我们写样式时，可以直接按照设计图标注的宽高来1:1还原开发。

那为什么你在这里写成了37.5呢？？？那我们后面专门来讲！

之所以设为37.5，是为了引用像mint-ui这样的第三方UI框架，因为第三方框架没有兼容px2rem ，将remUnit的值设置为设计图宽度（这里为750px）75的一半，即可以1:1还原mint-ui的组件，否则会样式会有变化，例如按钮会变小。



创建一个用于打包测试环境的模式
1：修改package.json----左边的是自己命名的
"build:test":"vue-cli-service build --mode test"
2: 添加.env.test
在项目根目录下创建.env.test文件，内容为
NODE_ENV="production" // 表明这是生成环境（需要打包）
VUE_APP_MYCURRENTMODE="test" // 表明生产环境模式信息
VUE_APP_BASURL="http://doq.test.com" // 测试服务器地址