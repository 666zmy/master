// vue 函数式组件
// one::===>  functional: true加上render function，就是一个最简单的函数式组件啦
export default {
    name: 'functionalButtton',
    functional: true,
    render(createElement,content) {
        console.log(content, 'content')
        return createElement('button','我是一个虚拟dom下渲染的button组件')
    }
}