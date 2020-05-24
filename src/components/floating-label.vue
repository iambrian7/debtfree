<template>
  <div class="floating-label">
    <h1>{{ msg }}</h1>
    <div class="form">
      <input type="text" name="name" autocomplete="off" required>
      <label for="name" class="label-name">
        <span class="content-name">{{ info.label}}</span>
      </label>
    </div>
  </div>
</template>

<script>

export default {
  name: 'floating-label',
  props: ['info'],
  data(){
    return {
      msg: "Floating Label"
    }
  },
  mounted(){
    console.log(`prop info= ${JSON.stringify(this.info, null, 3)}`)
  } 
}
</script>

<style>
 .floating-label{
   margin: 30px;
   /* border-bottom: 3px solid red; */
 }
 .form{
   width: 50%;
   position: relative;
   height: 50px;
   background: blue;
   overflow: hidden;
 }
 .form input{
   width: 100%;
   height: 100%;
   color: #595f6e;
   padding-top: 20px;
   border: none;
   outline: none;
 }
 .form label{
   position: absolute;
   bottom: 0px;
   left: 0px;
   width: 100%;
   height: 100%;
   pointer-events: none;
   border-bottom: 1px solid black;
 }
 .form label::after{
   content: '';
   position: absolute;
   left: 0px;
   bottom: -1px;
   width: 100%;
   height: 100%;
  border-bottom: 3px solid #5fa8d3;
  transform: translateX(-100%);
  transition: transform 0.3s ease;
 }
 .content-name{
   position: absolute;
   left: 0px;
   bottom: 5px;
   transition: all 0.3s ease;
 }
 .form input:focus + .label-name .content-name,
 .form input:valid + .label-name .content-name
 {
   transform: translateY(-150%);
   font-size: 14px;
   color: #5fa8d3;
 }
 .form input:focus + .label-name::after,
 .form input:valid + .label-name::after {
   transform: translateX(0%);
 }

</style>