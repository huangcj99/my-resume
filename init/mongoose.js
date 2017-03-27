/**
 * Created by gunjoe on 2017/2/28.
 */
const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/myKoa");


// // 创建读写流
// let Schema = mongoose.Schema;
// let temp = new Schema({
//     username:{
//         type:String,
//         unique:true,
//         required:true
//     },
//     password:{
//         type:String,
//         required:true
//     }
// });
//
// let User = mongoose.model('User',temp);
// //计算流返回了多少条消息
// // let num = 0;
// // let stream = User.find().stream();
// // stream.on('data',function (doc) {
// //     num++;
// //     console.log(`num:${num} + doc:${doc}`)
// // }).on('error',function (err) {
// //     console.log(err);
// // }).on('close',function () {
// //     console.log("流结束");
// // });
// let fs = require('fs');
// let ws;
//
// let a = User.where("username").equals("13168618113").stream();
// a.on('data',function (doc) {
//     console.log(doc);
// });