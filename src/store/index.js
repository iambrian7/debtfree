import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios';

import { parseItem, parseList } from './action-utils';
import AccountService from '@/services/AccountService'

Vue.use(Vuex)
// localStorage persistence
var STORAGE_KEY = 'accounts-vuejs-2.0'
var accountStorage = {
  fetch: function () {
    var accounts = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
    // todos.forEach(function (todo, index) {
    //   todo.id = index
    // })
    // todoStorage.uid = todos.length
    return accounts
  },
  save: function (accounts) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(accounts))
  }
}

function latest(accountsObj){
    var accts = []
    for (var key in accountsObj){
      var len = accountsObj[key].length
      accts.push(accountsObj[key][len-1]) // get last account in each 
    }
    accts = accts.filter(m => {
      return (m.debttype == 'store') || (m.debttype == 'card') || (m.debttype == 'credit')
    })
    accts = accts.filter(m => {
      return (m.owner == 'brian' && m.name != "Chase Max") 
    })
    // console.log(`latestAccounts: ${JSON.stringify(accts, null, 3)}`)
    accts.map(setInterestRates )
    accts.sort((a,b) => {
      var x = a.iRate//new_balance
      var y = b.iRate//new_balance
      if (x > y) {
        return -1;
      } else if (y > x) {
        return 1;
      } else {
        return 0;
      }
      return x - y
    })

return accts
}


function setInterestRates(a){
  a.iRate =parseFloat(((a.interest / a.new_balance) * 12).toFixed(3));
  //  a.iRate =parseFloat(((a.interest / a.previous_balance) * 12).toFixed(3));
  //  console.log(`iRate: ${a.name} ${a.iRate}`)
  return a
}
  function calcTotals(accounts){
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
    }
function getAccountsObject(accts){
  function removeZeros(a){
    return a.new_balance > 300 * 100; // nothing less than $200
  }
   var accountsObj = {}
  //  accts.filter(removeZeros).forEach(function(a){
   accts.forEach(function(a){
     if (!accountsObj[a.name]){
       accountsObj[a.name] = [a]
      } else {
        accountsObj[a.name].push(a)
      }
    })
    return accountsObj
}


