document.addEventListener("DOMContentLoaded", function(event) {
  let note_map = ["C", "D♭", "D", "E♭", "E", "F", "G♭", "G", "A♭", "A", "B♭", "B"];
  let scale_map = [ [2,2,1,2,2,2,1],
                    [2,1,2,2,1,2,2],
                    [1,2,2,1,2,2,2],
                    [2,1,2,2,2,1,2],
                    [1,2,2,2,1,2,2],
                    [2,2,2,1,2,2,1],
                    [2,2,1,2,2,1,2] ];
  let g = document.getElementById("guitar");
  let k = document.getElementById("keyboard");
  let toggleNoteNamesButton = document.getElementById("toggleNoteNames");
  let toggleNoteHighlightButton = document.getElementById("toggleNoteHighlight");
  let toggleScaleHighlightButton = document.getElementById("toggleScaleHighlight");
  let selectorScaleTonic = document.getElementById("tonic");
  let selectorScaleInterval = document.getElementById("interval");
  let stored_scale_tonic = document.querySelector("select[id='tonic']").value;
  let stored_scale_interval = document.querySelector("select[id='interval']").value;
  let notes_named = false;
  let names_shown = false;
  let notes_highlighted = false;
  let scale_highlighted = false;
  k.classList.toggle("names_hidden");
  g.classList.toggle("names_hidden");
  name_notes();
  toggleNoteNamesButton.addEventListener("click", toggle_note_name_click_handler);
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
    if (e.type == "change") {
      return;
    }
    let scale_tonic = scale_highlighted ? stored_scale_tonic : document.querySelector("select[id='tonic']").value;
    let scale_interval = scale_highlighted ? stored_scale_interval : document.querySelector("select[id='interval']").value;
    let running = +scale_tonic;
    if (scale_highlighted) {
      scale_map[stored_scale_interval].forEach((item, i) => {
        running = running + scale_map[stored_scale_interval][i];
        if (running > 12) {
          running = running - 12;
        }
        let y = document.querySelectorAll("div[data-n='"+running+"']");
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
        let y = document.querySelectorAll("div[data-n='"+running+"']");
        y.forEach((item, i) => {
          item.classList.toggle("notes_highlighted");
        });
      });
      running = 0;
      stored_scale_tonic = document.querySelector("select[id='tonic']").value;
      stored_scale_interval = document.querySelector("select[id='interval']").value;
      scale_highlighted = true;
    }
  }
  function toggle_note_name_click_handler() {
    if (names_shown) {
      k.classList.toggle("names_shown");
      g.classList.toggle("names_shown");
      k.classList.toggle("names_hidden");
      g.classList.toggle("names_hidden");
      names_shown = false;
    } else {
      k.classList.toggle("names_hidden");
      g.classList.toggle("names_hidden");
      k.classList.toggle("names_shown");
      g.classList.toggle("names_shown");
      names_shown = true;
    }
  }
  function name_notes() {
    let notes = document.getElementsByClassName("n");
    for (var i = 0; i < notes.length; i++) {
      notes[i].innerHTML = note_map[notes[i].dataset.n - 1];
    }
    notes_named = true;
  }
});
