/**
* Created by vouill on 11/13/17.
*/

<template>
  <div class="login-vue session">
    <div class="left">

    </div>
    <div class="right">
      
      
    <div id="login" v-if="!openRegister">
      <form class="login" @submit.prevent="login">
         <FloatingLabel :info="user"/>

        <label>Email</label>
        <input required v-model="email" type="text" placeholder="aaa@gmail.com"/>
        <label>Password</label>
        <input required v-model="password" type="password" placeholder="Password"/>
        <hr/>
        <button type="submit">Login</button>
      </form>
      <div class="login-container">
        <!-- <button @click="openRegister = !openRegister">Please Login</!-->
        <p @click="openRegister = !openRegister">click to Register</p>
      </div><!--end login-container  -->
    </div>
    <div id='register' v-if="openRegister">
        <form class="register" @submit.prevent="register">
          <label>User name</label>
          <input required v-model="username" type="text" placeholder="user name..."/>
          <label>Email</label>
          <input required v-model="email" type="text" placeholder="email..."/>
          <label>Password</label>
          <input required v-model="password" type="password" placeholder="Password..."/>
          <label>Confirm Password</label>
          <input required v-model="confirmpassword" type="password"/>
          <hr/>
          <button type="submit">Register</button>
        </form>
      <div class="login-container">
        <!-- <button @click="openRegister = !openRegister">Please Login</!-->
        <p @click="openRegister = !openRegister">click to Login</p>
      </div><!--end login-container  -->
    </div>
    </div> <!-- end of .right -->
  </div>
</template>

  <style lang="scss">
  /* * {
  font-family: -apple-system, BlinkMacSystemFont, "San Francisco", Helvetica, Arial, sans-serif;
  font-weight: 300;
  margin: 0;
} */
  .login-vue{
    background: white;
    display: flex;
    font-family: -apple-system, BlinkMacSystemFont, "San Francisco", Helvetica, Arial, sans-serif;
  font-weight: 300;
  margin: 0;
  }
  button{
    border-radius: 10px;
  }
  .login-container{
    font-size: 12px;
    font-style: italic;
    border: 1px solid gray;
    border-radius: 5px;
    padding: 0;
    margin: 5px 30px;
    text-align: center;
    cursor: pointer;
  }
  .login-container p{
    padding: 2px;
  }
  .login-container:hover{
    background: #b69de6;
  }
  /* .login-container button{
    font-size: 2em;
    padding: 10px;
    margin: 20px;
    background: rgb(110, 110, 216)
  } */
    /* #register,
  #login{
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 2rem;
  } */
  .register,
  .login {
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 10px;
  }
   /* .register input,
  .login input {
    font-size: inherit;
    padding: 10px;
    margin: 10px;
  } */
   .register button,
  .login button {
    width: 300px;
    background: rgb(213, 233, 36);
    font-size: 2em;
    margin: 0 20px;
  }

  /* CSS-Only Accessible Floating Labels from ( https://codepen.io/elujambio/pen/yjwzGP?editors=0100 ) */

  
h4 {
  font-size: 24px;
  font-weight: 600;
  color: #000;
  opacity: .85;
}

/* label {
  font-size: 12.5px;
  color: #000;
  opacity: .8;
  font-weight: 400;
} */

form {
  padding: 40px 30px;
  background: #fefefe;
  display: -webkit-box;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
          flex-direction: column;
  -webkit-box-align: start;
          align-items: flex-start;
  padding-bottom: 20px;
}
form h4 {
  margin-bottom: 20px;
  color: rgba(0, 0, 0, 0.5);
}
form h4 span {
  color: black;
  font-weight: 700;
}
form p {
  line-height: 155%;
  margin-bottom: 5px;
  font-size: 14px;
  color: #000;
  opacity: .65;
  font-weight: 400;
  max-width: 200px;
  margin-bottom: 40px;
}

