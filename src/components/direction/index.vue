<template>
    <div class="box">
        自定义指令
        <input v-myfocus="'dfafjaldf试试'"/>
        <a-button type="primary" v-down="{fileUrl:'http://fs.doqtech.com.cn/omstest/file/2020/08/18/z6q0VaczEJkTzCWUOpANqFerZx5BwW8p.xls',name:'test'}">下载</a-button>
        <a-button type="" v-preDown="{age:12}">点我防止重复点击</a-button>
    </div>
</template>