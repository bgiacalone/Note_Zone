function highlight_scale(b) {
  clear_scale(b);
  let this_template = b.closest(".template");
  var target = `.template[data-id='${this_template.dataset.id}']`;
  let scale_map = [ [2,2,1,2,2,2,1],
                    [2,1,2,2,1,2,2],
                    [1,2,2,1,2,2,2],
                    [2,1,2,2,2,1,2],
                    [1,2,2,2,1,2,2],
                    [2,2,2,1,2,2,1],
                    [2,2,1,2,2,1,2] ];
  let scale_tonic = document.querySelector(target + " select[id='tonic']").value;
  let scale_mode = document.querySelector(target + " select[id='mode']").value;
  let running = +scale_tonic;
  scale_map[scale_mode].forEach((item, i) => {
    running = running + scale_map[scale_mode][i];
    if (running > 12) {
      running = running - 12;
    }
    let y = document.querySelectorAll(target + " div[data-n='"+running+"']");
    y.forEach((item, i) => {
      item.classList.toggle("notes_highlighted");
    })
  });
}

function clear_scale(b) {
  let this_template = b.closest(".template");
  var notes_to_clear = this_template.querySelectorAll(".g .notes_highlighted, .k .notes_highlighted");
  notes_to_clear.forEach((item, i) => {
    item.classList.remove("notes_highlighted");
  });
}

function name_notes() {
  let note_map = ["C", "D♭", "D", "E♭", "E", "F", "G♭", "G", "A♭", "A", "B♭", "B"];
  let notes = document.getElementsByClassName("n");
  for (var i = 0; i < notes.length; i++) {
    notes[i].innerHTML = note_map[notes[i].dataset.n - 1];
  }
}

function toggle_note_names(b) {
  var this_template = b.closest(".template");
  var this_guitar = this_template.querySelector(".g");
  var this_keyboard = this_template.querySelector(".k");
  this_keyboard.classList.toggle("names_shown");
  this_keyboard.classList.toggle("names_hidden");
  this_guitar.classList.toggle("names_shown");
  this_guitar.classList.toggle("names_hidden");
}

function toggle_chromatic_highlight(b) {
  var this_template = b.closest(".template");
  var this_keyboard = this_template.querySelector(".k");
  var this_guitar = this_template.querySelector(".g");
  this_keyboard.classList.toggle("notes_highlighted");
  this_guitar.classList.toggle("notes_highlighted");
}

function hide_instrument(t,b) {
  var this_instrument = t.closest(".template").querySelector(b).closest(".instrument");
  this_instrument.classList.toggle("hidden");
}

function clone_template(b) {
  let templates = document.getElementById("items");
  var this_template = b.closest(".template");
  var sorted_templates = Array.from(templates.querySelectorAll(".template"))
                              .sort(({dataset: {id: a}}, {dataset: {id: b}}) => a.localeCompare(b));
  var new_template = this_template.cloneNode(true);
  new_template.dataset.id = parseInt(sorted_templates[sorted_templates.length - 1].dataset.id) + 1;
  new_template.style.zIndex = parseInt(new Date().getTime() / 1000);
  templates.appendChild(new_template);
}

function add_template() {
  let templates = document.getElementById("items");
  var sorted_templates = Array.from(templates.querySelectorAll(".template"))
                              .sort(({dataset: {id: a}}, {dataset: {id: b}}) => a.localeCompare(b));
  let new_template = document.createElement("div");
  new_template.innerHTML = inst_template;
  new_template.classList.add("template");
  new_template.classList.add("itm");
  new_template.dataset.id = (sorted_templates.length > 0) ? (parseInt(sorted_templates[sorted_templates.length - 1].dataset.id) + 1) : 1;
  new_template.style.zIndex = parseInt(new Date().getTime() / 1000);
  templates.appendChild(new_template);
  name_notes();
}

