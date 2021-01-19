module.exports = {
    productionSourceMap:false,
    // pages: {
    //     // Vue支持构建一个多页应用  可以用在mpvue中  因为每一个页面文件下有个main.js
    //   index: {
    //     //   页面的入口
    //       entry: 'src/index/main.js',
    //       template: 'public/index.html', // 模板来源
    //       filename: 'index.html' // 在打包后dist文件下的生成模板的名字
    //   } 
    // },
    devServer:{
        proxy: {
            '/api':{
                target:'https://next.json-generator.com/',
                changeOrigin:true,
            }
        }
    }
}