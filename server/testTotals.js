const allAccounts = require('./data/accounts.json');

console.log(`allAccounts len=${allAccounts.length}`);

const acctObj = getAccountsObject(allAccounts);


var d = new Date('2-1-2020');
var firstDate = new Date(d.setMonth(d.getMonth()-12));
console.log(`starting totals at ${firstDate.toLocaleDateString()}`)

const grandTotal = [];
for(var i=0; i<12; i++){
  var newDate = new Date(d.setMonth(d.getMonth()+1));
  console.log(` for date: ******************${newDate.toLocaleDateString()}`);
  const tot = getTotals(newDate);
  console.log(`totals = ${JSON.stringify(tot)}`)
  tot.date = newDate.toLocaleDateString();
  grandTotal.push(tot);
  d = newDate;
}
console.log(`\n\ngrandTotal = ${JSON.stringify(grandTotal, null, 3)}`)


function splitDate(d){
  const splitDate = d.toLocaleDateString().split('/');
  return splitDate[2]+splitDate[0]; 
  
}
function getTotals(d){
  let balance = 0;
  let minimum = 0;
  
  // foreach account add to balance and minimum
  Object.keys(acctObj).forEach(x => {
    if (x.indexOf('Max') > -1 || x.indexOf('Tess') > -1){
      console.log(`excluding ${x}`)
    } else {

      // console.log(`accout: name=${x} history: ${acctObj[x].length}`)
      const a = acctObj[x].filter(i => {
        const date = new Date(i.statement_date);
        return splitDate(date) == splitDate(d);
      })
      if (a[0]){
        console.log(`_______________ adding totals to ${a[0].name} balance = ${a[0].new_balance}`)
        balance += a[0].new_balance;
        minimum += a[0].minimum;
        console.log(`totals = ${balance} min=${minimum}`)
      }
    } // not Max or Tess
  })
    return {balance, minimum}
}

function getAccountsObject(accts){
  function removeZeros(a){
    return a.new_balance > 300 * 100; // nothing less than $200
  }
   var accountsObj = {}
   accts.filter(removeZeros).forEach(function(a){
     if (!accountsObj[a.name]){
       accountsObj[a.name] = [a]
      } else {
        accountsObj[a.name].push(a)
      }
    })
    return accountsObj
}