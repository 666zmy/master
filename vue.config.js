module.exports = {
    devServer:{
        proxy: {
            '/api':{
                target:'https://www.mocky.io/',
                changeOrigin:true,
                pathRewrite: {
                    '^/api':''
                }
            }
        }
    }
}