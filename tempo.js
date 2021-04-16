document.addEventListener("DOMContentLoaded", function(event) {
  add_template();
  fill_template();
});

function ms_to_hz(ms) {
  return ((1/ms)*1000);
}

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
  let start = document.querySelector("div.controls input[id='start']");
  let end = document.querySelector("div.controls input[id='end']");
  let interval = document.querySelector("div.controls input[id='interval']");
  let new_row = document.querySelector("div[id='source_template'] tr[id='content']").cloneNode(true);
  new_row.removeAttribute('id');
  let template_tbody = document.querySelector("div[id='source_template'] tbody");
  let target_table = document.querySelector("div.template table");
  let target = document.querySelector("div.template tbody");
  target_table.removeChild(target);
  target_table.appendChild(template_tbody.cloneNode());
  target = document.querySelector("div.template tbody");
  let bpm_start = +start.value;
  let bpm_increment = +interval.value;
  let table_length = Math.floor((+end.value - +start.value)/bpm_increment);
  let bpm_counter = bpm_start;
  let ms = 60000;
  for (var i = 0; i <= table_length; i++) {
    let quarter_beat_ms = ms/bpm_counter;
    new_row.childNodes.forEach((item, i) => {
      if (i == 1) {
        item.innerHTML = bpm_counter;
      } else if (i == 3){
        item.innerHTML = Number.parseFloat((quarter_beat_ms*4)).toFixed(2);
      } else if (i == 5) {
        item.innerHTML = Number.parseFloat((quarter_beat_ms*4*(2/3))).toFixed(2);
      } else if (i == 7) {
        item.innerHTML = Number.parseFloat((quarter_beat_ms*2)).toFixed(2);
      } else if (i == 9) {
        item.innerHTML = Number.parseFloat((quarter_beat_ms*4*(1/3))).toFixed(2);
      } else if (i == 11) {
        item.innerHTML = Number.parseFloat((quarter_beat_ms)).toFixed(2);
        console.log("bpm: " + bpm_counter + " 1/4ms: " + item.innerHTML + " hz: " + ms_to_hz(item.innerHTML));
      } else if (i == 13) {
        item.innerHTML = Number.parseFloat((quarter_beat_ms*4*(1/6))).toFixed(2);
      } else if (i == 15) {
        item.innerHTML = Number.parseFloat((quarter_beat_ms/2)).toFixed(2);
      } else if (i == 17) {
        item.innerHTML = Number.parseFloat((quarter_beat_ms/3)).toFixed(2);
      } else if (i == 19) {
        item.innerHTML = Number.parseFloat((quarter_beat_ms/4)).toFixed(2);
      } else if (i == 21) {
        item.innerHTML = Number.parseFloat((quarter_beat_ms/6)).toFixed(2);
      } else if (i == 23) {
        item.innerHTML = Number.parseFloat((quarter_beat_ms/8)).toFixed(2);
      } else if (i == 25) {
        item.innerHTML = Number.parseFloat((quarter_beat_ms/12)).toFixed(2);
      }
    });
    bpm_counter = bpm_counter + bpm_increment;
    target.appendChild(new_row.cloneNode(true));
  }
}
