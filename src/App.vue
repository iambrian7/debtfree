<template>
  <div id="app">
     <flex-bar></flex-bar>
    <!-- <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/account">Account</router-link> |
      <router-link to="/about">About</router-link>
    </div> -->
       <div class="editor">
       <router-view/>
    </div>
    <!--Footer-->
    <div class="footer">
      <div class="footer-file-info">
        <span class="file-info-source">src/styles.less</span>
        <span class="file-info-location">2:5</span>
        </div>
      <div class="footer-controls">
        <a href="">LF</a>
        <a href="">UTF-8</a>
        <a href="">Less</a>
        <a href=""><span class="icon-git-branch"></span>master</a>
        <a href="">⬇︎ 5 ⬆︎</a>
        <a href=""><span class="icon-diff"></span>1 file</a>
        <a href=""><span class="icon-squirrel"></span></a>
      </div>
      <!-- end footer -->
    </div>
  </div>
</template>
<script>
// @ is an alias to /src
import FlexBar from '@/components/FlexBar.vue'

export default {
  name: 'home',
  components: {
    "flex-bar": FlexBar
  }
}
</script>
<style>
body {
      background-color: #d7dae0;
      font-family: -apple-system, system-ui, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
      font-size: 0.8rem;
      color: #2c313a;
      margin: 0;
    }
#app {
    display: grid;
    grid-template-rows: 30px auto 30px;
    grid-template-columns: 300px 1fr;
    height: 100vh;
}
#nav {
    display: flex;
    grid-column-start: 1;
    grid-column-end: 3;
    justify-content: space-evenly;
}
.editor{
  display: grid;
    grid-column-start: 1;
    grid-column-end: 3;
    height: calc(100vh - 60px);
    overflow: auto;
}
    .footer {
      display: grid;
      grid-template-columns: 1fr auto;
      grid-column-start: 1;
      grid-column-end: 3;
      background: #42b983;
    }
    .footer-file-info {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .footer-controls {
      display: flex;
      height: 100%;
      justify-content: flex-end;
    }
    .footer-controls a {
      height: 100%;
      display: flex;
      align-items: center;
    }

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
