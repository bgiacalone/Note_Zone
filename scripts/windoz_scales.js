let note_x = 0;
let note_y = 0;
function highlight_scale(b) {
  note_x = 0;
  clear_scale(b);
  const here = b.closest(".template");
  const flat = "♭";
  const doubleflat = "♭♭";
  const sharp = "♯";
  const doublesharp = "♯♯";
  const staff_lines = [1,3,5,6,8,10,12];
  const seven = ['C','D','E','F','G','A','B'];
  const seventeen = { 'C': 1, 'C♯': 2, 'D♭': 2, 'D': 3, 'D♯': 4, 'E♭': 4, 'E': 5, 'F': 6,
                      'F♯': 7, 'G♭': 7, 'G': 8, 'G♯': 9, 'A♭': 9, 'A': 10, 'A♯': 11, 'B♭': 11, 'B': 12 };
  const scale_map = [ [2,2,1,2,2,2,1],
                      [2,1,2,2,1,2,2],
                      [1,2,2,1,2,2,2],
                      [2,1,2,2,2,1,2],
                      [1,2,2,2,1,2,2],
                      [2,2,2,1,2,2,1],
                      [2,2,1,2,2,1,2] ];

  let scale_tonic = [seventeen[here.querySelector("#tonic").value], here.querySelector("#tonic").value];
  let scale_mode = here.querySelector("#mode").value;

  let tonc, sign = 'natural';
  if (staff_lines.indexOf(scale_tonic[0]) >= 0) {
    tonc = staff_lines.indexOf(scale_tonic[0]) + 1;
  } else {
    switch (scale_tonic[1].value.split("")[1]) {
      case  "♭":
        sign = 'flat';
        tonc = staff_lines.indexOf(scale_tonic[0] + 1) + 1; break;
      case "♯":
        sign = 'sharp';
        tonc = staff_lines.indexOf(scale_tonic[0] - 1) + 1; break;
    }
  }
  note_y = tonc;

  let current_note_name, names = [];
  let note_number = scale_tonic[0];
  let running = scale_tonic[0];
  console.log("--------------------- scale tonic ::: " + scale_tonic + "---------------------");
  scale_map[scale_mode].forEach((item, i) => {
    let distance_of_note_number_from_tonic, distance_of_newname_number_from_tonic, offset, newname, newname_number;

    if (running > 12) { running = running - 12; }
    let notes = here.querySelectorAll("div[data-n='" + running + "']");
    notes.forEach((item, i) => { item.classList.toggle("notes_highlighted"); })
    running += scale_map[scale_mode][i];

    if (i == 0) {
      current_note_name = scale_tonic[1];
      distance_of_note_number_from_tonic = distance_of_newname_number_from_tonic = offset = 0;
      names.push(scale_tonic[1]);
      add_note(here, sign);
    } else {
      newname = current_note_name.split("")[0];
      let interval;
      if (seven.indexOf(newname) == 6) {
        interval = -6;
      } else {
        interval = 1;
      }
      newname = seven[seven.indexOf(newname) + interval];
      newname_number = seventeen[newname];
      distance_of_note_number_from_tonic = note_number - scale_tonic[0];
      distance_of_newname_number_from_tonic = newname_number - scale_tonic[0];
      if (distance_of_newname_number_from_tonic < 0 && distance_of_note_number_from_tonic > 0) {
        distance_of_note_number_from_tonic *= -1;
      }
      offset = distance_of_note_number_from_tonic - distance_of_newname_number_from_tonic;
      let per_note_sign;
      switch (offset) {
        case -2:
          newname += doubleflat;
          per_note_sign = "doubleflat";
          break;
        case -1:
          newname += flat;
          per_note_sign = "flat";
          break;
        case 1:
          newname += sharp;
          per_note_sign = "sharp";
          break;
        case 2:
          newname += doublesharp;
          per_note_sign = "doublesharp";
          break;
      }
      current_note_name = newname;
      names.push(newname);
      add_note(here, per_note_sign);
    }
    console.log("newname ::: " + newname + "  newname_number ::: " + newname_number);
    console.log("current_note_name ::: " + current_note_name + "  note_number ::: " + note_number);
    console.log("distance_of_note_number_from_tonic ::: " + distance_of_note_number_from_tonic);
    console.log("distance_of_newname_number_from_tonic ::: " + distance_of_newname_number_from_tonic);
    console.log("offset of dsts ::: " + offset);
    console.log("------------------------------------------------------------");
    note_number = note_number + scale_map[scale_mode][i];
  });
  console.log(names);
}

