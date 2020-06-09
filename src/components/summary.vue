<template>
  <div id="summary">
    <div class="list-five" v-for="acct in top5" :key="acct._id">
    <span class="left"> {{ acct.name}}     
       </span>
     <span>
      {{ acct.new_balance | all | currency }} 
       </span> 
     <span>
      {{ acct.minimum | all | currency }}
       </span> 
    </div>
    <div class="list-five summary-row">
        <span class="left"> {{ summaryTotals.income | currency}}     
          </span>
        <span>
          {{ summaryTotals.dept | all | currency }} 
          </span> 
        <span>
          {{ summaryTotals.debtToIncome | fixedone }}
          </span> 
    </div>
  </div>
</template>
<script>
//  module.exports = {
export default {
  name: "Summary",
  // components: {
  //         'acct-history': httpVueLoader('./account-history.vue'),
  //       },
 // props: ['account'],
   data: function() {
        return {
          today: new Date(),
          title: "Account",
          // details: false,
          // editing:false,
          // adding:false,
          errors: [],
          account: null,
          months: [],
          summaryTotals: null,
          totals: {
             previous_balance: 0,
             new_balance: 0,
             minimum: 0,
             purchases: 0,
             payment: 0,
             interest: 0,
          }
        }
    },
    computed: {
      accountList: function(){
        if (!this.account) return [];
        var name = this.account.name;

        console.log(`accountList: ${name}`)
        var acctObj = this.$store.getters.getAcctObj;

        var list =  acctObj[name];
        return list.sort(function(a, b){
          var x = a.statement_date
          var y = b.statement_date
          return x - y
        })
      },
      top5(){
        var top = [];
        var rest = 0;
        var restBalance = 0;
        var restCnt = 0;
        var akount = this.$store.getters.latestAccounts;
        akount.sort((x,y) => {
          var a = x.new_balance;
          var b = y.new_balance;
          if (a > b) return -1;
          if (a < b) return 1;
          return 0;
        }).forEach(x => {
          if (top.length < 8){
            if (x.name == "Bank of America"){
              x.minimum = 29000
            }
            top.push(x)
          } else {
            rest += x.minimum;
            restBalance += x.new_balance;
            restCnt++;
          }
        })
       var nameRest = `rest of accts( ${restCnt} )`;
        // top.push({name: "rest of accounts", new_balance: restBalance, minimum: rest})
        top.push({name: nameRest, new_balance: restBalance, minimum: rest})
        // now add totals
        var income = this.$store.getters.income * 100;
        var debt = top.reduce((a,b) => { return a+b.minimum},0);
        var debtToIncome = debt * 10000 / income;
        console.log(`income = ${income}`)
        console.log(`debt = ${debt}`)
        console.log(`debtToIncome = ${debtToIncome}`)

        this.summaryTotals = {
          name: "totals",
          new_balance: restBalance,
          minimum: rest,
          income: income,
          debt: debt,
          debtToIncome, debtToIncome
          }
     //   top.push(totals)  
        return top;
      }
    },
    methods: {
      calcTotals: function(accounts){
        var t = {};
        t.previous_balance = 0;
        t.new_balance  = 0;;
        t.minimum  = 0;
        t.purchases  = 0;
        t.payment  = 0;
        t.interest  = 0;
        // var t = {};
        accounts.forEach(x => {
           t.previous_balance += x.previous_balance;
           t.new_balance += x.new_balance;
           t.minimum += x.minimum;
           t.purchases += x.purchases;
           t.payment += x.payment;
           t.interest += x.interest;
        })
        return t;

      },
         belowZero: function(a){
          return a.previous_balance - a.new_balance < 0;
        },
      // getAccountList: function(name){
      //   //var list =  this.accountsObj[name]
      //   var list =  this.$store.state.accountsObj[name]
      //   this.theaccountList = list.sort(function(a, b){
      //     var x = a.statement_date
      //     var y = b.statement_date
      //     return x - y
      //   })
      // },
    //  editAccount(account){
    //     console.log(`submitAccount: ${JSON.stringify(account, null, 3)}`)
    //   },
    },
    created(){
      this.$store.dispatch("loadAccounts")
      console.log("created account.vue")
    },
          filters: {
        fixedtwo: function(value){
          return parseFloat(value * 100).toFixed(2);

        },
        fixedone: function(value){
          return parseFloat(value).toFixed(0);

        },
        all: function(value){
          if (value instanceof Date){
            return value.toLocaleDateString()
          }
          if (typeof value === 'number'){
            return parseFloat(value / 100).toFixed(0);
          }
          if (typeof value === 'string') {
          // console.log('filter all strings : ' + value)
            return value.substr(0,10)
          }
        //  debugger
          return value
        },
        monthname: function (value) {
          if (!value) return ''
          // value = value.toString()
          return MONTH_NAMES[value-1 ].substr(0,3)
        },
        dayname: function(value){
          var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
          var valueName = app.$data.today.getDate() - value;
          var result = new Date(app.$data.today)
          result.setDate(result.getDate() + valueName)
          return days[result.getDay()].substr(0,1)
        },
        capitalize: function (str) {
              return str.charAt(0).toUpperCase() + str.slice(1)
            },
        currency: function(value){
            if (!value) return 0;
            var x = (value * 1).toLocaleString('en-US', { style: 'currency', currency: 'USD' })
            return x.split('.')[0]
          }
    },
}
</script>

<style scoped>
.list-five{
 border: 1px solid black;
 background: #edf35b;
 padding: 10px;
 font-size: 2em;
 width: 500px;
 display: grid;
  grid-template-columns: 2fr 1fr 1fr;
}
.list-five span{
  margin: 2px 10px;
  padding: 4px;
  text-align: right;
}
.left{
  text-align: left;
}
.totals-row{
  background: green;
  color: wheat;
}
</style>
