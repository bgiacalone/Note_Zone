document.addEventListener("DOMContentLoaded", function(event) {
  let note_map = ["C", "D♭", "D", "E♭", "E", "F", "G♭", "G", "A♭", "A", "B♭", "B"];
  let scale_map = [ [2,2,1,2,2,2,1],
                    [2,1,2,2,1,2,2] ];
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
  k.classList.add("names_hidden");
  g.classList.add("names_hidden");
  name_notes();
  toggleNoteNamesButton.addEventListener("click", toggle_note_name_click_handler);
  toggleNoteHighlightButton.addEventListener("click", toggle_note_highlight_click_handler);
  toggleScaleHighlightButton ? toggleScaleHighlightButton.addEventListener("click", toggle_scale_highlight_click_handler) : console.log("n");
  selectorScaleTonic ? selectorScaleTonic.addEventListener("change", toggle_scale_highlight_click_handler) : console.log("n");
  selectorScaleInterval ? selectorScaleInterval.addEventListener("change", toggle_scale_highlight_click_handler) : console.log("n");
  function toggle_note_highlight_click_handler() {
    if (notes_highlighted) {
      k.classList.remove("notes_highlighted");
      g.classList.remove("notes_highlighted");
      notes_highlighted = false;
    } else {
      k.classList.add("notes_highlighted");
      g.classList.add("notes_highlighted");
      notes_highlighted = true;
    }
  }
  function toggle_scale_highlight_click_handler(e) {
    console.log(e.type);
    if (e.type == "change") {
      return;
    }
    let scale_tonic = scale_highlighted ? stored_scale_tonic : document.querySelector("select[id='tonic']").value;
    let scale_interval = scale_highlighted ? stored_scale_interval : document.querySelector("select[id='interval']").value;
    let running = +scale_tonic;
    console.log(scale_tonic);
    console.log(scale_interval);
    if (scale_highlighted) {
      let qwe =document.querySelectorAll("div[data-n='" + scale_tonic + "']");
      qwe.forEach((item, i) => {
        item.classList.remove("notes_highlighted");
      });
      scale_map[scale_interval].forEach((item, i) => {
        running = running + scale_map[scale_interval][i];
        let asd = document.querySelectorAll("div[data-n='"+running+"']");
        asd.forEach((item, i) => {
          item.classList.remove("notes_highlighted");
        });
      });
      running = 0;
      scale_highlighted = false;
    } else {
      let qwe =document.querySelectorAll("div[data-n='" + scale_tonic + "']");
      qwe.forEach((item, i) => {
        item.classList.add("notes_highlighted");
      });
      scale_map[scale_interval].forEach((item, i) => {
        running = running + scale_map[scale_interval][i];
        let asd = document.querySelectorAll("div[data-n='"+running+"']");
        asd.forEach((item, i) => {
          item.classList.add("notes_highlighted");
        });
      });
      running = 0;
      scale_highlighted = true;
    }
  }
  function toggle_note_name_click_handler() {
    if (names_shown) {
      k.classList.remove("names_shown");
      g.classList.remove("names_shown");
      k.classList.add("names_hidden");
      g.classList.add("names_hidden");
      names_shown = false;
    } else {
      k.classList.remove("names_hidden");
      g.classList.remove("names_hidden");
      k.classList.add("names_shown");
      g.classList.add("names_shown");
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
