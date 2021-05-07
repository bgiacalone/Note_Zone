// //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// ///////////////////////////////////interact.js setup shiiiiiiiiiiiiiit////////////////////////////////////////////////////////////////
// //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var position = { x: 0, y: 0 };

// fast click
interact('.img_item, .itm').on('tap', function (event) {
  event.target.style.zIndex = parseInt(new Date().getTime() / 1000);
})

interact('.img_item, .template')
  .resizable({
    edges: { top: true, left: true, bottom: true, right: true },
    listeners: {
      move: function (event) {
        event.target.style.zIndex = parseInt(new Date().getTime() / 1000);
        let { x, y } = event.target.dataset
        x = (parseFloat(x) || 0) + event.deltaRect.left
        y = (parseFloat(y) || 0) + event.deltaRect.top
        Object.assign(event.target.style, {
          width: `${event.rect.width}px`,
          height: `${event.rect.height}px`,
          transform: `translate(${x}px, ${y}px)`
        })
        Object.assign(event.target.dataset, { x, y })
      }
    }
  })
  .draggable({
    ignoreFrom: '[no-pointer-event]',
    // enable inertial throwing
    inertia: true,
    // keep the element within the area of it's parent
    modifiers: [
      interact.modifiers.restrictRect({
        restriction: 'parent',
        endOnly: true
      })
    ],
    listeners: {
      start (event) {
        event.target.style.zIndex = parseInt(new Date().getTime() / 1000);
        position = { x: 0, y: 0 };
      },
      move: dragMoveListener,
      end (event) {  }
    }
  })

function dragMoveListener (event) {
  var target = event.target
  // keep the dragged position in the data-x/data-y attributes
  var x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx
  var y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy

  // translate the element
  target.style.webkitTransform =
    target.style.transform =
      'translate(' + x + 'px, ' + y + 'px)'

  // update the posiion attributes
  target.setAttribute('data-x', x)
  target.setAttribute('data-y', y)
}
// //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// ///////////////////////////////////end interact.js setup /////////////////////////////////////////////////////////////////////////////
// //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function remove(el) {
  var parent = el.closest('.itm');
  parent.remove();
}
function add_img_item(top, left, txt, src) {
  var itms = document.querySelector("#items");
  var ii = document.createElement("div");
  ii.classList.add("img_item");
  ii.classList.add("itm");
  ii.style = `top:${top}px;left:${left}px;`;
  var img_item = `
    <div class="controls">
      <strong>${txt}</strong>
      <div class="btn-group">
        <button class="btn btn-red" onclick="remove(this)">
          <svg xmlns="http://www.w3.org/2000/svg" style="top:2px;" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
          </svg>
        </button>
      </div>
    </div>
    <img src="${src}">`;
  ii.innerHTML = img_item;
  ii.style.zIndex = parseInt(new Date().getTime() / 1000);
  itms.appendChild(ii);
}
