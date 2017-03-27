/**
 * Created by gunjoe on 2017/2/27.
 */
let fork = require('child_process').fork;
let cpus = require('os').cpus();

let n = fork('./process.js');

console.log(__dirname);