document.addEventListener("DOMContentLoaded", function(event) {
  load_nav();
});
function load_nav() {
  var tn = document.createElement("nav");
  var body = document.querySelector("body");
  tn.classList.add("tn");
  var nav = `<div class="tn_content">
               <div class="logo"><a href="./index.html"><img class="note_logo" src="images/32n.png"><img src="images/logo.png" alt-text="The Note Zone"></a></div>
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
               <a href="./desktop.html" id="desktop"  class="nav_item">
                 <span>
                   <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                     <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                   </svg>
                   DESKTOP
                 </span>
               </a>
               <div class="amburgla"><a href="#" id="burger"><img src="images/amburgla.png"></a></div>
             </div>`;
  tn.innerHTML = nav;
  var oldbody = body.querySelector("main").cloneNode(true);
  body.innerHTML = "";
  body.appendChild(tn);
  body.appendChild(oldbody);
}
