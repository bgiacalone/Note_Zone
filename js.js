document.addEventListener("DOMContentLoaded", function(event) {
  let toggleNoteNamesButton = document.getElementById("toggleNoteNames");
  let notes_named = false;
  let notes_shown = false;
  let note_map = ["C", "Db", "D", "Eb", "E", "F", "Gb", "G", "Ab", "A", "Bb", "B"];
  toggleNoteNamesButton.addEventListener("click", toggle_note_name_click_handler);
  function name_notes() {
    let notes = document.getElementsByClassName("n");
    for (var i = 0; i < notes.length; i++) {
      notes[i].style.content = "";
      notes[i].innerHTML = note_map[notes[i].dataset.n - 1];
    }
  }
  name_notes();
  function toggle_note_name_click_handler() {
    let notes = document.getElementsByClassName("n");
    if (!notes_shown) {
      for (var i = 0; i < notes.length; i++) {
        notes[i].style.color = "black";
      }
      notes_shown = true;
    } else {
      for (var i = 0; i < notes.length; i++) {
        notes[i].style.color = "transparent";
      }
      notes_shown = false;
    }
  }
});
