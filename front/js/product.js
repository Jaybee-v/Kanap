const URL_PRODUCT = `http://localhost:3000/api/products/`;
const btn = document.getElementById('addToCart');
const title = document.getElementById('title');
const price = document.getElementById('price');
const description = document.getElementById('description');
const color = document.getElementById('colors');
const quantity = document.getElementById('quantity');
const image = document.querySelector('.item__img');

(function get_id() {
  const url_string = document.location.href;
  const url = new URL(url_string);
  const searchParams = new URLSearchParams(url.search);
  let id = null;
  let name = null;

  if (searchParams.has('id')) {
    id = searchParams.get('id');
    fetch(`${URL_PRODUCT}${id}`)
      .then(function (res) {
        if (res.ok) {
          return res.json();
        }
      })
      .then(function (value) {
        image.innerHTML = `<img src="${value.imageUrl}" alt="${value.altTxt}" />`;
        title.innerHTML = `${value.name}`;
        name = value.name;
        price.innerHTML = `${value.price}`;
        description.innerHTML = `${value.description}`;
        let i = 0;
        while (i < value.colors.length) {
          const option = document.createElement('option');
          option.value = `${value.colors[i]}`;
          option.innerHTML = `${value.colors[i]}`;
          color.appendChild(option);
          i++;
        }
      });
  }
  btn.addEventListener('click', () => {
    function saveCart(cart) {
      localStorage.setItem('cart', JSON.stringify(cart));
    }
    function getCart() {
      let cart = localStorage.getItem('cart');
      if (cart == null) {
        return [];
      } else {
        return JSON.parse(cart);
      }
    }
    (function addToCart(product) {
      let cart = getCart();
      product = {
        id: id,
        quantity: quantity.value,
        color: color.value,
      };
      let findProduct = cart.find((p) => p.id == product.id);
      let colorProduct = cart.find((p) => p.color == product.color);
      if (findProduct != undefined && colorProduct != undefined) {
        findProduct.quantity = findProduct.quantity + Number(quantity.value);
      } else {
        product.quantity = 1;
        cart.push(product);
      }
      saveCart(cart);
    })();
  });
})();

//  Voir pour les exports de fonctions.
