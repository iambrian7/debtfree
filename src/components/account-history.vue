<template>
    <div id="account-history">
      <div class="nav-account">
        <h1>All records of <span>{{name}} </span> account-history</h1>
      </div>
    <div class="account-edit">
      <div class="controls">
        <button @click="submitAdd">Save</button>
        <button @click="cancelUpdate">Cancel</button>
      </div>
    </div>

    <div class="full-accounts">
      <!-- <p>Test input for datedue: <input type="text" class="w0" v-model="newAccount.datedue"></p> -->
      <table class="customers">
      <tr>
            <th class="w0">Due</th>
            <th>Date</th>
            <th>Bal</th>
            <th>New Bal</th>
            <th>Diff</th>
            <th>Interest</th>
            <th>Paid</th>
            <th>Purchases</th>
            <th>Min Due</th>
            <th>Pay Off</th>
            <th>Pay Off Run</th>
          </tr>
      <!-- <tr v-for="(a,i) in latestAccounts" :key="i" > -->
      <tr v-for="(a,i) in accountList" :key="i" >
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
        <tr class="tr-edit">
              <td><input type="text" class="w0" v-model="newAccount.datedue"></td>
              <td><input type="text" class="w1" v-model="newAccount.statement_date"></td>
              <td><input type="text" class="w1" v-model="newAccount.previous_balance"></td>
              <td><input type="text" class="w1" v-model="newAccount.new_balance"></td>
              <td>{{newAccount.previous_balance - newAccount.new_balance | all | currency}}</td>
              <td><input type="text" class="w1" v-model="newAccount.interest"></td>
              <td><input type="text" class="w1" v-model="newAccount.payment"></td>
              <td><input type="text" class="w1" v-model="newAccount.purchases"></td>
              <td><input type="text" class="w1" v-model="newAccount.minimum"></td>
          </tr>
    </table>

    </div>


    </div>
  </template>
  <script>
  
  
  //  module.exports = {
  export default {
    name: 'accountHistory',
     data: function() {
          return {
            name: "account name",
            edit: true,
            listLimit: 10,
            newAccount: null,
            latestAccounts: [],
            totalPayoff: 0,
          }
      },
      computed: {
        accountList: function(){
          var name = this.name;
            var acctObj = this.$store.getters.getAcctObj;
            var list =  acctObj[name];
            list.sort(function(a, b){
              var x = a.statement_date
              var y = b.statement_date
              return x - y
            })
         return list.filter(this.last10)
        }
      },
      //  watch: {
      //    list: {
      //      handler: function (list) {
      //        // todoStorage.save(todos)
      //         this.populateNewAccount(this.list[this.list.length-1])
      //       },
      //       // deep: true
      //     }
      //   },
      methods: {
        // showFocus(e){
        //   console.log("show focus")
        // },
        getLatest(name){
            console.log(`accountList: ${name}`)
            var acctObj = this.$store.getters.getAcctObj;

            var list =  acctObj[name];
            list.sort(function(a, b){
              var x = a.statement_date
              var y = b.statement_date
              return x - y
            })
         this.populateNewAccount(list[list.length-1])
         return list.filter(this.last10)
        },
        belowZero: function(a){
          return a.previous_balance - a.new_balance < 0;
        },
        deleteAccount: function(item){
          if (confirm(`Are you sure you want to delete this ${item.statement_date} from ${item.name} account?`)) {
            // delete this item._id
          console.log(`delete id = ${item._id}`)
          } else {
            
          }
        },
        populateNewAccount: function(acct){
          // var len = acct.length-1;

          var slist = JSON.stringify(acct);
          // console.log(`last acct=${JSON.stringify(acct, null, 3)}`)
          this.newAccount = JSON.parse(slist);
          // console.log(`populateNewAcct:statement_date=${acct.statement_date}`)
          var next = this.nextMonth(acct.statement_date)
          this.newAccount.previous_balance = this.newAccount.new_balance / 100;
          this.newAccount.new_balance = 0;
          this.newAccount.minimum = this.newAccount.minimum / 100;
          this.newAccount.interest = this.newAccount.interest / 100;
          this.newAccount.payment = this.newAccount.payment / 100;
          this.newAccount.purchases = this.newAccount.purchases / 100;
          this.newAccount.statement_date = next.toISOString().split('T')[0];//`${next.getFullYear()}/${next.getMonth()+1}/${next.getDate()+1}`;
          // this.newAccount.statement_date = next.toLocaleString();
          // console.log(`new statement_date=${next.toLocaleString()}`)
          // console.log(`iso statement_date=${ next.toISOString().split('T')}`)
          // console.log(`this.newAccount.statement_date=${this.newAccount.statement_date}`)
         
        },
        nextMonth: function(d){
          var now = new Date(d);
          var current = new Date(now.getFullYear(), now.getMonth()+1, now.getDate()+1);
          return current;
        },
        submitAdd: function(){
          console.log(`account-history:add this account....`);
       //   if (this.newAccount.new_balance == 0){
       //     alert("enter new balance")
       //   } else {
            var a = this.newAccount;
            delete a._id;
            delete a.iRate;
            delete a.min_percent;
            delete a._id;
            a.previous_balance = a.previous_balance*100;
            a.new_balance = a.new_balance*100;
            a.minimum = a.minimum*100;
            a.interest = a.interest*100;
            a.purchases = a.purchases*100;
            a.payment = a.payment*100;
              // console.log(`adding ${JSON.stringify(this.newAccount, null, 3)}`);
              if (confirm(`Are you sure you want to save \n 
              prev = ${a.previous_balance} \n
              prev = ${a.new_balance} \n
              this thing into the database?`)) {
                // Save it!
              this.$store.dispatch("addAccount", this.newAccount);
              this.$store.dispatch("loadAccounts");
              this.$router.push({path:`/account`})
            } else {
                // Do nothing!
                alert('canceling the update')
                this.cancelUpdate();
            }
         // }
        },
        cancelUpdate: function(){
           this.$router.push({path:`/account`})
          // this.newAccount = JSON.parse(JSON.stringify(this.list[this.list.length-1]));
          // this.newAccount = null;
        },
        inMonths: function(d1, d2) {
            var d1Y = d1.getFullYear();
            var d2Y = d2.getFullYear();
            var d1M = d1.getMonth();
            var d2M = d2.getMonth();

            return (d2M+12*d2Y)-(d1M+12*d1Y);
        },
        last10(a, index){
      //    debugger
          var d = new Date()
          var d1 = new Date(a.statement_date)
          var diff = this.inMonths(d1,d)
       //   console.log(`account ${a.name} diff = ${diff}`)
          if (diff > this.listLimit){
            return false
          } else {
            return true

          }
        },
      },
      created(){
        // debugger
        console.log("created account-history.vue")
        console.log('created: name=' +  this.$route.params.id)
        this.name = this.$route.params.id;
        this.getLatest(this.name);
        // x = this.$store.getters.getMeetingById( this.$route.params.id*1)

        this.$store.watch(
          (state)=>{
            return this.$store.state.accounts // could also put a Getter here
          },
          (newValue, oldValue)=>{
            //something changed do something
            // console.log(oldValue)
            // console.log(newValue)
             var sortKey = "datedue"
              var latest = this.$store.getters.latestAccounts
              latest.sort(function (a, b) {
                a = a[sortKey]
                b = b[sortKey]
                return (a === b ? 0 : a > b ? 1 : -1) * 1
              })
              this.totalPayoff = 0;
              
              this.latestAccounts = latest.map(x => {
                this.totalPayoff += x.minimum - x.interest ;
                x.payoff = this.totalPayoff; 
                return x;
              })
              console.log(`watching for accounts: latestAccounts: len =  ${this.latestAccounts.length}`);
                 // this.populateNewAccount(this.list[this.list.length-1])
              this.getLatest(this.name);
          },
              //Optional Deep if you need it
            {
              deep:true
            }
          )
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
  #account-history{
    /* max-width: 70vw; */
  }
  table{
    /* max-width: 70%; */
    table-layout: fixed;
  }
  .controls{
    display: flex;
   justify-content: space-evenly;
  }
  .controls button{
    font-size: 2rem;

  }
  .nav-account{
    text-align: center;
  }
    .nav-account span{
      font-size: 2.0em;
      padding: 5px 15px;
      color: black;
      font-weight: 400;
      margin: 0 auto;
      border: 1px solid green;
      border-radius: 10px;
    }
    .list-item{
      display: flex;
      justify-content: space-evenly;
      border: 1px solid black;
      padding: 5px;
      font-size: 1.2em;
    }
    .list-item span {
      display: table-cell;
    }
    .customers {
      font-family: "Trebuchet MS", Arial, Helvetica, sans-serif;
      border-collapse: collapse;
      width: 100%;
      font-size: 1.2em;
      /* margin: 10px; */
      /* padding: 5px; */
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
    .account-edit{
      margin-top: 20px;
      padding: 10px;
    }
    .account-edit form{
      display: flex;
      justify-content: center;
      align-items: center;
      flex-wrap: wrap;
      padding: 20px;
      font-size: 1.4rem;
    }
    .account-edit label{
      /* flex: 0 0 200px; */
      margin: 10px;
    }
    .account-edit input{
        font-size: 2rem;
        width: 200px;
    }
      .w0{
        width: 50px;
      }
      .w1{
        width: 100px;
      }
      .w2{
        width: 200px;
      }
      .w3{
        width: 300px;
      }
      .red{
        background: rgb(230, 62, 62);
        color: white;
      }
    .tr-edit td{
      font-size: 1.2em;
    }
/* .inline-label { 
    white-space: nowrap;
    max-width: 250px;
    overflow: hidden;
    text-overflow: ellipsis;
    float:left;     
    } */
  </style>
  
  