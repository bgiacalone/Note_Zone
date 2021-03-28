document.addEventListener("DOMContentLoaded", function(event) {
  name_notes();

  let scale_map = [ [2,2,1,2,2,2,1],
                    [2,1,2,2,1,2,2],
                    [1,2,2,1,2,2,2],
                    [2,1,2,2,2,1,2],
                    [1,2,2,2,1,2,2],
                    [2,2,2,1,2,2,1],
                    [2,2,1,2,2,1,2] ];

  let toggleNoteNamesButton = document.getElementById("toggleNoteNames");
  let toggleNoteHighlightButton = document.getElementById("toggleNoteHighlight");
  let toggleScaleHighlightButton = document.getElementById("toggleScaleHighlight");
  let selectorScaleTonic = document.getElementById("tonic");
  let selectorScaleInterval = document.getElementById("interval");
  let stored_scale_tonic = document.querySelector("select[id='tonic']").value;
  let stored_scale_interval = document.querySelector("select[id='interval']").value;

  let g = document.getElementById("guitar");
  let k = document.getElementById("keyboard");
  let keyboard = document.getElementById("keyboard");
  let guitar = document.getElementById("guitar");

  let notes_highlighted = false;
  let scale_highlighted = false;

  toggleNoteHighlightButton.addEventListener("click", toggle_note_highlight_click_handler);
  toggleScaleHighlightButton ? toggleScaleHighlightButton.addEventListener("click", toggle_scale_highlight_click_handler) : console.log("n");

  selectorScaleTonic ? selectorScaleTonic.addEventListener("change", toggle_scale_highlight_click_handler) : console.log("n");
  selectorScaleInterval ? selectorScaleInterval.addEventListener("change", toggle_scale_highlight_click_handler) : console.log("n");

  function toggle_note_highlight_click_handler() {
    if (notes_highlighted) {
      k.classList.toggle("notes_highlighted");
      g.classList.toggle("notes_highlighted");
      notes_highlighted = false;
    } else {
      k.classList.toggle("notes_highlighted");
      g.classList.toggle("notes_highlighted");
      notes_highlighted = true;
    }
  }
  function toggle_scale_highlight_click_handler(e) {
    let target = this.parentElement.className;
    console.log(target);
    if (e.type == "change") {
      return;
    }
    let scale_tonic = scale_highlighted ? stored_scale_tonic : document.querySelector("div." + target + " select[id='tonic']").value;
    let scale_interval = scale_highlighted ? stored_scale_interval : document.querySelector("div." + target + " select[id='interval']").value;
    let running = +scale_tonic;
    if (scale_highlighted) {
      scale_map[stored_scale_interval].forEach((item, i) => {
        running = running + scale_map[stored_scale_interval][i];
        if (running > 12) {
          running = running - 12;
        }
        let y = document.querySelectorAll("div." + target + " div[data-n='"+running+"']");
        y.forEach((item, i) => {
          item.classList.toggle("notes_highlighted");
        });
      });
      running = 0;
      scale_highlighted = false;
    } else {
      scale_map[scale_interval].forEach((item, i) => {
        running = running + scale_map[scale_interval][i];
        if (running > 12) {
          running = running - 12;
        }
        let y = document.querySelectorAll("div." + target + " div[data-n='"+running+"']");
        y.forEach((item, i) => {
          item.classList.toggle("notes_highlighted");
        });
      });
      running = 0;
      stored_scale_tonic = document.querySelector("div." + target + " select[id='tonic']").value;
      stored_scale_interval = document.querySelector("div." + target + " select[id='interval']").value;
      scale_highlighted = true;
    }
  }

  let keyboardHideButton = document.querySelector("button[name='hideKeyboard']");
  let guitarHideButton = document.querySelector("button[name='hideGuitar']");
  keyboardHideButton.addEventListener("click", keyboard_hide_button_click_handler);
  guitarHideButton.addEventListener("click", guitar_hide_button_click_handler);
  function keyboard_hide_button_click_handler() {
    keyboard.classList.toggle("hidden");
  }
  function guitar_hide_button_click_handler() {
    guitar.classList.toggle("hidden");
  }
});

function name_notes() {
  let note_map = ["C", "D♭", "D", "E♭", "E", "F", "G♭", "G", "A♭", "A", "B♭", "B"];
  let notes = document.getElementsByClassName("n");
  for (var i = 0; i < notes.length; i++) {
    notes[i].innerHTML = note_map[notes[i].dataset.n - 1];
  }
}

function toggle_note_names(ding) {
  // should be added to template initializer , but here will do for now
  name_notes();
  var this_template = ding.closest('.template');
  var this_guitar = this_template.querySelector('.g');
  var this_keyboard = this_template.querySelector('.k');
  this_keyboard.classList.toggle("names_shown");
  this_keyboard.classList.toggle("names_hidden");
  this_guitar.classList.toggle("names_shown");
  this_guitar.classList.toggle("names_hidden");
}

function add_template() {
  let templates = document.getElementById("templates");
  var sorted_templates = Array.from(templates.querySelectorAll(".template"))
                          .sort(({dataset: {id: a}}, {dataset: {id: b}}) => a.localeCompare(b));
  var new_template = sorted_templates[sorted_templates.length - 1].cloneNode(true);
  new_template.dataset.id = parseInt(new_template.dataset.id) + 1;
  templates.appendChild(new_template);
}