a.discrete {
  color: rgba(0, 0, 0, 0.4);
  font-size: 14px;
  border-bottom: solid 1px rgba(0, 0, 0, 0);
  padding-bottom: 4px;
  margin-left: auto;
  font-weight: 300;
  -webkit-transition: all .3s ease;
  transition: all .3s ease;
  margin-top: 40px;
}
a.discrete:hover {
  border-bottom: solid 1px rgba(0, 0, 0, 0.2);
}

.session button {
  -webkit-appearance: none;
  width: auto;
  min-width: 100px;
  border-radius: 24px;
  text-align: center;
  padding: 15px 40px;
  margin-top: 5px;
  background-color: #b08bf8;
  color: #fff;
  font-size: 14px;
  margin-left: auto;
  font-weight: 500;
  box-shadow: 0px 2px 6px -1px rgba(0, 0, 0, 0.13);
  border: none;
  -webkit-transition: all .3s ease;
  transition: all .3s ease;
  outline: 0;
}
button:hover {
  -webkit-transform: translateY(-3px);
          transform: translateY(-3px);
  box-shadow: 0 2px 6px -1px rgba(182, 157, 230, 0.65);
}
button:hover:active {
  -webkit-transform: scale(0.99);
          transform: scale(0.99);
}

input {
  font-size: 16px;
  padding: 20px 0px;
  height: 56px;
  border: none;
  border-bottom: solid 1px rgba(0, 0, 0, 0.1);
  background: #fff;
  min-width: 280px;
  box-sizing: border-box;
  -webkit-transition: all .3s linear;
  transition: all .3s linear;
  color: #000;
  font-weight: 400;
  -webkit-appearance: none;
}
input:focus {
  border-bottom: solid 1px #b69de6;
  outline: 0;
  box-shadow: 0 2px 6px -8px rgba(182, 157, 230, 0.45);
}


.session {
  display: -webkit-box;
  display: flex;
  -webkit-box-orient: horizontal;
  -webkit-box-direction: normal;
          flex-direction: row;
  width: auto;
  height: auto;
  margin: auto auto;
  background: #ffffff;
  border-radius: 4px;
  box-shadow: 0px 2px 6px -1px rgba(0, 0, 0, 0.12);
}
  .left {
  width: 220px;
  height: auto;
  min-height: 100%;
  position: relative;
  background-image: url("https://images.pexels.com/photos/114979/pexels-photo-114979.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940");
  background-size: cover;
  border-top-left-radius: 4px;
  border-bottom-left-radius: 4px;
}
.left svg {
  height: 40px;
  width: auto;
  margin: 20px;
}

</style>

<script>
 // import {AUTH_REQUEST} from 'actions/auth'
   import FloatingLabel from '@/components/floating-label.vue'
// module.exports = {
export default {
    name: 'login',
    components: {
      FloatingLabel
    },
    data () {
      return {
        user: {
          name: '',
          label: "My Name",
          type: 'text'
        },
        username: '',
        password: '',
        email: "",
        confirmpassword: '',
        // username: 'aaa',
        // password: 'aaaa',
        // email: "aaa@gmail.com",
        // confirmpassword: 'aaaa',
        is_admin : null,
        openRegister: false
      }
    },
    methods: {
      register: function () {
        let data = {
          name: this.username,
            email: this.email,
            password: this.password,
            is_admin: this.is_admin
        }
        console.log(`register user ${JSON.stringify(data, null, 3)}`)
        this.$store.dispatch("register", data)
        .then(() => this.$router.push('/'))
        .catch(err => console.log(err))
      },
      login: function () {
        const { email, password } = this
        console.log("login.vue method: login: " + email + "  " + password)
        this.$store.dispatch('login', { email, password })
		   		.then(() => {
						 this.$router.push('/')
						 
						 })
		   		.catch(err => console.log(err))
		   	}
        // this.$store.dispatch(AUTH_REQUEST, { username, password }).then(() => {
        //   this.$router.push('/')
        // })
      //}
    },
   created(){
      // debugger
      console.log("created login.vue")
 
    }
  }
</script>
