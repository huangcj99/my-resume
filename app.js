/**
 * Created by gunjoe on 2017/2/23.
 */
const Koa = require('koa');
const Router = require('koa-router');

const app = Koa();
const router = new Router();

let mongoose = require('./init/mongoose');
let states = require('./routes/states');

//静态处理路由挂载到中间件上
app.use(states.routes());
//将路由模块加载到中间件
app.use(router.routes());

app.listen(8081,function () {
    console.log("开启8081");
});


