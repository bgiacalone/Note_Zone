function ms_to_hz(ms) {
  return ((1/ms)*1000);
}

function fill_table() {
  let bpm_start = parseInt(document.querySelector("div.controls input[id='start']").value);
  let end = parseInt(document.querySelector("div.controls input[id='end']").value);
  let interval = parseInt(document.querySelector("div.controls input[id='interval']").value);
  let row_template = document.createElement("tr");
  let template_tbody = document.createElement("tbody");
  let target_table = document.querySelector("div.template table");
  let target = document.querySelector("div.template tbody");
  target_table.removeChild(target);
  target_table.appendChild(template_tbody);
  target = document.querySelector("div.template tbody");
  let table_length = Math.floor((end - bpm_start)/interval);
  let bpm_counter = bpm_start;
  let ms = 60000;
  for (var i = 0; i <= table_length; i++) {
    var new_row = row_template.cloneNode(true);
    let quarter_beat_ms = ms/bpm_counter;
    var ms_array = [
      Number.parseFloat((quarter_beat_ms*4)).toFixed(4),
      Number.parseFloat((quarter_beat_ms*4*(2/3))).toFixed(4),
      Number.parseFloat((quarter_beat_ms*2)).toFixed(4),
      Number.parseFloat((quarter_beat_ms*4*(1/3))).toFixed(4),
      Number.parseFloat((quarter_beat_ms)).toFixed(4),
      Number.parseFloat((quarter_beat_ms*4*(1/6))).toFixed(4),
      Number.parseFloat((quarter_beat_ms/2)).toFixed(4),
      Number.parseFloat((quarter_beat_ms/3)).toFixed(4),
      Number.parseFloat((quarter_beat_ms/4)).toFixed(4),
      Number.parseFloat((quarter_beat_ms/6)).toFixed(4),
      Number.parseFloat((quarter_beat_ms/8)).toFixed(4),
      Number.parseFloat((quarter_beat_ms/12)).toFixed(4)
    ];
    var bpm_cell = document.createElement("td");
    var bpm_cell_bold = document.createElement("strong");
    bpm_cell_bold.innerHTML = bpm_counter;
    bpm_cell.appendChild(bpm_cell_bold);
    new_row.appendChild(bpm_cell);
    for (var j = 0; j < 12; j++) {
      const cell = document.createElement("td");
      cell.dataset.ms = ms_array[j];
      cell.dataset.hz = Number.parseFloat(ms_to_hz(ms_array[j])).toFixed(8);
      cell.innerHTML = Number.parseFloat(ms_array[j]).toFixed(2);
      cell.classList.add( (j % 2 == 0) ? "twos" : "thirds")
      new_row.appendChild(cell);
    }
    bpm_counter = bpm_counter + interval;
    target.appendChild(new_row);
  }
}

function table_format(el, format) {
  var table = el.closest(".template").querySelector("table");
  var cells_to_update = table.querySelectorAll("td.twos, td.thirds");
  for(let i = 0; i < cells_to_update.length; ++i) {
    var dest;
    switch (format) {
      case "ms":
        var hz_btn = el.closest(".template").querySelector("#hz");
        hz_btn.classList.remove("btn-blu");
        el.classList.add("btn-blu");
        dest = Number.parseFloat(cells_to_update[i].dataset.ms).toFixed(2);
        break;
      case "hz":
        var ms_btn = el.closest(".template").querySelector("#ms");
        ms_btn.classList.remove("btn-blu");
        el.classList.add("btn-blu");
        dest = Number.parseFloat(cells_to_update[i].dataset.hz).toFixed(4);
        break;
    }
    cells_to_update[i].innerHTML = dest;
  }
}



function add_table() {
  let templates = document.getElementById("items");
  let new_template = document.createElement("div");
  new_template.classList.add("template");
  new_template.classList.add("tempo");
  new_template.classList.add("itm");
  new_template.innerHTML = ttt;
  new_template.querySelector("tr[id='content']").remove();
  templates.appendChild(new_template);
  fill_table();
}

var ttt = `
  <div class="controls">
    <strong>tempo / time / rate</strong>
    <div class="btn-group">
      <button class="btn" onclick="min(this)">
        <svg xmlns="http://www.w3.org/2000/svg" style="top:5px;" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd" />
        </svg>
      </button>
      <button class="btn" onclick="maximize(this)">
        <svg xmlns="http://www.w3.org/2000/svg" style="top:2px;" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd" />
        </svg>
      </button>
      <button class="btn btn-red" onclick="remove(this)">
        <svg xmlns="http://www.w3.org/2000/svg" style="top:2px;" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
        </svg>
      </button>
    </div>
  </div>
  <div class="controls">
    <div class="range-form">
      <label for="start">Search BPMs from:</label>
      <input id="start" class="number_input" type="number" value="1" min="0" max="500" step="any">
      <label for="end">to:</label>
      <input id="end" class="number_input" type="number"  value="200" min="0" max="500" step="any">
      <label for="interval">interval:</label>
      <input id="interval" class="number_input" type="number" value="1" min="0" step="any">
      <button class="btn btn-blu" onclick="fill_table()">OK</button>
    </div>
    <div class="right" style="margin-left:auto;">
      <button class="btn btn-blu" id="ms" onclick="table_format(this, 'ms')">Milliseconds</button>
      <button class="btn" id="hz" onclick="table_format(this, 'hz')">Hertz</button>
    </div>
  </div>
  <table style="margin:0 auto; width:100%;">
    <thead>
      <tr>
        <th class="bpm">BPM</th>
        <th class="twos">1/1</th>
        <th class="thirds">2/3</th>
        <th class="twos">1/2</th>
        <th class="thirds">1/3</th>
        <th class="twos">1/4</th>
        <th class="thirds">1/6</th>
        <th class="twos">1/8</th>
        <th class="thirds">1/12</th>
        <th class="twos">1/16</th>
        <th class="thirds">1/24</th>
        <th class="twos">1/32</th>
        <th class="thirds">1/48</th>
      </tr>
    </thead>
    <tbody>
      <tr id="content">
        <td><strong></strong></td>
        <td class="twos"></td>
        <td class="thirds"></td>
        <td class="twos"></td>
        <td class="thirds"></td>
        <td class="twos"></td>
        <td class="thirds"></td>
        <td class="twos"></td>
        <td class="thirds"></td>
        <td class="twos"></td>
        <td class="thirds"></td>
        <td class="twos"></td>
        <td class="thirds"></td>
      </tr>
    </tbody>
  </table>
`;
