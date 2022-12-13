const URL_PRODUCT = `http://localhost:3000/api/products`;
const btn = document.getElementById('addToCart');
const title = document.getElementById('title');
const price = document.getElementById('price');
const description = document.getElementById('description');
const color = document.getElementById('colors');
const quantity = document.getElementById('quantity');
const image = document.querySelector('.item__img');
const url_string = document.location.href;
const url = new URL(url_string);
const searchParams = new URLSearchParams(url.search);

(function getProduct() {
  let id = null;
  if (searchParams.has('id')) {
    id = searchParams.get('id');
    fetch(`${URL_PRODUCT}/${id}`)
      .then(function (res) {
        if (res.ok) {
          return res.json();
        }
      })
      .then(function (value) {
        image.innerHTML = `<img src="${value.imageUrl}" alt="${value.altTxt}" />`;
        title.innerHTML = `${value.name}`;
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
})();

// Save cart content
function saveCart(cart) {
  localStorage.setItem('cart', JSON.stringify(cart));
}

// Get cart content
function getCart() {
  let cart = localStorage.getItem('cart');
  if (cart === null) {
    return [];
  } else {
    return JSON.parse(cart);
  }
}

// Add product in cart
function addToCart(product) {
  id = searchParams.get('id');
  let cart = getCart();
  product = {
    id: id,
    quantity: Number(quantity.value),
    color: color.value,
  };
  let findProductId = cart.find(
    (p) => p.id == product.id && p.color == product.color
  );

  if (findProductId === undefined) {
    if (Number(quantity.value) == 0) {
      alert(
        'Vous devez renseigner la quantité que vous souhaitez (entre 1 et 100) !'
      );
    } else if (color.value == '') {
      alert('Vous devez sélectionner une couleur !');
    } else {
      cart.push(product);
    }
  } else {
    if (Number(quantity.value) == 0) {
      alert(
        'Vous devez renseigner la quantité que vous souhaitez (entre 1 et 100) !'
      );
    } else if (color.value == '') {
      alert('Vous devez sélectionner une couleur !');
    } else {
      for (let index of cart) {
        if (index.id == product.id && index.color == product.color) {
          findProductId.quantity += Number(quantity.value);
        }
      }
    }
  }

  saveCart(cart);
}

btn.addEventListener('click', addToCart);

//  Voir pour les exports de fonctions.
// export { saveCart, getCart };
