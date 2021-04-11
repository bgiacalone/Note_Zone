document.addEventListener("DOMContentLoaded", function(event) {
  add_template();
  fill_template();
});

function add_template() {
  let templates = document.getElementById("templates");
  var sorted_templates = Array.from(templates.querySelectorAll(".template"))
                              .sort(({dataset: {id: a}}, {dataset: {id: b}}) => a.localeCompare(b));
  let new_template = document.getElementById("source_template").cloneNode(true);
  new_template.classList.add("template");
  new_template.removeAttribute('id');
  new_template.dataset.id = (sorted_templates.length > 0) ? (parseInt(sorted_templates[sorted_templates.length - 1].dataset.id) + 1) : 1;
  new_template.querySelector("tr[id='content']").remove();
  templates.appendChild(new_template);
}

function fill_template() {
  let source = document.querySelector("div[id='source_template'] tr[id='content']");
  let new_row = source.cloneNode(true);
  new_row.removeAttribute('id');
  let target = document.querySelector("div.template tbody");
  let bpm_start = 1;
  let bpm_increment = 1;
  let table_length = 199;

  for (var i = 0; i < table_length; i++) {

    let bpm = bpm_start + i;
    let ms = 60000;
    let quarter_beat_ms = ms/bpm;
    new_row.childNodes.forEach((item, i) => {
      if (i == 1) {
        item.innerHTML = bpm;
      } else if (i == 3){
        item.innerHTML = (quarter_beat_ms*4);
      } else if (i == 5) {
        item.innerHTML = (quarter_beat_ms*4*(2/3));
      } else if (i == 7) {
        item.innerHTML = (quarter_beat_ms*2);
      } else if (i == 9) {
        item.innerHTML = (quarter_beat_ms*4*(1/3));
      } else if (i == 11) {
        item.innerHTML = (quarter_beat_ms);
      } else if (i == 13) {
        item.innerHTML = (quarter_beat_ms*4*(1/6));
      } else if (i == 15) {
        item.innerHTML = (quarter_beat_ms/2);
      } else if (i == 17) {
        item.innerHTML = (quarter_beat_ms/3);
      } else if (i == 19) {
        item.innerHTML = (quarter_beat_ms/4);
      } else if (i == 21) {
        item.innerHTML = (quarter_beat_ms/6);
      } else if (i == 23) {
        item.innerHTML = (quarter_beat_ms/8);
      } else if (i == 25) {
        item.innerHTML = (quarter_beat_ms/12);
      }
    });
    target.appendChild(new_row.cloneNode(true));

  }


}
