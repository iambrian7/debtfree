const http = require('http');
const app = require('./app');

var x = process.env.BRIAN
console.log(`nodemon.json gets ${x}`)
console.log("seed_admin/controller="+ process.env.ADMIN_ROLE)
const port = process.env.PORT || 3019;

const server = http.createServer(app);
console.log(`ck on port ${port}`);
server.listen(port, () => console.log(`Listening on port ${port}`));