function add_note(template, s) {
  let staff = template.querySelector("#staff");
  let note_path = document.createElementNS("http://www.w3.org/2000/svg", "path");
  let sharp = " M-5,68 v18 M-1,66 v18 M-8,74 L2,72 M-8,79 L2,77";
  let doublesharp = sharp + " M-5,48 v18 M-1,46 v18 M-8,54 L2,52 M-8,59 L2,57";
  let flat = " M-5,56 v27 M-5,72 C0,67 5,72 -5,83";
  let doubleflat = " M-5,26 v27 M-5,42 C0,67 5,62 -5,83 M-5,56 v27 M-5,72 C0,67 5,62 -5,83";
  let d = "M20,76 C15,86 0,86 5,76 S25,66 20,76 m.85,-2 v-57";
  switch (s) {
    case "flat":
      d += flat;
      break;
    case "doubleflat":
      d += doubleflat;
      break;
    case "sharp":
      d += sharp;
      break;
    case "doublesharp":
      d += doublesharp;
      break;
  }
  note_path.classList.add("staffnote");
  note_path.setAttribute("fill", "black");
  note_path.setAttribute("stroke", "black");
  note_path.setAttribute("stroke-width", "1.5");
  note_path.setAttribute("transform", "translate(" + (60 + (40 * note_x)) + "," + (43 - (8.5 * note_y)) + ")");
  note_path.setAttribute("d", d);
  note_path.setAttributeNS("http://www.w3.org/2000/xmlns/", "xmlns:xlink", "http://www.w3.org/1999/xlink");
  note_x++;
  note_y++;
  staff.appendChild(note_path);
}




function clear_scale(b) {
  let this_template = b.closest(".template");
  this_template.querySelectorAll(".g .notes_highlighted, .k .notes_highlighted").forEach((item, i) => { item.classList.remove("notes_highlighted"); });
  this_template.querySelectorAll(".staffnote").forEach((item, i) => { item.remove(); });
}

function name_notes() {
  let note_map = ["C", "D♭", "D", "E♭", "E", "F", "G♭", "G", "A♭", "A", "B♭", "B"];
  let notes = document.querySelectorAll(".n");
  notes.forEach((item, i) => { item.innerHTML = note_map[notes[i].dataset.n - 1]; });
}

function toggle_note_names(b) {
  let this_template = b.closest(".template");
  let this_keyboard = this_template.querySelector(".k");
  let this_guitar = this_template.querySelector(".g");
  this_keyboard.classList.toggle("names_shown");
  this_keyboard.classList.toggle("names_hidden");
  this_guitar.classList.toggle("names_shown");
  this_guitar.classList.toggle("names_hidden");
}

function toggle_chromatic_highlight(b) {
  let this_template = b.closest(".template");
  let this_keyboard = this_template.querySelector(".k");
  let this_guitar = this_template.querySelector(".g");
  this_keyboard.classList.toggle("notes_highlighted");
  this_guitar.classList.toggle("notes_highlighted");
}

function hide_instrument(t,b) {
  t.closest(".template").querySelector(b).closest(".instrument").classList.toggle("hidden");
}

function clone_template(b) {
  let templates = document.getElementById("items");
  let this_template = b.closest(".template");
  let new_template = this_template.cloneNode(true);
  new_template.style.zIndex = parseInt(new Date().getTime() / 1000);
  templates.appendChild(new_template);
}

function add_template() {
  let templates = document.getElementById("items");
  let new_template = document.createElement("div");
  new_template.classList.add("template");
  new_template.classList.add("itm");
  new_template.style.zIndex = parseInt(new Date().getTime() / 1000);
  new_template.innerHTML = inst_template;
  templates.appendChild(new_template);
  name_notes();
}



