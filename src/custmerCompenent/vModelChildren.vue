<template>
    <div class="box">
        {{ test }}
        <button @click="changeParent">子传递给父亲</button>
        <ul>
            <li v-for="item in list" :key="item.age">
                <a ref="mya">{{item.img}}</a>
            </li>
        </ul>
    </div>
</template>
<script>
export default {
    name: 'VModelChildren',
    props: {
         test: {
             type: String,
             required: true
         }
    },
   model: {
       prop: 'test', // 这里prop 对应你接受的props中的值  而且必须是字符串类型
       event: 'cc' //儿子 需要触发的事件函数  把儿子的值 传递给父亲
   },
    data () {
        return {
            list:[]
        }
    },
    beforeCreate() {
       console.log('子-beforecrate')
    },
    created () {
        this.list = [{img:'aa',age:12}, {img:'bb',age:34}]
        console.log('子-created');
    },
    beforeMount() {
         console.log('子-beforeMount')
    },
    mounted () {
        // console.log(this.$refs, 'refs')
        console.log('子-mounted');
    },
    methods: {
        changeParent () {
            this.$emit('cc', '我是儿子传递给父亲的值')
        }
    }
}
</script>