export default new Vuex.Store({
  state: {
    count: 600,
    lunches: [],
    groups: [],
    accounts: [],
    selectedAccount: 'Discover 2',
    acctObj: {},
    isLoggedIn: false,
    token: localStorage.getItem('token') || '',
    user : {},
    users: [],
    latest: [],
    income: {
      retire: 2480,
      nss: 1370,
      bss: 2000,
      npay: 1571  
    },
    debt: {
      house: 950,
      property_tax: 153,
      ins: 125
    },
    info: {
    start_bal:{minimum: 63000,name:"Start",datedue: 0,payment:63700,debttype: 'credit',statement_date: new Date()},
    pansion:{minimum: 243500,name:"Pension",datedue: 1,payment:243500,debttype: 'credit',statement_date: new Date()},
    rent:{minimum: 30000,name:"Rent",datedue: 1,payment:30000,debttype: 'credit',statement_date: new Date()},
    nancypay1:{minimum: 70000,name:"NancyPay1",datedue: 8,payment:70000,debttype: 'credit',statement_date: new Date()},
    nancypay2:{minimum: 70000,name:"NancyPay2",datedue: 20,payment:70000,debttype: 'credit',statement_date: new Date()},
    brianss:{minimum: 184600,name:"BrianSS",datedue: 19,payment:184600,debttype: 'credit',statement_date: new Date()},
    nancyss:{minimum: 123500,name:"NancySS",datedue: 12,payment:123500,debttype: 'credit',statement_date: new Date()},
    mortgage:{minimum: 118300,name:"Mortgage",datedue: 15,payment:118300,debttype: 'card',statement_date: new Date('2019-12-15')}}
  },
  getters: {
    cc_min_payments: state => {
      // filteredAccounts: function(){
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
      
      this.totals = calcTotals(accounts);
      return accounts
      // },
    },
    debt: state => {
      return state.debt.house + state.debt.ins + state.debt.property_tax 
    },
    income: state => {
      return state.income.retire + state.income.nss + state.income.npay + state.income.bss 
    },
    latestMin: state => {
      return state.latest.reduce((a,b) =>{
        return a + b.minimum
      },0);
    },
    getAcctObj: state => {
      return state.acctObj;
    },
    getHouseDebt: state => {
      return state.debt.house
      // return state.debt.house + state.debt.property_tax + state.debt.ins 
    },
    totalIncome: state => {
    var x = 0
      for (var key in state.income) {
        // console.log(key, state.income[key]);
        x += state.income[key]
      }
      return x
    },
    lunches: state => {
      return state.lunches
    },
    accounts: state => {
      return state.accounts
    },
    // getAllMonths: state => {
    //   return ['one']
    // },
    getAllMonths: state => {
      var m = []
      var o = getAccountsObject(state.accounts);
      for (var key in o){
      //  var s = o[key].statment_date
        o[key].forEach(a => {
          // console.log(`name = ${a.name}`)
          var d = new Date(a.statement_date)
          var x = d.getFullYear() + '/' + d.getMonth()
          if (!m.includes(x))
            m.push(x)
          // console.log(`.....year = ${d.getFullYear()} month=${d.getMonth()}`)
        })
      }
      return m.sort()
    },
    getAccountHistory: state => key => {
      var accountsObj = {}
      state.accounts.forEach(function(a){
        if (!accountsObj[a.name]){
          accountsObj[a.name] = [a]
         } else {
           accountsObj[a.name].push(a)
         }
       })
      return accountsObj[key];
    },
    latestAccounts: state => {
      function removeZeros(a){
        return a.new_balance > 300 * 100; // nothing less than $200
      }
       var accountsObj = {}
       state.accounts.forEach(function(a){
      //  state.accounts.filter(removeZeros).forEach(function(a){
         if (!accountsObj[a.name]){
           accountsObj[a.name] = [a]
          } else {
            accountsObj[a.name].push(a)
          }
        })
        var accts = []
        for (var key in accountsObj){
          var len = accountsObj[key].length
          accts.push(accountsObj[key][len-1]) // get last account in each 
        }
        accts = accts.filter(m => {
          return (m.debttype == 'store') || (m.debttype == 'card') || (m.debttype == 'credit')
        })
        accts = accts.filter(m => {
          return (m.owner == 'brian' && m.name != "Chase Max") 
        })
        // here we inject minimum percentage for each account
        accts.map(setInterestRates )
        accts.sort((a,b) => {
          var x = a.iRate//new_balance
          var y = b.iRate//new_balance
          if (x > y) {
            return -1;
          } else if (y > x) {
            return 1;
          } else {
            return 0;
          }
          return x - y
        })
        // accts.sort(function(a, b){
          //   var x = a.new_balance
          //   var y = b.new_balance
          //   return x - y
          // })
          // console.log(`sorted accts: ${JSON.stringify(accts, null, 3)}`)
          return accts
        },
        groups: state => {
          return state.groups
        }
      },
  mutations: {
    loadAccounts (state,payload){
      console.log(`mutations: payload: ${payload.length}`)
      state.acctObj = getAccountsObject(payload);
      console.log(`state.acctObj len=${Object.keys(state.acctObj).length}`)
      state.accounts = payload
      // get latest set of accounts 
      state.latest = latest(state.acctObj)
    },
    addAccount (state,payload){
      state.accounts.push(payload)
    },
    updateAccount (state,payload){
      console.log(` updateAccount (store.js)=${JSON.stringify(payload, null, 3)}`)
      //state.accounts.push(payload)
    },
    increment (state) {
      state.count++
    },
    auth_users(state, {token, users}){
			state.users = users
		},
		auth_request(state){
	    	state.status = 'loading'
	  	},
    auth_success(state, payload){
    // auth_success(state, {token, user}){
      state.status = 'success'
      state.token = payload.token
      console.log(`saving state user to ${JSON.stringify(payload, null, 3)}`)
      state.user = payload.myuser
      state.isLoggedIn = true
    },
    auth_error(state){
      state.status = 'error'
    },
    logout(state){
      state.status = ''
      state.token = ''
      state.isLoggedIn = false
    },
    DELETE_ACCOUNT(state, account){
      // [DELETE_HERO](state, hero) {
        state.accounts = [...state.accounts.filter(p => p._id !== account._id)]; // replace heroes
      //},
    }

  },
  actions: {
    // accounts
    async checkAccounts ({ commit }) {
      const response = await fetch('/accounts/accountck');
      const json = await response.json();
      console.log(`store:actions:checkAccounts: accounts len = ${json.length}`)
    },
    async loadAccounts ({ commit }) {
        console.log(`loadAccounts from server  **************************************`)
        const json =  (await AccountService.index()).data
        json.forEach(x => x.name = x.name.split('/').join(' '));  // fix name with "/" in name (Discover Card Brian/Nancy)
        localStorage.setItem(STORAGE_KEY, JSON.stringify(json))
        commit('loadAccounts',json)  
        },
    async addAccount ({ commit },account) {
      localStorage.removeItem(STORAGE_KEY)
      console.log(`store: addAccount : ${JSON.stringify(account, null, 3) }`);
      commit('addAccount',  (await AccountService.post(account)).data)
    },
    async deleteAccount({ commit }, account) {
      console.log(`store: deleteAccount : ${JSON.stringify(account, null, 3) }`);
      localStorage.removeItem(STORAGE_KEY)
      commit('DELETE_ACCOUNT',  (await AccountService.delete(account._id)).data)
    },
    async updateAccount ({ commit, state },payload) {
      console.log(`store: updateAccount : ${JSON.stringify(payload, null, 3) }`);
    const json =  (await AccountService.put(payload)).data
    commit('updateAccount',  json)
    },
       // user
     async login({commit}, data){
      commit('auth_request')
      const response = await fetch('/user/login', {
          body: JSON.stringify(data), // must match 'Content-Type' header
          headers: {
            "Content-type": "application/json; charset=UTF-8"
          },
          method: 'POST', // *GET, POST, PUT, DELETE, etc.
        })
        const json = await response.json();
        const token = json.token
        const myuser = json.user
        localStorage.setItem('token', token)
      commit('auth_success', {token, myuser})
  },
    async register({commit}, data){
      console.log(` register user ${JSON.stringify(data, null, 3)}`)
      commit('auth_request')
      const response = await fetch('/user/signup', {
          body: JSON.stringify(data), // must match 'Content-Type' header
          headers: {
            "Content-type": "application/json; charset=UTF-8"
          },
          method: 'POST', // *GET, POST, PUT, DELETE, etc.
        })
        const json = await response.json();
        const token = json.token
        const myuser = json.user
        localStorage.setItem('token', token)
      commit('auth_success', {token, myuser})
  },
       // accounts
  logout({commit}){
    return new Promise((resolve, reject) => {
        commit('logout')
        localStorage.removeItem('token')
        resolve()
    })
  },
  reset({commit}){
    localStorage.removeItem(STORAGE_KEY)
  },
  },
  modules: {
  }
})
