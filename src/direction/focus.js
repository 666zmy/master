// 注册一个全局自定义指令 v-myfocus
import Vue from 'vue'
Vue.directive('myfocus',{
    // 当被绑定的元素插入到DOM中时候
    inserted: function(el, binding,vnode,oldVnode) {
        console.log(el,binding,vnode,oldVnode)
        //实现聚焦
        el.focus()
        console.log(binding.value, "binding.value")
    }
})