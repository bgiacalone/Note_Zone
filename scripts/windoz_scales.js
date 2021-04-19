
function add_template() {
  let templates = document.getElementById("items");
  var sorted_templates = Array.from(templates.querySelectorAll(".template"))
                              .sort(({dataset: {id: a}}, {dataset: {id: b}}) => a.localeCompare(b));
  let new_template = document.getElementById("source_template").cloneNode(true);
  new_template.classList.add("template");
  new_template.removeAttribute("id");
  new_template.dataset.id = (sorted_templates.length > 0) ? (parseInt(sorted_templates[sorted_templates.length - 1].dataset.id) + 1) : 1;
  templates.appendChild(new_template);
  name_notes();
}

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

function hide_keyboard(b) {
  var this_keyboard = b.closest(".instrument").querySelector(".k");
  this_keyboard.classList.toggle("hidden");
}

function hide_guitar(b) {
  var this_guitar = b.closest(".instrument").querySelector(".g");
  this_guitar.classList.toggle("hidden");
}

function clone_template(b) {
  let templates = document.getElementById("items");
  var this_template = b.closest(".template");
  var sorted_templates = Array.from(templates.querySelectorAll(".template"))
                              .sort(({dataset: {id: a}}, {dataset: {id: b}}) => a.localeCompare(b));
  var new_template = this_template.cloneNode(true);
  new_template.dataset.id = parseInt(sorted_templates[sorted_templates.length - 1].dataset.id) + 1;
  templates.insertBefore(new_template, this_template.nextSibling);
}

function remove_template(b) {
  var this_template = b.closest(".template");
  this_template.remove();
}
