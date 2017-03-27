/**
 *     Created by gunjoe on 2017/3/3.
 *
 *  传入一个mongodb数据库配置项dbOption
 *
 *      {
 *          ipAddress:localhost,
 *          port:3000,
 *          database:myDatabase，
 *          doc:myDoc
 *      }
 *
 *  在数组中传入网页路径
 *
 *      url:"http://..."
 *
 *
 *  传入一个content
 *      {
 *          title:[selector1,'text'],
 *          href:[selector2,'href']
 *          ...
 *      }
 *
 *  传入一个数据模型用于操作数据与存储
 *
 *  let temp = new schema({
 *      title:{
 *          type:String
 *      },
 *      href:{
 *           type:String
 *      }
 *  });
 *
 *
 */
const fs = require('fs');
const request = require('request');
const cheerio = require('cheerio');
const co = require('co');
const mongoose = require('mongoose');
const ichaha = require('iconv-lite');

//配置
let dbOption = {
    ipAddress:'localhost',
    port:27017,
    database:'myKoa',
    doc:"cat_beauty_default"
};

//爬取的页面组，可以是多条网址，但是爬取的内容结构需要一致
let urls = [
    'http://list.epet.com/4204b1f1.html',
    'http://list.epet.com/4204b1f2.html'
];

//抓取页面元素的选择器与抓取内容类型,存入对应的数组
//content的结构需要与temp结构一致,如content的title与temp的title
let content = {
    title:['.lis_box .list_box-li .gd-photo img','src'],
    href:['.column .l-left-col .b-left > ul > li > a','href']
};

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

let crepper = (function (dbOpt,temp) {
    //根据数据库配置连接数据库
    mongoose.connect(`mongodb://${dbOpt.ipAddress}:${dbOpt.port}/${dbOpt.database}`);
    //建立数据模型
    let Model = mongoose.model(dbOpt.doc,temp);

    //爬取主函数
    return function (url,content) {
        //下载爬取页面
        let downPage = function () {
            return new Promise((resolve,reject) => {

                //发起请求
                console.log("发起请求");

                request(url,(err,response,body) => {
                    if (err) reject(err);
                    console.log('-------------------------------');
                    console.log(`是否成功获取到页面body:${/html/.test(body)}`);
                    // let html = ichaha.decode(body,'gb2312');
                    let $ = cheerio.load(body,{decodeEntities: false});
                    resolve($);
                })
            });
        };

        //解析数据
        let analysisData = function ($) {
            return function *() {

                //开始解析
                console.log('-------------------------------');
                console.log("开始解析");

                let allInfo = {};
                //遍历content内需要抓取对象的信息
                for (let info in content) {

                    //开始解析单个info
                    console.log('-------------------------------');
                    console.log(`解析${info}`);

                    yield new Promise((resolve,reject) => {
                        let selector = content[info][0];
                        let classifition = content[info][1];
                        let ele = $(selector);
                        let arr = [];

                        console.log(`${info}取得的数量为${ele.length}`);
                        //遍历获取的页面元素
                        for (let i = 0,l = ele.length; i < l; i++) {
                            if (classifition === "text") {
                                arr.push(ele.eq(i).html());
                                console.log(`${info}:${arr}`);
                            }

                            if (classifition === "src") {
                                arr.push(ele.eq(i).attr('src0'));
                                // console.log(`${info}:${arr}`);
                            }

                            if (classifition === "href") {
                                arr.push(ele.eq(i).attr('href'));
                                // console.log(`${info}:${arr}`);
                            }
                        }

                        allInfo[info] = arr;

                        //单个info储存完毕
                        // console.log(`${info}:完成...arr:${allInfo[info]}`);

                        resolve();
                    })
                }
                return allInfo;
            };
        };

        //插入数据库
        let insertToMongo = function (allInfo) {
            return function *() {
                let attrs = Object.keys(allInfo);
                let infoLen = allInfo[attrs[0]].length;

                //开始遍历对象信息
                console.log('-------------------------------');
                console.log(`开始插入数据库`);

                //根据信息的数量进行数据库对象的存储
                for (let i = 0; i < infoLen; i++) {
                    //保存成功返回promise
                    yield new Promise((resolve,reject) => {
                        let mongoObj = {};
                        for (let info in allInfo) {
                            mongoObj[info] = allInfo[info][i];
                        }
                        let model = new Model(mongoObj);
                        //存入数据库
                        model.save((err) => {
                            if (err) {
                                console.log("保存失败");
                                reject(err)
                            }
                            //保存成功
                            // console.log("保存成功");
                            resolve();
                        });
                    });
                }
                console.log('-------------------------------');
                return "数据存储完成";
            }
        };

        //循环抓取数据并存入数据库
        co(function *() {
            let $ = yield downPage();
            let allInfo = yield analysisData($);
            let success = yield insertToMongo(allInfo);
            //数据保存成功，则打印日志
            console.log(success);

        })
            .catch((err) => {
                console.log(err);
            });

        //该url执行完毕返回promise，以便继续下一个url的下载
        return Promise.resolve();
    }
})(dbOption,temp);

//递归执行爬虫
let runCreppers = function (urls,content) {
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

runCreppers(urls,content);











