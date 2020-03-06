const util = require("./util");

 var accounts = util.getFile('/data','accounts.json');
 const data = JSON.parse(accounts);
console.log(`len = ${accounts.length}`)
// util.writeFile(`${__dirname}/data/message.txt`,'hello***********');

// console.log(`got acc/ounts ${JSON.stringify(accounts, null, 3)}`);
