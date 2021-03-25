document.addEventListener("DOMContentLoaded", function(event) {
  let note_map = ["C", "D♭", "D", "E♭", "E", "F", "G♭", "G", "A♭", "A", "B♭", "B"];
  let scale_map = [ [2,2,1,2,2,2,1],
                    [2,1,2,2,1,2,2] ];
  let g = document.getElementById("guitar");
  let k = document.getElementById("keyboard");
  let toggleNoteNamesButton = document.getElementById("toggleNoteNames");
  let toggleNoteHighlightButton = document.getElementById("toggleNoteHighlight");
  let toggleScaleHighlightButton = document.getElementById("toggleScaleHighlight");
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
  function toggle_scale_highlight_click_handler() {
    let scale_dropdown_val = 0;
    let scale_root_note = 0;
    if (scale_highlighted) {
      scale_map[scale_dropdown].forEach((item, i) => {
        let asd = document.querySelectorAll("div[data-n='"+item+"']");
        asd.forEach((item, i) => {
          item.classList.remove("notes_highlighted");
        });
      });;
      scale_highlighted = false;
    } else {
      scale_map[scale_dropdown].forEach((item, i) => {
        let asd = document.querySelectorAll("div[data-n='"+item+"']");
        asd.forEach((item, i) => {
          item.classList.add("notes_highlighted");
        });
      });
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

// function has_class(element, klass) {
//   if (element.className && typeof(klass) == "string") {
//     let classes = element.className.split(" ");
//     return classes.includes(klass);
//   } else {
//     return false;
//   }
// }
// function remove_class(element, klass) {
//   let classes = element.className.split(" ");
//   if (classes.includes(klass)) {
//     classes.splice(classes.indexOf(klass), 1);
//     element.className = classes.join(" ");
//   } else {
//     return false;
//   }
// }
// function add_class(element, klass) {
//   let classes = element.className.split(" ");
//   if (!classes.includes(klass)) {
//     classes.push(klass);
//     element.className = classes.join(" ").trim();
//   }
// }