var inst_template = `
  <div class="controls">
    <button id="toggleNoteNames" onclick="toggle_note_names(this)" class="btn">Toggle Note Names</button>
    <button id="toggleChromaticHighlight" class="btn btn-chromatic" onclick="toggle_chromatic_highlight(this)" class="btn btn-chromatic">Toggle Chromatic Highlighting</button>
    <div class="scale-form">
      <select name="scale tonic" id="tonic">
        <option value="1">C</option>
        <option value="2">D♭</option>
        <option value="3">D</option>
        <option value="4">E♭</option>
        <option value="5">E</option>
        <option value="6">F</option>
        <option value="7">G♭</option>
        <option value="8">G</option>
        <option value="9">A♭</option>
        <option value="10">A</option>
        <option value="11">B♭</option>
        <option value="12">B</option>
      </select>
      <select name="scale mode" id="mode">
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
    <div class="btn-group">
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
      <div class="o" data-oi="7">
        <div class="_1 n" data-o="7" data-n="1"></div>
        <div class="_2 n" data-o="7" data-n="2"></div>
        <div class="_3 n" data-o="7" data-n="3"></div>
        <div class="_4 n" data-o="7" data-n="4"></div>
        <div class="_5 n" data-o="7" data-n="5"></div>
        <div class="_6 n" data-o="7" data-n="6"></div>
        <div class="_7 n" data-o="7" data-n="7"></div>
        <div class="_8 n" data-o="7" data-n="8"></div>
        <div class="_9 n" data-o="7" data-n="9"></div>
        <div class="_10 n" data-o="7" data-n="10"></div>
        <div class="_11 n" data-o="7" data-n="11"></div>
        <div class="_12 n" data-o="7" data-n="12"></div>
      </div>
      <div class="o" data-oi="8">
        <div class="_1 n" data-o="8" data-n="1"></div>
        <div class="_2 n" data-o="8" data-n="2"></div>
        <div class="_3 n" data-o="8" data-n="3"></div>
        <div class="_4 n" data-o="8" data-n="4"></div>
        <div class="_5 n" data-o="8" data-n="5"></div>
        <div class="_6 n" data-o="8" data-n="6"></div>
        <div class="_7 n" data-o="8" data-n="7"></div>
        <div class="_8 n" data-o="8" data-n="8"></div>
        <div class="_9 n" data-o="8" data-n="9"></div>
        <div class="_10 n" data-o="8" data-n="10"></div>
        <div class="_11 n" data-o="8" data-n="11"></div>
        <div class="_12 n" data-o="8" data-n="12"></div>
      </div>
    </div>
  </div>
  <div class="instrument">
    <div class="g names_hidden" id="guitar">
      <div class="sg">
        <div class="sgn" data-f="21">_</div>
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
        <div class="n" data-f="0" data-o="4" data-n="5"></div>
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
        <div class="n" data-f="0" data-o="3" data-n="12"></div>
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
        <div class="n" data-f="0" data-o="3" data-n="8"></div>
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
        <div class="n" data-f="0" data-o="3" data-n="3"></div>
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
        <div class="n" data-f="0" data-o="2" data-n="10"></div>
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
        <div class="n" data-f="0" data-o="2" data-n="5"></div>
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
    <div class="s names_hidden" id="staff" style="min-height:220px;">
      <svg viewBox="0 0 500 500" width="500" height="500" xmlns="http://www.w3.org/2000/svg" version="1.1">
        <circle cx="5" cy="5" r="5" />
        <path id="staff" d="M0,25 h500 M0,42 h500 M0,59 h500 M0,76 h500 M0,93 h500" stroke="black" stroke-width="1" />
        <line id="staff_dashed0" x1="0" y1="8" x2="500" y2="8" stroke="black" stroke-dasharray="8" />
        <line id="staff_dashed1" x1="0" y1="110" x2="500" y2="110" stroke="black" stroke-dasharray="8" />
        <path fill="black" transform="translate(15,34)" d="M20,76 C15,86 0,86 5,76 S25,66 20,76 m.85,-2 v-57" stroke="black" stroke-width="1.5" />
        <path fill="white" transform="translate(50,-17)" d="M20,76 C15,86 0,86 5,76 S25,66 20,76 m.85,-2 v-57" stroke="black" stroke-width="1.5" />
        <path fill="salmon" transform="translate(85,-34)" d="M20,76 C15,86 0,86 5,76 S25,66 20,76 m.85,-2 v-57" stroke="black" stroke-width="1.5" />
        <path fill="tan" transform="translate(120,-51)" d="M20,76 C15,86 0,86 5,76 S25,66 20,76 m.85,-2 v-57" stroke="black" stroke-width="1.5" />
        <path fill="red" transform="translate(155,-68)" d="M20,76 C15,86 0,86 5,76 S25,66 20,76 m.85,-2 v-57" stroke="black" stroke-width="1.5" />
      </svg>
    </div>
  </div>
`;
