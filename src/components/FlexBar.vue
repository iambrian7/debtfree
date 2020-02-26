<template>
<div class="fixed-spacer">
  <div class="nav">
    <div class="nav-header">
      <div class="nav-title-bar">
        <router-link to="/">DebtFreeBitch</router-link>
      </div>
    </div>
    <div class="nav-btn">
      <label for="nav-check"  ref="navchk">
        <span></span>
        <span></span>
        <span></span>
      </label>
    </div>
    <input type="checkbox" id="nav-check">
    <div class="nav-links">
      <router-link to="/"  @click="trigger" >Home</router-link>
      <router-link to="/account"  @click="trigger" >Account</router-link>
    </div>
    <div class="nav-login vertical-center" >
      <button @click="resetLocalstorage">Reset</button>
      <!-- <router-link to="/login"  @click="trigger" >Login</router-link> -->
       <router-link to="/login" v-if="!isLoggedIn"> Login</router-link>
         <!-- <router-link @click="logout" v-if="isLoggedIn">{{user}} Logout</router-link> -->
         <a @click="logout" v-else> Logout</a>
         <div class="user-nav" v-if="isLoggedIn">( {{user}} )</div>
    </div>
  </div>
  </div>
</template>

<script>
module.exports = {
  name: 'flexbar',
  // props: ['items'],
  data () {
    return {
      resp: false,
      triggerClick: 0
    }
  },
   computed: {
    user: function(){
      var x =this.$store.state.user 
      console.log(`state: ${JSON.stringify(x, null, 3)}`)

      return this.$store.state.user
    },
    isLoggedIn: function(){
      console.log("isLoggedIn is " + this.$store.state.isLoggedIn)
      return this.$store.state.isLoggedIn
    } 
  },
  methods:{
    resetLocalstorage(){
      console.log("reset localstorage" + this.$store.state.isLoggedIn)
      localStorage.removeItem(STORAGE_KEY)
       this.$store.dispatch("loadAccounts")
    },
    logout(){
      // this.$store.state.isLoggedIn = false
      this.$store.dispatch('logout')
    },
  	trigger () {
      console.log('trigger................' + this.triggerClick++)
    	this.$refs.navchk.click()
    }
  },
  created(){
      // debugger
      console.log("created FlexBar.vue")
    }
}
</script>

<style>
      * {
      box-sizing: border-box;
    }
    .vertical-center {
      margin: 0;
      position: absolute;
      top: 50%;
      right: 0;
      margin-right: 30px;
      -ms-transform: translateY(-50%);
      transform: translateY(-50%);
    }
    .vertical-center > a{
      color: wheat;
    }
    .user-nav{
      font-size: 14px;
      color: wheat;
    }
    body {
      margin: 0px;
      font-family: 'segoe ui';
    }
    .fixed-spacer{
      height: 50px;
    }
    .nav {
      height: 50px;
      width: 100%;
      background-color: #4d4d4d;
      position: fixed;
    }

    .nav > .nav-header {
      display: inline;
    }

    .nav > .nav-header > .nav-title-bar {
      display: inline-block;
      font-size: 22px;
      color: #fff;
      /* padding: 10px 10px 10px 10px; */
    }

    .nav > .nav-btn {
      display: none;
    }

    .nav > .nav-links {
      display: inline;
      /* float: left; */
      font-size: 18px;
      padding-left: 60px;
    }
    .nav > .nav-login {
      display: inline;
      float: right;
      font-size: 12px;
    }
    .nav > .nav-header > .nav-title-bar > a,
    .nav > .nav-links > a {
      display: inline-block;
      padding: 13px 10px 13px 10px;
      text-decoration: none;
      color: #efefef;
    }

    .nav > .nav-links > a:hover {
      background-color: rgba(0, 0, 0, 0.3);
    }

    .nav > #nav-check {
      display: none;
    }

    @media (max-width:600px) {
      .nav > .nav-btn {
        display: inline-block;
        position: absolute;
        right: 0px;
        top: 0px;
      }
      .nav > .nav-btn > label {
        display: inline-block;
        width: 50px;
        height: 50px;
        padding: 13px;
      }
      .nav > .nav-btn > label:hover {
        background-color: rgba(0, 0, 0, 0.3);
      }
      .nav > .nav-btn > label > span {
        display: block;
        width: 25px;
        height: 10px;
        border-top: 2px solid #eee;
      }
      .nav > .nav-links {
        position: absolute;
        display: block;
        width: 100%;
        background-color: #333;
        height: 0px;
        transition: all 0.3s ease-in;
        overflow-y: hidden;
        top: 50px;
        left: 0px;
      }
      .nav > .nav-links > a {
        display: block;
        width: 100%;
      }
      .nav > #nav-check:not(:checked) + .nav-links {
        height: 0px;
      }
      .nav > #nav-check:checked + .nav-links {
        height: calc(100vh - 50px);
        overflow-y: auto;
      }
    }
</style>
