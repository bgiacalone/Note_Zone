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
  let row_template = document.querySelector("div[id='source_template'] tr[id='content']").cloneNode(true);
  row_template.removeAttribute('id');
  while (row_template.firstChild) {
    row_template.removeChild(row_template.firstChild);
  }
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
    var new_row = row_template.cloneNode(true);
    let quarter_beat_ms = ms/bpm_counter;
    var ms_array = [
      Number.parseFloat((quarter_beat_ms*4)).toFixed(2),
      Number.parseFloat((quarter_beat_ms*4*(2/3))).toFixed(2),
      Number.parseFloat((quarter_beat_ms*2)).toFixed(2),
      Number.parseFloat((quarter_beat_ms*4*(1/3))).toFixed(2),
      Number.parseFloat((quarter_beat_ms)).toFixed(2),
      Number.parseFloat((quarter_beat_ms*4*(1/6))).toFixed(2),
      Number.parseFloat((quarter_beat_ms/2)).toFixed(2),
      Number.parseFloat((quarter_beat_ms/3)).toFixed(2),
      Number.parseFloat((quarter_beat_ms/4)).toFixed(2),
      Number.parseFloat((quarter_beat_ms/6)).toFixed(2),
      Number.parseFloat((quarter_beat_ms/8)).toFixed(2),
      Number.parseFloat((quarter_beat_ms/12)).toFixed(2)
    ];
    var hz_array = [
      ms_to_hz(Number.parseFloat((quarter_beat_ms*4)).toFixed(2)),
      ms_to_hz(Number.parseFloat((quarter_beat_ms*4*(2/3))).toFixed(2)),
      ms_to_hz(Number.parseFloat((quarter_beat_ms*2)).toFixed(2)),
      ms_to_hz(Number.parseFloat((quarter_beat_ms*4*(1/3))).toFixed(2)),
      ms_to_hz(Number.parseFloat((quarter_beat_ms)).toFixed(2)),
      ms_to_hz(Number.parseFloat((quarter_beat_ms*4*(1/6))).toFixed(2)),
      ms_to_hz(Number.parseFloat((quarter_beat_ms/2)).toFixed(2)),
      ms_to_hz(Number.parseFloat((quarter_beat_ms/3)).toFixed(2)),
      ms_to_hz(Number.parseFloat((quarter_beat_ms/4)).toFixed(2)),
      ms_to_hz(Number.parseFloat((quarter_beat_ms/6)).toFixed(2)),
      ms_to_hz(Number.parseFloat((quarter_beat_ms/8)).toFixed(2)),
      ms_to_hz(Number.parseFloat((quarter_beat_ms/12)).toFixed(2))
    ];
    var bpm_cell = document.createElement("td");
    var bpm_cell_bold = document.createElement("strong");
    bpm_cell_bold.innerHTML = bpm_counter;
    bpm_cell.appendChild(bpm_cell_bold);
    new_row.appendChild(bpm_cell);
    for (var j = 0; j <= 11; j++) {
      const cell = document.createElement("td");
      cell.dataset.ms = ms_array[j];
      cell.dataset.hz = hz_array[j];
      cell.innerHTML = ms_array[j];
      cell.classList.add( (j % 2 == 0) ? "twos" : "thirds")
      new_row.appendChild(cell);
    }
    bpm_counter = bpm_counter + bpm_increment;
    target.appendChild(new_row);
  }
}
