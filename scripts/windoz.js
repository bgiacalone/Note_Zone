function remove(el) {
  var parent = el.closest('.img_item');
  parent.remove();
  console.log("delete");
}
function maximize(el) {
  var parent = el.closest('.img_item');
  parent.classList.add('max');
  console.log("max");
}
function min(el) {
  var parent = el.closest('.img_item');
  parent.classList.remove('max');
  console.log("min");
}
