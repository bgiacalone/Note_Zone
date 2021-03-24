document.addEventListener("DOMContentLoaded", function(event) {
  let note_map = ["C", "D♭", "D", "E♭", "E", "F", "G♭", "G", "A♭", "A", "B♭", "B"];
  let g = document.getElementById("guitar");
  let k = document.getElementById("keyboard");
  let toggleNoteNamesButton = document.getElementById("toggleNoteNames");
  let toggleNoteHighlightButton = document.getElementById("toggleNoteHighlight");
  let toggleScaleHighlightButton = document.getElementById("toggleScaleHighlight");
  let notes_named = false;
  let names_shown = false;
  let notes_highlighted = false;
  let scale_highlighted = false;
  add_class(g, "names_hidden");
  add_class(k, "names_hidden");
  name_notes();
  toggleNoteNamesButton.addEventListener("click", toggle_note_name_click_handler);
  toggleNoteHighlightButton.addEventListener("click", toggle_note_highlight_click_handler);
  toggleScaleHighlightButton.addEventListener("click", toggle_scale_highlight_click_handler);
  function toggle_note_highlight_click_handler() {
    if (notes_highlighted) {
      remove_class(g, "notes_highlighted");
      remove_class(k, "notes_highlighted");
      notes_highlighted = false;
    } else {
      add_class(g, "notes_highlighted");
      add_class(k, "notes_highlighted");
      notes_highlighted = true;
    }
  }


  let cmaj = [1,3,5,6,8,10,12];
  function toggle_scale_highlight_click_handler() {
    if (scale_highlighted) {
      cmaj.forEach((item, i) => {
        let asd = document.querySelectorAll("div[data-n='"+item+"']");
        asd.forEach((item, i) => {
          remove_class(item, "notes_highlighted");
        });
      });;
      scale_highlighted = false;
    } else {
      cmaj.forEach((item, i) => {
        let asd = document.querySelectorAll("div[data-n='"+item+"']");
        asd.forEach((item, i) => {
          add_class(item, "notes_highlighted");
        });
      });
      scale_highlighted = true;
    }
  }


  function toggle_note_name_click_handler() {
    if (names_shown) {
      remove_class(g, "names_shown");
      remove_class(k, "names_shown");
      add_class(g, "names_hidden");
      add_class(k, "names_hidden");
      names_shown = false;
    } else {
      remove_class(g, "names_hidden");
      remove_class(k, "names_hidden");
      add_class(g, "names_shown");
      add_class(k, "names_shown");
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

function has_class(element, klass) {
  if (element.className && typeof(klass) == "string") {
    let classes = element.className.split(" ");
    return classes.includes(klass);
  } else {
    return false;
  }
}
function remove_class(element, klass) {
  let classes = element.className.split(" ");
  if (classes.includes(klass)) {
    classes.splice(classes.indexOf(klass), 1);
    element.className = classes.join(" ");
  } else {
    return false;
  }
}
function add_class(element, klass) {
  let classes = element.className.split(" ");
  if (!classes.includes(klass)) {
    classes.push(klass);
    element.className = classes.join(" ").trim();
  }
}
