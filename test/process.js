/**
 * Created by gunjoe on 2017/2/27.
 */
let http = require('http');
http.createServer(function (req,res) {
    res.writeHead(200,{"Content-Type":"text/plain"});
    res.end("Hello");
}).listen(3001);

