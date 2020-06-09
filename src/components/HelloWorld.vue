<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <button @click="checkAccount">Check Accounts</button>
      <!-- <div class="user-info" v-if="isLoggedIn">(User: {{loggedInAsUser}} )</div> -->
    <form action="" v-if="!isLoggedIn">

      <div class="input-group">
        <input type="text" required v-model="email">
        <span class="highlight"></span>
        <span class="bar"></span>
        <label>Username</label>
      </div>

      <div class="input-group">
        <input type="password" required v-model="password">
        <span class="highlight"></span>
        <span class="bar"></span>
        <label>Password</label>
      </div>
      <div class="input-group">
        <a href="#" v-on:click="submit">SUBMIT</a>
      </div>
    </form>
    <div class="welcome" v-else>
      <h2>Welcome to {{loggedInAsUser}}</h2>
      <Summary />
    </div>
  </div>
</template>

<script>
import Summary from '@/components/summary.vue'

export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
   components: {
    Summary
  },
   computed: {
    loggedInAsUser: function(){
      var x =this.$store.state.user; 
      console.log(`state: ${JSON.stringify(x, null, 3)}`);

      return x;
    },
    isLoggedIn: function(){
      console.log("isLoggedIn is " + this.$store.state.isLoggedIn)
      return this.$store.state.isLoggedIn
    } 
  },
  methods: {
    checkAccount: function(){
      this.$store.dispatch("checkAccounts");
    },
    submit(){
      alert(`submit: ${this.email}`)
      const { email, password } = this
        console.log("login.vue method: login: " + email + "  " + password)
        this.$store.dispatch('login', { email, password })
		   		.then(() => {
						//  this.$router.push('/')
						 
						 })
		   		.catch(err => console.log(err))
		   	}
  },
  data () {
      return {
        user: {
          name: '',
          label: "My Name",
          type: 'text'
        },
        username: '',
        password: 'bkcbkc07',
        email: "brian@gmail.com",
        confirmpassword: '',
        // username: 'aaa',
        // password: 'aaaa',
        // email: "aaa@gmail.com",
        // confirmpassword: 'aaaa',
      }
    },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.hello{
    margin-top: 50px;
  padding: 20px;
}
.hello button{
  font-size: 2em;
}
form {
  display: flex;
  flex-direction: column;
  font-size: 2rem;
  margin: 30px auto;
  max-width: 400px;
}
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
/* https://stackoverflow.com/questions/38301774/how-to-do-floating-of-labels-in-css */
.user-info{
  width: 100px;
  height: 50px;
  font-size: 2em;
}
.input-group {
  position: relative;
  margin: 40px 0 20px;
}

input {
  font-size: 18px;
  padding: 10px 10px 10px 5px;
  display: block;
  width: 300px;
  border: none;
  border-bottom: 1px solid #757575;
}
input:focus {
  outline: none;
}

label {
  color: #999;
  font-size: 18px;
  font-weight: normal;
  position: absolute;
  pointer-events: none;
  left: 5px;
  top: 10px;
  transition: 0.2s ease all;
  -moz-transition: 0.2s ease all;
  -webkit-transition: 0.2s ease all;
}

input:focus ~ label,
input:valid ~ label {
  top: -20px;
  font-size: 14px;
  color: #4285f4;
}

.bar {
  position: relative;
  display:block;
  width:315px;
}

.bar:before,
.bar:after {
  content: '';
  height: 2px;
  width: 0;
  bottom: 1px;
  position: absolute;
  background: #4285f4;
  transition: 0.2s ease all;
  -moz-transition: 0.2s ease all;
  -webkit-transition: 0.2s ease all;
}

.bar:before {
  left: 50%;
}

.bar:after {
  right: 50%;
}

input:focus ~ .bar:before,
input:focus ~ .bar:after {
  width: 50%;
}

.highlight {
  position: absolute;
  height: 60%;
  width: 100px;
  top: 25%;
  left: 0;
  pointer-events: none;
  opacity: 0.5;
}

input:focus ~ .highlight {
  -webkit-animation: inputHighlighter 0.3s ease;
  -moz-animation: inputHighlighter 0.3s ease;
  animation: inputHighlighter 0.3s ease;
}

/* animations */
@-webkit-keyframes inputHighlighter {
  from { background: #4285f4; }
  to   { width: 0; background: transparent; }
}
@-moz-keyframes inputHighlighter {
  from { background: #4285f4; }
  to   { width: 0; background: transparent; }
}
@keyframes inputHighlighter {
  from { background: #4285f4; }
  to   { width: 0; background: transparent; }
}
</style>
