###爬虫小工具

最近临近毕业，突然想起毕设得做了= =，需要一些数据，就想着写一个爬虫的小工具给自己来爬数据用。

该脚本用到request+cheerio+mongoose+co，request用于充当客户端，cheerio用于解析页面并通过JQ的
手法取抓取自己想要的数据，mongoose则用于建立数据模型与连接数据库，co则用于控制异步流程。

基本需求如下：

```js

1、根据配置信息配置与mongodb
2、可以设置保存数据的结构
3、以数组为单位递归爬取相同数据结构的数据
4、可以传入标识指定爬虫爬取的数据的类别(如src、href、innerHTML等,可自己扩展)

```

创建一个数据库配置对象：

```js

let dbOption = {
    ipAddress:'localhost',    //本机
    port:27017,	              //数据库端口号
    database:'myKoa',         //数据库名
    doc:"baiduNews"           //数据库文档
};

```

创建一个url数组

```js

let urls = [
    'http://xxx.com/'，
    //...
];

```

新建一个Schema

```js

//存入mongo的数据结构
let schema = mongoose.Schema;
let temp = new schema({
    title:{
        type:String
    },
    href:{
        type:String
    }
});

```

主crepper,这里我将爬取单个页面的功能封装进一个function,递归爬取通过另一个函数来执行，
达到功能职责的分离(其实这里应该把连接数据库的功能分离出去比较好，单个crepper能更好的扩展):

```js

//这里通过一个IIFE函数返回单个crepper爬取的主函数,并将数据库配置传入，连接数据库
let crepper = (function(dbOpt,temp){
    //根据数据库配置连接数据库
    mongoose.connect(`mongodb://${dbOpt.ipAddress}:${dbOpt.port}/${dbOpt.database}`);
    //建立数据模型
    let Model = mongoose.model(dbOpt.doc,temp);
    
    //返回主函数，url为单个网址，content为爬取内容的设置项
    return function(url,content) {
	...
    }
})(dbOption,temp);

```

递归调用crepper函数

```js

//递归执行爬虫
let runCreppers = function (urls,content) {
    //用于简单判断
    let count = 0;
    if (urls.length !== 0) {
        //每一个crepper执行返回fullfill后，将shift数组第一项,继续爬取下一个页面
        co(function *() {
            let url = urls[count];
            yield crepper(url,content);
            //去除urls的第一项，再递归执行runCrepper
            urls.shift();
            runCreppers(urls,content);
        });
    }
};

//执行递归爬取
runCreppers(urls,content);

```

接下来的crepper的核心步骤：

```js
//下载爬取页面
let downPage = function (){...}

//解析数据
let analysisData = function ($){...}

//插入数据库
let insertToMongo = function (allInfo) {...}

co(function *() {
     let $ = yield downPage();
     let allInfo = yield analysisData($);
     let success = yield insertToMongo(allInfo);
})
    //捕捉错误并打印
    .catch((err) => {
         console.log(err);
    });

```

这里用到cj大大的co函数来控制异步，而co则是运用ES6的promise和generator来实现的，koa1
的中间件机制底层则是用co实现的，当然koa2已经可以用ES7的async与await了。
