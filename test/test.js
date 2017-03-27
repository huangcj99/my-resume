/**
 * Created by gunjoe on 2017/2/24.
 */
let co = require('co');
let thunkify = require('thunkify');
let fs = require('fs');
let path = require('path');

let read = thunkify(fs.readFile);

// let readFile = function (fileName) {
//     return new Promise((resolve,reject) => {
//         fs.readFile(fileName,(err,data) => {
//             if (err) {
//                 reject(err);
//             }
//             resolve(data.toString());
//         });
//     });
// };

// let test = function *() {
//     let a = yield readFile('test.txt');
//     let b = yield readFile('test.txt');
//     console.log(a);
//     console.log(b);
// };
//
// let it = test();
// it.next().value.then((data) => {
//      console.log(data);
//      it.next(data).value.then((data1) => {
//          console.log(data1);
//          it.next(data);
//      });
// },(err) => {
//     console.log(err);
// });

// let test = function *() {
//     let a = yield [
//         new Promise((resolve,reject) => {
//             setTimeout(() => {
//                 console.log("1");
//                 resolve();
//             },2000);
//         }),new Promise((resolve,reject) => {
//             setTimeout(() => {
//                 console.log("1");
//                 resolve();
//             },4000);
//         })
//     ];
//     let b = yield new Promise((resolve,reject) => {
//         console.log("9");
//         resolve();
//     });
// };
//
// co(test);

/**
 *    redis
 */

let redis = require('redis');
let bluebird = require('bluebird');
let redisStore = require('koa-redis');
let session = require('koa-generic-session');
//
// let client = redis.createClient(6379,'127.0.0.1');
// bluebird.promisifyAll(redis.RedisClient.prototype);
// bluebird.promisifyAll(redis.Multi.prototype);
//
// // client.hmset("name9",{
// //     'name1':'chen',
// //     'name2':'huang',
// //     'name3':'lin'
// // },function (err,replies) {
// //     console.log("set:" + replies);
// // });
// // client.hget("name9",'name1',function (err,keys) {
// //     console.log(keys);
// // });
// client.hgetAsync("name9",'name3').then(function (res) {
//     console.log(res);
// });
//
// client.hkeysAsync("name9").then(function (res) {
//     console.log(res);
// });
//
// console.log("123");
// client.on('error',function (err) {
//     console.log(err);
// });

// let redisDb = require('../init/redis');
//
// redisDb.getAsync('init').then(
//     (res) => {
//         console.log(res);
//     },
//     (err) => {
//         console.log(err);
//     }
// );

// let net = require('net');
//
// let server = net.createServer(function (c) {
//      // c.setNoDelay(true);
//      c.write("377375042577373001","binary");
//      console.log("server connect");
//      c.on('end',function () {
//          console.log("断开");
//          server.unref();
//      });
//
//      c.on('data',function (data) {
//          // (function (data) {
//          //    setInterval(() => {
//                 process.stdout.write(data.toString());
//                 c.write(data.toString());
//             // },2000)
//          // })(data)
//      });
//
//
// }).listen(8000);




