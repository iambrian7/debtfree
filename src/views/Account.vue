<template>
  <div id="accounts">
 <div class="full-accounts">
   <button class="add-item" @click="addAccount">Add Account...</button>
    <table class="users">
      <thead>
        <tr>
          <th class="row-2 row-name">Name</th>
          <th class="row-2 row-ID">Due</th>
          <th class="row-2 row-job">Date</th>
          <th class="row-2 row-ID">Bal</th>
          <th class="row-2 row-ID">New Bal</th>
          <th class="row-2 row-ID">Diff</th>
          <th class="row-2 row-ID">Interest</th>
          <th class="row-2 row-ID">Paid</th>
          <th class="row-2 row-ID">Purchases</th>
          <th class="row-2 row-ID">Min Due</th>
          <th class="row-2 row-ID">Pay Off</th>
          <th class="row-2 row-ID">Pay Off Run</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(a,i) in filteredAccounts" :key="i" @click="viewAccounts(a.name)">
            <td class="bold" :class="{green : a.dmonth > 0}"> {{ a.name }}</td> 
            <td>{{a.datedue}}</td>
            <td>{{a.statement_date.substr(0,10)}}</td>
            <td>{{a.previous_balance | all | currency}}</td>
            <td>{{a.new_balance | all | currency}}</td>
            <td :class="{red : belowZero(a)}">{{a.previous_balance - a.new_balance | all | currency}}</td>
            <td>{{a.interest | all | currency}}</td>
            <td>{{a.payment | all | currency}}</td>
            <td>{{a.purchases | all | currency}}</td>
            <td>{{a.minimum | all | currency}}</td> 
            <td>{{a.minimum - a.interest | all | currency}}</td> 
            <td>{{a.payoff | all | currency}}</td> 
          </tr>
        <tr>
            <td class="bold">Totals</td> 
            <td></td>
            <td></td>
            <td>{{totals.previous_balance | all | currency}}</td>
            <td>{{totals.new_balance | all | currency}}</td>
            <td :class="{red : belowZero(totals)}">{{totals.previous_balance - totals.new_balance | all | currency}}</td>
            <td>{{totals.interest | all | currency}}</td>
            <td>{{totals.payment | all | currency}}</td>
            <td>{{totals.purchases | all | currency}}</td>
            <td>{{totals.minimum | all | currency}}</td> 
            <td>{{totals.minimum - totals.interest | all | currency}}</td> 
            <td></td> 
          </tr>
      </tbody>
    </table>
    </div>
  </div>
</template>
<script>
//  module.exports = {
export default {
  name: "Account",
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
      newAccount: function(){
          var entry = this.account
          var a = {}
          a.name = entry.name
          a.number = entry.number
          a.previous_balance = entry.new_balance //entry.previous_balance
          a.new_balance = 0
        //  a.previous_balance = entry.previous_balance
          a.datedue = entry.datedue
          a.minimum = entry.minimum
          a.interest = entry.interest
          a.limit = entry.limit
          a.debttype = entry.debttype
          a.purchases = entry.purchases
          a.payment = entry.payment
          a.statement_date = entry.statement_date
          a.owner = entry.owner
          a.statement_date = entry.statement_date.substr(0,10)
          return a
      },
      filteredAccounts: function(){
        var akount = this.$store.getters.latestAccounts
        if (!akount) return []
       var sortKey = "datedue"
       var ex = ["__v","updated","_id"]
      var filterKey = '' // this.filterKey && this.filterKey.toLowerCase()
      var accounts = akount
      // this map function excludes key from the row object for each account
      // we don't want those keys edited
          // get array of months in set
                  var set = {};
                  accounts.forEach(x => {
                    var d = new Date(x.statement_date);
                    var yrMonth = `date${d.getFullYear()}${d.getMonth()}`;
                    // console.log(`...month ${yrMonth} ${x.name}`)
                    if (!set[yrMonth]){
                      this.months.push(d.getMonth())
                    }
                  })
                  // console.log(`yrmonths = ${this.months}`)
        accounts = accounts.map(row => {
          Object.keys(row).forEach(k => ex.indexOf(k) > -1 ? delete row[k] : true )
          var d = new Date(row.statement_date);
          row.dmonth = d.getMonth();
          return row
        })
      if (sortKey) {
        accounts = accounts.slice().sort(function (a, b) {
          a = a[sortKey]
          b = b[sortKey]
          return (a === b ? 0 : a > b ? 1 : -1) * 1
        })
      }
      // calculate totals
      
      this.totals = this.calcTotals(accounts);

      return accounts
      },
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
        
    viewAccounts: function(name){
    //  debugger
      // console.log("view acct " + JSON.stringify(meeting, null, 3))
      // this.$store.dispatch("setViewMeeting", meeting)
      console.log(`Account:viewAccounts: name = ${name}`)
      // var filteredName = name.replace("/"," ")
      var filteredName = name.split('/').join(' ')
      console.log(`Account:viewAccounts: filtered name = ${filteredName}`)
      // console.log(`viewAccounts: name = ${filteredName}`)
      this.$router.push({path:`/history/${filteredName}`})
    },
    addAccount: function(){
      
      this.$router.push({path:`/newaccount`})
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
            return (value * 1).toLocaleString('en-US', { style: 'currency', currency: 'USD' })
          }
    },
}
</script>

