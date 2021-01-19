// vue 中防止用户在短时间内频繁多出的点击按钮
import Vue from "vue";
Vue.directive("preventReClick", {
    inserted(el,binding) {
        console.log(el,"el");
        console.log(binding,"binding");
        // 利用表单提交时候  button按钮--的属性disabled来禁用button按钮
        el.addEventListener("click", () => {
            console.log("监听到点击事件了");
            if (!el.disabled) {
                el.disabled = true;
                setTimeout(() => {
                    el.disabled = false;
                }, 1000);
            }
        })
    }
});
