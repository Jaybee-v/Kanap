const cart = document.getElementById('cart_items');

(function cart() {
  function getCart() {
    let cart = localStorage.getItem('cart');
    if (cart == null) {
      return [];
    } else {
      return JSON.parse(cart);
    }
  }
  let cart = getCart();
  let findProduct = cart.map((p) => p.id == product.id);
  let colorProduct = cart.find((p) => p.color == product.color);
  let quantityProduct = cart.find((p) => p.quantity == product.quantity);

  console.log(findProduct);
})();
