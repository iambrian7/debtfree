const allAccounts = require('./data/accounts.json');

console.log(`allAccounts len=${allAccounts.length}`);

console.time("accountsByMonth");
const m = accountsByMonth(allAccounts);
// console.timeEnd("accountsByMonth");
// console.log(`recieved accountsByMonth len= ${Object.keys(m).length}`)
// console.log(`recieved accountsByMonth ${Object.keys(m)}`)
var firstLen = 0;

Object.keys(m).forEach(x => {
  console.log(`doing ${x}`)
  if (firstLen == 0){
    firstLen = m[x].length;
  }
  var len = m[x].length;
  // console.log(`${x} accounts=${m[x].length}`)
  if (m[x].length == 1) console.log(JSON.stringify(m[x], null, 3))
  var mTots = monthTotals(m[x]);
  mTots.balance = Math.round(mTots.balance);
  mTots.min = Math.round(mTots.min);
  mTots.interest = Math.round(mTots.interest);
  console.log(`totals: len: ${len} ${JSON.stringify(mTots)}`)
  if (firstLen != len){
    console.log(`${mTots.yrmonth} is different than last ${m[x-1]}`)
  }
})

function fixAmounts(x){
  return x;
}
// mTots = monthTotals(m['202002']);
// console.log(`totals: ${JSON.stringify(mTots)}`)
function c(x){
  return `$${x/100}`
}
function accountsByMonth(allAccounts){
  if (!allAccounts || allAccounts.length < 0 ){
    return {noaccounts: []}
  }
  let obj = {};
  allAccounts.forEach(x => {
    let yrmonth = getYearMonth(x.statement_date);
    if (!obj[yrmonth]){
      obj[yrmonth] = [x];
    } else {
      obj[yrmonth].push(x);
    }
  });
  return obj;
}

function getYearMonth(sd){
  var date = new Date(sd);
  var year = date.getFullYear();
  var month = date.getMonth();
  month++;
  month = month < 10 ? '0'+month : ''+month;
  return year+month;
}

function monthTotals(accts){
  const totals = {
    yrmonth: getYearMonth(accts[0].statement_date),
    balance: 0,
    min: 0,
    interest: 0
  }
  if (totals.yrmonth == '201911'){
    console.log(`${JSON.stringify(accts.map(x => x.name), null, 3)}`)
  }
  accts.forEach(x => {
    if (x.owner == 'brian' && x.name.indexOf('Max') < 0){
      totals.balance += x.new_balance / 100;
      totals.interest += x.interest / 100;
      totals.min += x.minimum / 100;
    } else {
      console.log(`removed ${x.name}`)
    }
  })
  return totals
}