let inst_template = `
  <div class="controls" style="min-height:10px;">
    <div class="btn-group">
      <!-- <button name="hideKeyboard" class="btn" onclick="hide_instrument(this,'#keyboard');hide_instrument(this,'#guitar');hide_instrument(this,'#staff');">
        <svg xmlns="http://www.w3.org/2000/svg" style="" viewBox="0 0 20 20" fill="currentColor">
          <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
        </svg>
      </button> -->
      <button name="hideKeyboard" class="btn" onclick="hide_instrument(this,'#keyboard')">Keys</button>
      <button name="hideGuitar" class="btn" onclick="hide_instrument(this,'#guitar')">Guitar</button>
      <button name="hideStaff" class="btn" onclick="hide_instrument(this,'#staff')">Staff</button>
      <button id="cloneTemplate" onclick="clone_template(this)" class="btn">Clone</button>
      <button class="btn btn-red" onclick="remove(this)">
        <svg xmlns="http://www.w3.org/2000/svg" style="top:2px;" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
        </svg>
      </button>
    </div>
  </div>
  <div class="controls">
    <div class="scale-form">
      <select name="scale tonic" id="tonic" no-pointer-event>
        <option value="C">C</option>
        <option value="C♯">C♯</option>
        <option value="D♭">D♭</option>
        <option value="D">D</option>
        <option value="D♯">D♯</option>
        <option value="E♭">E♭</option>
        <option value="E">E</option>
        <option value="F">F</option>
        <option value="F♯">F♯</option>
        <option value="G♭">G♭</option>
        <option value="G">G</option>
        <option value="G♯">G♯</option>
        <option value="A♭">A♭</option>
        <option value="A">A</option>
        <option value="A♯">A♯</option>
        <option value="B♭">B♭</option>
        <option value="B">B</option>
      </select>
      <select name="scale mode" id="mode" no-pointer-event>
        <option value="0">Ionian mode (Major) [1]</option>
        <option value="3">Dorian mode [2]</option>
        <option value="4">Phrygian mode [3]</option>
        <option value="5">Lydian mode [4]</option>
        <option value="6">Mixolydian mode [5]</option>
        <option value="1">Aeolian mode (Minor) [6]</option>
        <option value="2">Locrian mode [7]</option>
      </select>
      <button id="scaleHighlight" onclick="highlight_scale(this)" class="btn btn-blu">Highlight Scale</button>
      <button id="clearScaleHighlight" onclick="clear_scale(this)" class="btn">Clear</button>
    </div>
    <button id="toggleNoteNames" onclick="toggle_note_names(this)" class="btn">Names</button>
    <button id="toggleChromaticHighlight" class="btn btn-chromatic" onclick="toggle_chromatic_highlight(this)" class="btn btn-chromatic">:)</button>
  </div>
  <div class="instrument">
    <div class="k names_hidden" id="keyboard">
      <div class="o" data-oi="1">
        <div class="_1 n" data-o="1" data-n="1"></div>
        <div class="_2 n" data-o="1" data-n="2"></div>
        <div class="_3 n" data-o="1" data-n="3"></div>
        <div class="_4 n" data-o="1" data-n="4"></div>
        <div class="_5 n" data-o="1" data-n="5"></div>
        <div class="_6 n" data-o="1" data-n="6"></div>
        <div class="_7 n" data-o="1" data-n="7"></div>
        <div class="_8 n" data-o="1" data-n="8"></div>
        <div class="_9 n" data-o="1" data-n="9"></div>
        <div class="_10 n" data-o="1" data-n="10"></div>
        <div class="_11 n" data-o="1" data-n="11"></div>
        <div class="_12 n" data-o="1" data-n="12"></div>
      </div>
      <div class="o" data-oi="2">
        <div class="_1 n" data-o="2" data-n="1"></div>
        <div class="_2 n" data-o="2" data-n="2"></div>
        <div class="_3 n" data-o="2" data-n="3"></div>
        <div class="_4 n" data-o="2" data-n="4"></div>
        <div class="_5 n" data-o="2" data-n="5"></div>
        <div class="_6 n" data-o="2" data-n="6"></div>
        <div class="_7 n" data-o="2" data-n="7"></div>
        <div class="_8 n" data-o="2" data-n="8"></div>
        <div class="_9 n" data-o="2" data-n="9"></div>
        <div class="_10 n" data-o="2" data-n="10"></div>
        <div class="_11 n" data-o="2" data-n="11"></div>
        <div class="_12 n" data-o="2" data-n="12"></div>
      </div>
      <div class="o" data-oi="3">
        <div class="_1 n" data-o="3" data-n="1"></div>
        <div class="_2 n" data-o="3" data-n="2"></div>
        <div class="_3 n" data-o="3" data-n="3"></div>
        <div class="_4 n" data-o="3" data-n="4"></div>
        <div class="_5 n" data-o="3" data-n="5"></div>
        <div class="_6 n" data-o="3" data-n="6"></div>
        <div class="_7 n" data-o="3" data-n="7"></div>
        <div class="_8 n" data-o="3" data-n="8"></div>
        <div class="_9 n" data-o="3" data-n="9"></div>
        <div class="_10 n" data-o="3" data-n="10"></div>
        <div class="_11 n" data-o="3" data-n="11"></div>
        <div class="_12 n" data-o="3" data-n="12"></div>
      </div>
      <div class="o" data-oi="4">
        <div class="_1 n" data-o="4" data-n="1"></div>
        <div class="_2 n" data-o="4" data-n="2"></div>
        <div class="_3 n" data-o="4" data-n="3"></div>
        <div class="_4 n" data-o="4" data-n="4"></div>
        <div class="_5 n" data-o="4" data-n="5"></div>
        <div class="_6 n" data-o="4" data-n="6"></div>
        <div class="_7 n" data-o="4" data-n="7"></div>
        <div class="_8 n" data-o="4" data-n="8"></div>
        <div class="_9 n" data-o="4" data-n="9"></div>
        <div class="_10 n" data-o="4" data-n="10"></div>
        <div class="_11 n" data-o="4" data-n="11"></div>
        <div class="_12 n" data-o="4" data-n="12"></div>
      </div>
      <div class="o" data-oi="5">
        <div class="_1 n" data-o="5" data-n="1"></div>
        <div class="_2 n" data-o="5" data-n="2"></div>
        <div class="_3 n" data-o="5" data-n="3"></div>
        <div class="_4 n" data-o="5" data-n="4"></div>
        <div class="_5 n" data-o="5" data-n="5"></div>
        <div class="_6 n" data-o="5" data-n="6"></div>
        <div class="_7 n" data-o="5" data-n="7"></div>
        <div class="_8 n" data-o="5" data-n="8"></div>
        <div class="_9 n" data-o="5" data-n="9"></div>
        <div class="_10 n" data-o="5" data-n="10"></div>
        <div class="_11 n" data-o="5" data-n="11"></div>
        <div class="_12 n" data-o="5" data-n="12"></div>
      </div>
      <div class="o" data-oi="6">
        <div class="_1 n" data-o="6" data-n="1"></div>
        <div class="_2 n" data-o="6" data-n="2"></div>
        <div class="_3 n" data-o="6" data-n="3"></div>
        <div class="_4 n" data-o="6" data-n="4"></div>
        <div class="_5 n" data-o="6" data-n="5"></div>
        <div class="_6 n" data-o="6" data-n="6"></div>
        <div class="_7 n" data-o="6" data-n="7"></div>
        <div class="_8 n" data-o="6" data-n="8"></div>
        <div class="_9 n" data-o="6" data-n="9"></div>
        <div class="_10 n" data-o="6" data-n="10"></div>
        <div class="_11 n" data-o="6" data-n="11"></div>
        <div class="_12 n" data-o="6" data-n="12"></div>
      </div>
    </div>
  </div>
  <div class="instrument">
    <div class="g names_hidden" id="guitar">
      <div class="sg">
        <div class="sgn w5" data-f="21">_</div>
        <div class="sgn w1" data-f="20">_</div>
        <div class="sgn w1" data-f="19">_</div>
        <div class="sgn m w2" data-f="18">o</div>
        <div class="sgn w2" data-f="17">_</div>
        <div class="sgn m w2" data-f="16">o</div>
        <div class="sgn w3" data-f="15">_</div>
        <div class="sgn m w3" data-f="14">o</div>
        <div class="sgn w3" data-f="13">_</div>
        <div class="sgn m w4" data-f="12">o</div>
        <div class="sgn w4" data-f="11">_</div>
        <div class="sgn w4" data-f="10">_</div>
        <div class="sgn m w4" data-f="9">8</div>
        <div class="sgn w5" data-f="8">_</div>
        <div class="sgn w5" data-f="7">_</div>
        <div class="sgn m w5" data-f="6">o</div>
        <div class="sgn w5" data-f="5">_</div>
        <div class="sgn m w5" data-f="4">o</div>
        <div class="sgn w6" data-f="3">_</div>
        <div class="sgn w6" data-f="2">_</div>
        <div class="sgn w6" data-f="1">_</div>
        <div class="sgn w6" data-f="0">_</div>
      </div>
      <div class="s" data-si="6">
        <div class="n w5" data-f="0" data-o="4" data-n="5"></div>
        <div class="n w1" data-f="1" data-o="4" data-n="6"></div>
        <div class="n w1" data-f="2" data-o="4" data-n="7"></div>
        <div class="n w2" data-f="3" data-o="4" data-n="8"></div>
        <div class="n w2" data-f="4" data-o="4" data-n="9"></div>
        <div class="n w2" data-f="5" data-o="4" data-n="10"></div>
        <div class="n w3" data-f="6" data-o="4" data-n="11"></div>
        <div class="n w3" data-f="7" data-o="4" data-n="12"></div>
        <div class="n w3" data-f="8" data-o="5" data-n="1"></div>
        <div class="n w4" data-f="9" data-o="5" data-n="2"></div>
        <div class="n w4" data-f="10" data-o="5" data-n="3"></div>
        <div class="n w4" data-f="11" data-o="5" data-n="4"></div>
        <div class="n w4" data-f="12" data-o="5" data-n="5"></div>
        <div class="n w5" data-f="13" data-o="5" data-n="6"></div>
        <div class="n w5" data-f="14" data-o="5" data-n="7"></div>
        <div class="n w5" data-f="15" data-o="5" data-n="8"></div>
        <div class="n w5" data-f="16" data-o="5" data-n="9"></div>
        <div class="n w5" data-f="17" data-o="5" data-n="10"></div>
        <div class="n w6" data-f="18" data-o="5" data-n="11"></div>
        <div class="n w6" data-f="19" data-o="5" data-n="12"></div>
        <div class="n w6" data-f="20" data-o="6" data-n="1"></div>
        <div class="n w6" data-f="21" data-o="6" data-n="2"></div>
      </div>
      <div class="s" data-si="5">
        <div class="n w5" data-f="0" data-o="3" data-n="12"></div>
        <div class="n w1" data-f="1" data-o="4" data-n="1"></div>
        <div class="n w1" data-f="2" data-o="4" data-n="2"></div>
        <div class="n w2" data-f="3" data-o="4" data-n="3"></div>
        <div class="n w2" data-f="4" data-o="4" data-n="4"></div>
        <div class="n w2" data-f="5" data-o="4" data-n="5"></div>
        <div class="n w3" data-f="6" data-o="4" data-n="6"></div>
        <div class="n w3" data-f="7" data-o="4" data-n="7"></div>
        <div class="n w3" data-f="8" data-o="4" data-n="8"></div>
        <div class="n w4" data-f="9" data-o="4" data-n="9"></div>
        <div class="n w4" data-f="10" data-o="4" data-n="10"></div>
        <div class="n w4" data-f="11" data-o="4" data-n="11"></div>
        <div class="n w4" data-f="12" data-o="4" data-n="12"></div>
        <div class="n w5" data-f="13" data-o="5" data-n="1"></div>
        <div class="n w5" data-f="14" data-o="5" data-n="2"></div>
        <div class="n w5" data-f="15" data-o="5" data-n="3"></div>
        <div class="n w5" data-f="16" data-o="5" data-n="4"></div>
        <div class="n w5" data-f="17" data-o="5" data-n="5"></div>
        <div class="n w6" data-f="18" data-o="5" data-n="6"></div>
        <div class="n w6" data-f="19" data-o="5" data-n="7"></div>
        <div class="n w6" data-f="20" data-o="5" data-n="8"></div>
        <div class="n w6" data-f="21" data-o="5" data-n="9"></div>
      </div>
      <div class="s" data-si="4">
        <div class="n w5" data-f="0" data-o="3" data-n="8"></div>
        <div class="n w1" data-f="1" data-o="3" data-n="9"></div>
        <div class="n w1" data-f="2" data-o="3" data-n="10"></div>
        <div class="n w2" data-f="3" data-o="3" data-n="11"></div>
        <div class="n w2" data-f="4" data-o="3" data-n="12"></div>
        <div class="n w2" data-f="5" data-o="4" data-n="1"></div>
        <div class="n w3" data-f="6" data-o="4" data-n="2"></div>
        <div class="n w3" data-f="7" data-o="4" data-n="3"></div>
        <div class="n w3" data-f="8" data-o="4" data-n="4"></div>
        <div class="n w4" data-f="9" data-o="4" data-n="5"></div>
        <div class="n w4" data-f="10" data-o="4" data-n="6"></div>
        <div class="n w4" data-f="11" data-o="4" data-n="7"></div>
        <div class="n w4" data-f="12" data-o="4" data-n="8"></div>
        <div class="n w5" data-f="13" data-o="4" data-n="9"></div>
        <div class="n w5" data-f="14" data-o="4" data-n="10"></div>
        <div class="n w5" data-f="15" data-o="4" data-n="11"></div>
        <div class="n w5" data-f="16" data-o="4" data-n="12"></div>
        <div class="n w5" data-f="17" data-o="5" data-n="1"></div>
        <div class="n w6" data-f="18" data-o="5" data-n="2"></div>
        <div class="n w6" data-f="19" data-o="5" data-n="3"></div>
        <div class="n w6" data-f="20" data-o="5" data-n="4"></div>
        <div class="n w6" data-f="21" data-o="5" data-n="5"></div>
      </div>
      <div class="s" data-si="3">
        <div class="n w5" data-f="0" data-o="3" data-n="3"></div>
        <div class="n w1" data-f="1" data-o="3" data-n="4"></div>
        <div class="n w1" data-f="2" data-o="3" data-n="5"></div>
        <div class="n w2" data-f="3" data-o="3" data-n="6"></div>
        <div class="n w2" data-f="4" data-o="3" data-n="7"></div>
        <div class="n w2" data-f="5" data-o="3" data-n="8"></div>
        <div class="n w3" data-f="6" data-o="3" data-n="9"></div>
        <div class="n w3" data-f="7" data-o="3" data-n="10"></div>
        <div class="n w3" data-f="8" data-o="3" data-n="11"></div>
        <div class="n w4" data-f="9" data-o="3" data-n="12"></div>
        <div class="n w4" data-f="10" data-o="4" data-n="1"></div>
        <div class="n w4" data-f="11" data-o="4" data-n="2"></div>
        <div class="n w4" data-f="12" data-o="4" data-n="3"></div>
        <div class="n w5" data-f="13" data-o="4" data-n="4"></div>
        <div class="n w5" data-f="14" data-o="4" data-n="5"></div>
        <div class="n w5" data-f="15" data-o="4" data-n="6"></div>
        <div class="n w5" data-f="16" data-o="4" data-n="7"></div>
        <div class="n w5" data-f="17" data-o="4" data-n="8"></div>
        <div class="n w6" data-f="18" data-o="4" data-n="9"></div>
        <div class="n w6" data-f="19" data-o="4" data-n="10"></div>
        <div class="n w6" data-f="20" data-o="4" data-n="11"></div>
        <div class="n w6" data-f="21" data-o="4" data-n="12"></div>
      </div>
      <div class="s" data-si="2">
        <div class="n w5" data-f="0" data-o="2" data-n="10"></div>
        <div class="n w1" data-f="1" data-o="2" data-n="11"></div>
        <div class="n w1" data-f="2" data-o="2" data-n="12"></div>
        <div class="n w2" data-f="3" data-o="3" data-n="1"></div>
        <div class="n w2" data-f="4" data-o="3" data-n="2"></div>
        <div class="n w2" data-f="5" data-o="3" data-n="3"></div>
        <div class="n w3" data-f="6" data-o="3" data-n="4"></div>
        <div class="n w3" data-f="7" data-o="3" data-n="5"></div>
        <div class="n w3" data-f="8" data-o="3" data-n="6"></div>
        <div class="n w4" data-f="9" data-o="3" data-n="7"></div>
        <div class="n w4" data-f="10" data-o="3" data-n="8"></div>
        <div class="n w4" data-f="11" data-o="3" data-n="9"></div>
        <div class="n w4" data-f="12" data-o="3" data-n="10"></div>
        <div class="n w5" data-f="13" data-o="3" data-n="11"></div>
        <div class="n w5" data-f="14" data-o="3" data-n="12"></div>
        <div class="n w5" data-f="15" data-o="4" data-n="1"></div>
        <div class="n w5" data-f="16" data-o="4" data-n="2"></div>
        <div class="n w5" data-f="17" data-o="4" data-n="3"></div>
        <div class="n w6" data-f="18" data-o="4" data-n="4"></div>
        <div class="n w6" data-f="19" data-o="4" data-n="5"></div>
        <div class="n w6" data-f="20" data-o="4" data-n="6"></div>
        <div class="n w6" data-f="21" data-o="4" data-n="7"></div>
      </div>
      <div class="s" data-si="1">
        <div class="n w5" data-f="0" data-o="2" data-n="5"></div>
        <div class="n w1" data-f="1" data-o="2" data-n="6"></div>
        <div class="n w1" data-f="2" data-o="2" data-n="7"></div>
        <div class="n w2" data-f="3" data-o="2" data-n="8"></div>
        <div class="n w2" data-f="4" data-o="2" data-n="9"></div>
        <div class="n w2" data-f="5" data-o="2" data-n="10"></div>
        <div class="n w3" data-f="6" data-o="2" data-n="11"></div>
        <div class="n w3" data-f="7" data-o="2" data-n="12"></div>
        <div class="n w3" data-f="8" data-o="3" data-n="1"></div>
        <div class="n w4" data-f="9" data-o="3" data-n="2"></div>
        <div class="n w4" data-f="10" data-o="3" data-n="3"></div>
        <div class="n w4" data-f="11" data-o="3" data-n="4"></div>
        <div class="n w4" data-f="12" data-o="3" data-n="5"></div>
        <div class="n w5" data-f="13" data-o="3" data-n="6"></div>
        <div class="n w5" data-f="14" data-o="3" data-n="7"></div>
        <div class="n w5" data-f="15" data-o="3" data-n="8"></div>
        <div class="n w5" data-f="16" data-o="3" data-n="9"></div>
        <div class="n w5" data-f="17" data-o="3" data-n="10"></div>
        <div class="n w6" data-f="18" data-o="3" data-n="11"></div>
        <div class="n w6" data-f="19" data-o="3" data-n="12"></div>
        <div class="n w6" data-f="20" data-o="4" data-n="1"></div>
        <div class="n w6" data-f="21" data-o="4" data-n="2"></div>
      </div>
    </div>
  </div>
  <div class="instrument">
    <div class="s names_hidden" style="min-height:220px;">
      <svg id="staff" viewBox="0 0 2000 130" width="2000" height="130" xmlns="http://www.w3.org/2000/svg" version="1.1">

        <!--circle cx="30" cy="76" r="7"/-->


        <circle cx="22" cy="109" r="5"/>
        <path id="trebble_clef" d="M23,86 C10,76 26,57 37,67 S38,102 17,88 C3,76 15,52 26,42 C35,34 39,6 30,8 C27,10 20,16 32,94 C37,115 27,115 23,113"
            stroke="black" stroke-width="2" fill="none" />



        <path id="staff" d="M0,25 h2000 M0,42 h2000 M0,59 h2000 M0,76 h2000 M0,93 h2000" stroke="black" stroke-width="1.5" />
        <line id="staff_dashed0" x1="0" y1="8" x2="2000" y2="8" stroke="black" stroke-dasharray="8" />
        <line id="staff_dashed1" x1="0" y1="110" x2="2000" y2="110" stroke="black" stroke-dasharray="8" />
      </svg>
    </div>
  </div>
`;
