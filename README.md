react实现动态简历
---------------

项目技术栈:
```js
react + redux + react-redux + webpack2 + sass + ES6/7 + prismjs
```
其实这里没有必要用到redux啦-.-,毕竟项目不大,怪我懒咯-.-

还有就是-.-请用chrome打开,因为用到了perspective这个CSS3的透视属性,火狐不支持.

使用

```js
1.git clone ...
2.npm install
3.npm run start
4.打开浏览器后输入localhost:8080查看效果
```

前天发现一个挺有意思的[网站](http://strml.net/),大致的效果就跟我的简历demo差不多,
在页面将自己书写的css代码慢慢展现出来,同步更改页面的样式,并且css代码具有高亮效果,
下面简述一下这种效果的核心实现吧

在定时器内部,每轮都向store中发起一个dispatch,更改len的长度,
以截取依次递增的style到页面中,len一改变,页面的style立马跟着改变,
实现页面逐渐显示style的样式出来
```js

setInterval(() => {
    ...
    
    let currentStyle = stylePart.substr(0,len);
    
    ...
},interval);

```

下面是页面编辑器的html结构,style标签用于逐渐输出样式,div中则显示样式的代码,
这里两者进行同步刷新(通过发起dispatch更改len,从而触发视图刷新)
```js

render() {
        return (
            <div className="styleEditor" ref="editor">
                <style>
                    {currentStyle}
                </style>
                <div dangerouslySetInnerHTML={{__html: currentStyleHtml}}/>
            </div>
        )
    }

```

那么如何让显示在页面上的css代码高亮显示呢?这里需要用到prismjs这个代码高亮包
```js
...
let currentStyleHtml = Prism.highlight(currentStyle, Prism.languages.css);
...
```

还有一个小细节,左边编辑器代码增加的同时,需要让代码框自己保持滚动到最底部
```js
...
this.refs.editor.scrollTop = 100000;
...
```