<style>
.red{
    background: rgb(230, 62, 62);
    color: white;
  }
  .green{
    background: greenyellow;
  }

#accounts{
  width: 100%;
}
.full-accounts{
  width: 95%;
  margin: auto;
}
.add-item{
  position: absolute;
  top: 100;
  left: 5;
  font-size: 1.6em;
  background: lightskyblue;
}
.edit-button{
  border: 1px solid black;
  cursor: pointer;
  padding: 10px;
  float: right;
  font-size: 1.2em;
  display: flex;
  justify-content: center;
  align-content: center;
  border-radius: 10px;
}
  .account-container{
    background: burlywood;
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
  }
  .item span{
    padding: 5px 10px;
    border: 1px solid black;
    background: #aaa;
  }
  .bkc-list,
  .bkc-detail{
    background: lightcoral;
    height: 100vh;
    margin: 5px;
    border: 1px solid black;
  }
  .bkc-list{
    /* width: 30%; */
    flex: 1;
    height: 90vh;
    overflow-y: scroll;
  }

  .bkc-detail{
    padding: 50px;
    font-size: 0.8em;
    background: #aaa;
    border: 1px solid #888;
    box-shadow: 2px 2px #444;
  }
  .bkc-history{
    flex: 6;
  }
  .acct-props{
    background: rgb(216, 209, 209);
    border: 1px solid black;
    padding: 5px;
    border-radius: 5px;
  }
  .submit-edit,
  .cancel-edit,
  .bkc-list .item{
    border: 1px solid black;
    border-radius: 5px;
    background: red;
    color: white;
    margin: 5px;
    padding: 3px;
    /* width: 100px; */
    cursor: pointer;
  }
  .cancel-edit:hover,
  .bkc-list .item:hover{
    background: #eee;
    color: gray;
  }
  .cancel-edit{
     background: #aaa;
  }

  @media only screen and (max-width: 600px) {
      body {
        background-color: lightblue;
      }
       .bkc-list{
        width: 100%;
      }
      .account-layout{
        display: block;
        /* display: flex; */
        /* flex-direction: column; */
      }
      .account-list{
        display: none;
      }
    .form-labels{
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      /* grid-template-columns: 70px 150px 70px 150px; */
      width: 100%;
      padding: 5px;
      grid-gap: 2px;
    }
  }
  .customers {
    font-family: "Trebuchet MS", Arial, Helvetica, sans-serif;
    border-collapse: collapse;
    /* width: 100%; */
    font-size: 1.2em;
    margin: 10px;
    padding: 5px;
}

.customers td, .customers th {
    border: 1px solid #ddd;
    padding: 2px;
    color: black;
    /* font-size: 1.4em; */
}

.customers tr:nth-child(even){background-color: #f2f2f2;}

.customers tr:hover {background-color: #ddd;}

.customers th {
    /* padding-top: 12px; */
    /* padding-bottom: 12px; */
    text-align: center;
    background-color: #4CAF50;
    color: white;
}
.customers td input{
  /* max-width: 5em; */
  /* width: 100px; */
  background: rgb(195, 201, 195);
  padding: 5px;
  /* font-size: 1.2rem; */
}


.users {
  table-layout: fixed;
  width: 100%;
  white-space: nowrap;
  margin-top: 30px;
}
/* Column widths are based on these cells */
.row-ID {
  width: 5%;
}
.row-name {
  width: 15%;
}
.row-job {
  width: 10%;
}
.row-email {
  width: 20%;
}
.users td {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.users th {
  background: darkblue;
  color: white;
}
.users td,
.users th {
  text-align: center;
  /* padding: 5px 10px; */
  font-weight: 500;
}
.users tr:nth-child(even) {
  background: lightblue;
}
.users tr:hover {
  background-color: rgb(235, 225, 91); 
  font-size: 1.4em;
  border: 2px solid black;
}
.bold{
  font-weight: 800;
  font-size: 1.4em;
}
</style>
