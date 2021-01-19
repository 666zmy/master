import Vue from 'vue';
Vue.directive("preDown",{
    inserted:function(el,binding) {
        console.log(el, "El");
        console.log(binding, "binding");
    }
})