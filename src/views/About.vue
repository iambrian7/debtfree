<template>
  <div class="about">
    <h1>This is an about page</h1>
    <form>
        <div class="floating-label-wrap">
        <input type="text" class="floating-label-field floating-label-field--s3" id="field-1" placeholder="Text">
        <label for="field-1" class="floating-label">Text</label>
        </div>


        <div class="floating-label-wrap">  
        <textarea class="floating-label-field floating-label-field--s1" id="field-7" placeholder="Textarea" row="15"></textarea>
        <label for="field-7" class="floating-label">Textarea</label>
        </div><!-- .floating-label-wrap -->
    </form>
  </div>
</template>
<style scoped>
/* <style> */
.about
{
    font-family: "Varela Round";

    color: #eee;
    background-color: #2c3e50;
}

a {
  color: #fff;
}
form{
    width: 200px;
    margin: 0 auto;
    font-size: 2em;
    display: flex;
    justify-items: space-around;
}
.floating-label-wrap{
    flex: 1;
    margin: 0 20px;
}
/* Making the label break the flow */
.floating-label
{
    position: absolute;
    top: 0;
    left: 0;
    user-select: none;
     z-index: 1500;
}

/* Hide the browser-specific focus styles */
.floating-label-field
{
    color: rgba(44, 62, 80, .75); 
    border-width: 0;
    z-index: 2000;
}
.floating-label-field:focus
{
    outline: 0;
    box-shadow: 0;
}
.floating-label-field::placeholder
{
    color: rgba(44, 62, 80, .5);
}

/* Make the label and field look identical on every browser */
.floating-label,
.floating-label-field
{
    font: inherit;
    line-height: 1; 

    display: block;

    width: 100%;
}

.floating-label-field,
.floating-label-wrap
{
    position: relative;
}

/* Input Style #1 */
.floating-label-field--s1
{
    transition: border-color .25s ease-in-out;

    color: rgba(255, 255, 255, .75); 
    border-bottom: 3px solid rgba(255, 255, 255, .05);
    background-color: transparent;
}
.floating-label-field--s1 + .floating-label
{
    transition: transform .25s, opacity .25s ease-in-out;
    transform-origin: 0 0;

    opacity: .5;
}
.floating-label-field--s1:focus,
.floating-label-field--s1:not(:placeholder-shown)
{
    border-color: rgba(255, 255, 255, .1);
}
.floating-label-field--s1:focus + .floating-label,
.floating-label-field--s1:not(:placeholder-shown) + .floating-label
{
    transform: translate(.25em, -30%) scale(.8);

    opacity: .25;
}
.floating-label-field--s1:valid:not(:placeholder-shown)
{
    border-color: rgba(46, 213, 115, .3);
}
.floating-label-field--s1:invalid
{
    border-color: rgba(255, 71, 87, .3);
}

/* Input Style #2 */
.floating-label-field--s2
{
    transition: background-color .25s ease-in-out; 

    border: 2px solid #fff;
    border-radius: 5px;
    background-color: #fff;
}
.floating-label-field--s2 + .floating-label
{
    visibility: hidden;

    transition: transform .25s, visibility .5s, opacity .5s ease-in-out; 

    opacity: 0;
}
.floating-label-field--s2:focus + .floating-label,
.floating-label-field--s2:not(:placeholder-shown) + .floating-label
{
    visibility: visible;

    transform: translateY(-80%); 

    opacity: .5;
}
.floating-label-field--s2:valid:not(:placeholder-shown)
{
    border-color: #adefc8; 
    background-color: #adefc8;
}
.floating-label-field--s2:invalid
{
    border-color: #ffe0e3; 
    background-color: #ffe0e3;
}

.floating-label-field--s3
{
    padding: 1.5em; 

    transition: border-color .25s ease-in-out;

    color: rgba(255, 255, 255, .75);
    border: 1px solid rgba(255, 255, 255, .1);
    border-radius: 5px;
    background-color: transparent;
}
.floating-label-field--s3 + .floating-label
{
    position: absolute;
    top: .75em;
    left: .75em;

    display: inline-block;

    width: auto;
    margin: 0;
    padding: .75em;

    transition: transform .25s, opacity .25s, padding .25s ease-in-out;
    transform-origin: 0 0;

    color: rgba(255, 255, 255, .5);
}
.floating-label-field--s3:focus,
.floating-label-field--s3:not(:placeholder-shown)
{
    border-color: rgba(255, 255, 255, .1);
}
.floating-label-field--s3:focus + .floating-label,
.floating-label-field--s3:not(:placeholder-shown) + .floating-label
{
    z-index: 2500;

    padding: .75em;

    transform: translate(0, -2em) scale(.9);

    color: rgba(255, 255, 255, .25); 
    background-color: #2c3e50;
}

/* Common Styles */
/* Identical inputs on all browsers */
.floating-label-field--s1:not(textarea),
.floating-label-field--s2:not(textarea),
.floating-label-field--s3:not(textarea)
{
    max-height: 4em;
}

.floating-label-field--s1,
.floating-label-field--s1 + .floating-label,
.floating-label-field--s2,
.floating-label-field--s2 + .floating-label
{
    padding: 1.5em;
}

.floating-label-field--s1 + .floating-label,
.floating-label-field--s2 + .floating-label
{
    z-index: 1500;
}

.floating-label-field--s1::placeholder,
.floating-label-field--s3::placeholder
{
    color: transparent;
}

</style>   
