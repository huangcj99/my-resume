/**
 * Created by gunjoe on 2017/2/28.
 */
let router = require('koa-router')();

router.get("/test3",function *(next) {
    this.body = "test3";
    yield next;
});

module.exports = router;