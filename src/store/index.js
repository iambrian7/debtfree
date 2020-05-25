import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios';

import { parseItem, parseList } from './action-utils';

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
 function setInterestRates(a){
   a.iRate =parseFloat(((a.interest / a.new_balance) * 12).toFixed(3));
  //  a.iRate =parseFloat(((a.interest / a.previous_balance) * 12).toFixed(3));
  //  console.log(`iRate: ${a.name} ${a.iRate}`)
  return a
  }

  function setHighCredit(accts){

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
    income: {
      retire: 2480,
      nss: 1370,
      bss: 2000,
      npay: 1571  
    },
    debt: {
      house: 1143,
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
    income: state => {
      return state.income.retire + state.income.nss + state.income.npay + state.income.bss 
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
       state.accounts.filter(removeZeros).forEach(function(a){
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
          // return (m.owner == 'brian') 
          return (m.owner == 'brian' && m.name != "Chase Max") 
        })
        // here we inject minimum percentage for each account
        accts.forEach((a, index) => {
          if (a.previous_balance == 0){
            a.min_percent = 0
          } else {
            a.min_percent = parseFloat(((a.minimum / a.new_balance)*100).toFixed(2))
          }
        })
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
      
      //    if (!localStorage.getItem(STORAGE_KEY)){
        
        console.log(`checkAccounts *********************************************************`)
        const response = await fetch('http://localhost:3019/accounts/accountck');
        const json = await response.json();
         console.log("got checked accounts" + json.length);
        //  console.log("got checked accounts len" + json.message.length);
      },
    async loadAccounts ({ commit }) {
      
         if (!localStorage.getItem(STORAGE_KEY)){
            console.log(`loadAccounts from server  *****************************************`)
            const response = await fetch('./accounts');
            // const response = await fetch('http://localhost:3019/accounts');
            const json = await response.json();
            console.log("got json accounts" + json.length);
            json.forEach(x => x.name = x.name.split('/').join(' '));  // fix name with "/" in name (Discover Card Brian/Nancy)
          //  console.log(`fetched accounts: ${JSON.stringify(json,null,3)}`)
            localStorage.setItem(STORAGE_KEY, JSON.stringify(json))
        commit('loadAccounts',json)            
          } else {
            console.log(`loadAccounts from storage  **************************************`)
            var response = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
            // const response = await fetch('http://localhost:3019/accounts');
            // const json = await response.json();
            // console.log("got json accounts" + json);
            commit('loadAccounts',response)            
        }

        //.then(json => console.log(json)))
      },
      async addAccount ({ commit },account) {
        // var lunches = (await LunchService.index()).data
        var url = "http://localhost:3019/accounts"
        console.log(` adding account ${JSON.stringify(account, null, 3)}`)
        localStorage.removeItem(STORAGE_KEY)
        console.log("actions: addAccount: remove localStorage" )
        const response = await fetch(url, {
          body: JSON.stringify(account), // must match 'Content-Type' header
          headers: {
            // 'user-agent': 'Mozilla/4.0 MDN Example',
            "Content-type": "application/json; charset=UTF-8"
          },
          method: 'POST', // *GET, POST, PUT, DELETE, etc.
        })
        const json = await response.json();
        
        console.log(`Added account from server: ${JSON.stringify(json, null, 3)}`);
        // commit('addAccount',  json)
        commit('addAccount',  account)
        
      },
      async deleteAccount({ commit }, account) {
        console.log(`store: deleteAccount : ${JSON.stringify(account, null, 3) }`);
        localStorage.removeItem(STORAGE_KEY)

        var url = "http://localhost:3019/accounts/"
        try {
          const response = await axios.delete(`${url}${account._id}`);
          parseItem(response, 200);
          commit('DELETE_ACCOUNT', account);
          return null;
        } catch (error) {
          console.error(error);
        }
      },


      // const myHeaders = new Headers();

      // myHeaders.append('Content-Type', 'application/json');
      // myHeaders.append('Authorization', '1234abcd');
      
      // return fetch('http://localhost:8080/clients/', {
      //   method: 'GET',
      //   headers: myHeaders,
      // })


      async updateAccount ({ commit, state },payload) {
        // var lunches = (await LunchService.index()).data
        var url = "http://localhost:3019/accounts/"+payload._id
        console.log(` updateAccount (store.js)=${JSON.stringify(payload, null, 3)}`)
        console.log(` updateAccount (store.js)=${url}`)
        console.log(` updateAccount (store.js) token=${state.token}`)
        const response = await fetch(url, {
          body: JSON.stringify(payload), // must match 'Content-Type' header
          headers: {
            // 'user-agent': 'Mozilla/4.0 MDN Example',
            'authorization': state.token,
            "Content-type": "application/json; charset=UTF-8"
          },
          method: 'PATCH', // *GET, POST, PUT, DELETE, etc.
        })
        const json = await response.json();
        // console.log(json);
        commit('updateAccount',  json)
       },
       // user
     async login({commit}, data){
      console.log(` adding user ${JSON.stringify(data, null, 3)}`)
      commit('auth_request')
      const response = await fetch('http://localhost:3019/user/login', {
          body: JSON.stringify(data), // must match 'Content-Type' header
          headers: {
            "Content-type": "application/json; charset=UTF-8"
          },
          method: 'POST', // *GET, POST, PUT, DELETE, etc.
        })
        const json = await response.json();
        // console.log(json);
        // commit('user added',  json)
        console.log(` response from fetch user ${JSON.stringify(json, null, 3)}`)
        const token = json.token
        const myuser = json.user
        //	debugger
        localStorage.setItem('token', token)
      // Add the following line:
    //  axios.defaults.headers.common['Authorization'] = token
      commit('auth_success', {token, myuser})
  },
    async register({commit}, data){
      console.log(` register user ${JSON.stringify(data, null, 3)}`)
      commit('auth_request')
      const response = await fetch('http://localhost:3019/user/signup', {
          body: JSON.stringify(data), // must match 'Content-Type' header
          headers: {
            "Content-type": "application/json; charset=UTF-8"
          },
          method: 'POST', // *GET, POST, PUT, DELETE, etc.
        })
        const json = await response.json();
        // console.log(json);
        // commit('user added',  json)
        console.log(` response from fetch user ${JSON.stringify(json, null, 3)}`)
        const token = json.token
        const myuser = json.user
        //	debugger
        localStorage.setItem('token', token)
      // Add the following line:
    //  axios.defaults.headers.common['Authorization'] = token
      commit('auth_success', {token, myuser})
  },
       // accounts
  logout({commit}){
    return new Promise((resolve, reject) => {
      console.log(`mystore: actions: logout........`)
        commit('logout')
        localStorage.removeItem('token')
       // delete axios.defaults.headers.common['Authorization']
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
