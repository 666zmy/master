<template>
    <div id="box">
        我是two
        <div v-pre>
        {{'我是子元素没没没指令的h3'}}
        <h3 v-text="'我是子元素有指令的h3'"></h3>
        </div>
        <!-- 简单元素 -->
        <transition>
           <div v-if="content">content content</div>
        </transition>
        <br/>
        <NavigationLinkage></NavigationLinkage>
    </div>
</template>
<script>
import  NavigationLinkage from './../components/NavigationLinkage/index'
import mixin from './../../mixins/index'
import compA from './../../extends/index.js'
export default {
    data () {
        return {
           content:1
        }
    },
    created() {
    console.log('子-create')
    console.log(2)
    console.log(this.$parent, 'parent')
    },
    extends:compA,
    mixins:[mixin],
    beforeCreate () {
     console.log('子-beforeCreate')
    },
    beforeMount () {
        console.log('子-beforeMount')
    },
    mounted () {
        console.log('子-mounted')
    },
    components: {
        NavigationLinkage
    }
}
</script>
<style lang="less" scoped>

</style>