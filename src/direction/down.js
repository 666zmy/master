import Vue from 'vue';
Vue.directive('down',{
    inserted: function (el, binding) {
        console.log(el, binding)
        el.addEventListener('click',function() {
            console.log('click', '添加点击功能')
            var a  = document.createElement('a') // 创建a标签
           fetch(binding.value.fileUrl).then((res) => {
                console.log(res)
                return res.blob() // 返回blob对象 为了解决跨越下载问题---  url--->blob
            }).then((blob)=> {
                // eslint-disable-next-line no-irregular-whitespace
                console.log(blob, "blob") //  Blob {size: 23552, type: "application/vnd.ms-excel"} "blob
                a.download = binding.value.name // a标签下载功能  必须结合download属性  指定下载文件的名字
                a.href = window.URL.createObjectURL(blob) // 指定下载文件链接    blob对象形式的文件  转成url链接的形式
                a.click();// 触发a标签的点击 功能 进行模拟用户点击a标签链接   进行下载
                console.log(window.URL.createObjectURL(blob), "blob_href") //blob:http://localhost:8080/4dfb8fa3-f05f-45a7-bdc0-559f51eb1184
            })
            
        })
    }
})
// 封装下载 在线 文件  解决跨越问题  通过fetch方法 返回blob对象