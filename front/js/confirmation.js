const numOrder = document.getElementById('orderId');
const url_string = document.location.href;
const url = new URL(url_string);
const searchParams = new URLSearchParams(url.search);

(function orderId() {
  let order = null;
  if (searchParams.has('order')) {
    order = searchParams.get('order');
    numOrder.innerHTML = order;
  }
})();
