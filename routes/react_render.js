/**
 *
 * Created by gunjoe on 2017/3/21.
 */
let router = require('koa-router')();
let React = require('react');
let ReactDOMServer = require('react-dom/server');
let Test = React.createFactory(require('../src/components/Test/test.jsx'));

router.get('/react',function *() {
    console.log("服务端渲染");
    let num = (new Date()).toString();
    this.body = ReactDOMServer.renderToString(<Test number={num} />);
    console.log(this.body);
});

module.exports = router;