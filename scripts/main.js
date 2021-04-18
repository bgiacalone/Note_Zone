document.addEventListener("DOMContentLoaded", function(event) {
  load_nav();
});
function load_nav() {
  var tn = document.createElement("nav");
  var body = document.querySelector('body');
  tn.classList.add("tn");
  var nav = `<div class="tn_content">
               <div class="logo"><a href="./home.html"><img class="note_logo" src="images/32n.png"><img src="images/logo.png" alt-text="The Note Zone"></a></div>
               <a href="./scale.html" id="Scales"  class="nav_item">
                 <span>
                   <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                     <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                   </svg>
                   SCALES
                 </span>
               </a>
               <a href="./tempo.html" id="tempo"  class="nav_item">
                <span>
                   <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                     <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                   </svg>
                   TEMPO
                 </span>
               </a>
               <div class="amburgla"><a href="#" id="burger"><img src="images/amburgla.png"></a></div>
             </div>`;
  tn.innerHTML = nav;
  var oldbody = body.querySelector('main').cloneNode(true);
  body.innerHTML = "";
  body.appendChild(tn);
  body.appendChild(oldbody);
  console.log("nav loaded");
}
