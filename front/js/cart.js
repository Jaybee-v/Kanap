const API_URL = 'http://localhost:3000/api/products';
const cartPanel = document.getElementById('cart__items');
const totalQuantity = document.getElementById('totalQuantity');
const totalPrice = document.getElementById('totalPrice');

function getCart() {
  let cart = localStorage.getItem('cart');
  if (cart == null) {
    return [];
  } else {
    cart = JSON.parse(cart);
    return cart;
  }
}

function saveCart(cart) {
  localStorage.setItem('cart', JSON.stringify(cart));
}

(function recup_products() {
  fetch(`${API_URL}`)
    .then(function (res) {
      if (res.ok) {
        return res.json();
      }
    })
    .then(function (p) {
      let cart = getCart();
      for (let exemple of p) {
        for (let product of cart) {
          if (exemple._id === product.id) {
            const article = document.createElement('article');
            article.classList.add('cart__item');
            article.setAttribute('data-id', `${product.id}`);
            article.setAttribute('data-id', `${product.id}`);
            article.setAttribute('data-color', `${product.color}`);
            const cartItemImg = document.createElement('div');
            cartItemImg.classList.add('cart__item__img');
            cartItemImg.innerHTML = `<img src="${exemple.imageUrl}" alt="${exemple.altTxt}" />`;

            const cartItemContent = document.createElement('div');
            cartItemContent.classList.add('cart__item__content');
            const cartItemDescription = document.createElement('div');
            cartItemDescription.classList.add(
              'cart__item__content__description'
            );
            const descriptionName = document.createElement('h2');
            descriptionName.innerHTML = `${exemple.name}`;
            const colorChoice = document.createElement('p');
            colorChoice.innerHTML = `${product.color}`;
            const priceProduct = document.createElement('p');
            priceProduct.innerHTML = `${exemple.price} €`;
            // ajout des éléments à cart__item__content
            cartItemDescription.appendChild(descriptionName);
            cartItemDescription.appendChild(colorChoice);
            cartItemDescription.appendChild(priceProduct);
            cartItemContent.appendChild(cartItemDescription);

            const cartSettings = document.createElement('div');
            cartSettings.classList.add('cart__item__content__settings');
            const cartSettingsQuantity = document.createElement('div');
            cartSettingsQuantity.classList.add(
              'cart__item__content__settings__quantity'
            );
            const quantity = document.createElement('p');
            quantity.innerHTML = `Qté :`;
            cartSettingsQuantity.appendChild(quantity);
            const inputQuantity = document.createElement('input');
            inputQuantity.classList.add('itemQuantity');
            inputQuantity.setAttribute('type', 'number');
            inputQuantity.setAttribute('name', 'itemQuantity');
            inputQuantity.setAttribute('min', '1');
            inputQuantity.setAttribute('max', '100');
            inputQuantity.setAttribute('value', `${product.quantity}`);
            // Changement de quantité
            inputQuantity.addEventListener('change', () => {
              console.log('coucou');
              const quantityToChange = btnDelete.closest('article');
              const idQuantityToDelete =
                quantityToChange.getAttribute('data-id');
              const colorQuantityToDelete =
                quantityToChange.getAttribute('data-color');
              if (
                idQuantityToDelete === product.id &&
                colorQuantityToDelete === product.color
              ) {
                const productToChange = cart.find(
                  (b) => b.id === product.id && b.color === product.color
                );
                if (productToChange != undefined) {
                  product.quantity = Number(inputQuantity.value);
                }
                saveCart(cart);
                location.reload();
              }
            });
            cartSettingsQuantity.appendChild(inputQuantity);
            // ajout settings
            cartSettings.appendChild(cartSettingsQuantity);

            const itemDelete = document.createElement('div');
            itemDelete.classList.add('cart__item__content__settings__delete');
            const btnDelete = document.createElement('p');
            btnDelete.classList.add('deleteItem');
            btnDelete.setAttribute('id', 'btnDelete');
            btnDelete.innerText = 'Supprimer';
            // Suppression du produit du panier

            btnDelete.addEventListener('click', () => {
              console.log('coucou');
              const articleToDelete = btnDelete.closest('article');
              const idArticleToDelete = articleToDelete.getAttribute('data-id');

              const colorArticleToDelete =
                articleToDelete.getAttribute('data-color');

              cart = cart.filter(
                (el) =>
                  el.id &&
                  el.color !== colorArticleToDelete &&
                  idArticleToDelete
              );
              console.log(cart);
              saveCart(cart);
              location.reload();
            });

            itemDelete.appendChild(btnDelete);
            cartSettings.appendChild(itemDelete);
            cartItemContent.appendChild(cartSettings);

            // ajout des données
            article.appendChild(cartItemImg);
            article.appendChild(cartItemContent);

            cartPanel.append(article);
          }

          let quantity = [];
          let totalPriceByProduct = [];
          let totalQuantityCalc = 0;
          let totalPriceCalc = 0;
          for (let i = 0; i < cart.length; i++) {
            quantity.push(cart[i].quantity);
            totalPriceByProduct.push(cart[i].quantity * exemple.price);
          }
          for (let q = 0; q < quantity.length; q++) {
            totalQuantityCalc = totalQuantityCalc + quantity[q];
          }
          for (let x = 0; x < totalPriceByProduct.length; x++) {
            totalPriceCalc = totalPriceCalc + totalPriceByProduct[x];
          }
          totalQuantity.innerHTML = `${totalQuantityCalc}`;
          totalPrice.innerHTML = `${totalPriceCalc}`;
        }
      }
    })
    .catch(function (err) {
      console.log(err);
    });
})();

/* FORM WORKING */
const URL_POST = `http://localhost:3000/api/order/`;
const form = document.querySelector('.cart__order__form');
const firstName = document.getElementById('firstNameErrorMsg');
const lastName = document.getElementById('lastNameErrorMsg');
const address = document.getElementById('addressErrorMsg');
const city = document.getElementById('cityErrorMsg');
const email = document.getElementById('emailErrorMsg');
const btnSubmit = document.getElementById('order');

function isValid(value) {
  let regExp = new RegExp('[a-zA-Z éèêëäàâôùûÀÂÉÈÔÙÛ]+$', 'g');
  return regExp.test(value);
}

function isValidMail(value) {
  let regExp = new RegExp(
    '[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$',
    'g'
  );
  return regExp.test(value);
}

function isValidAddress(value) {
  let regExp = new RegExp("[a-zA-Z 'éèêëäàâôùûÀÂÉÈÔÙÛ0-9.]+$");
  return regExp.test(value);
}

// Check email
form.email.addEventListener('change', () => {
  if (isValidMail(form.email.value)) {
    console.log('Email valide');
    email.innerHTML = '';
  } else {
    console.log('email invalide');
    email.innerText = "Ceci n'est pas une adresse email valide !";
  }
});

// Check firstName
form.firstName.addEventListener('change', () => {
  if (isValid(form.firstName.value)) {
    console.log('ok prenom');
    firstName.innerHTML = '';
  } else {
    console.log('prénom impossible');
    firstName.innerText =
      'Attention, un prénom ne contient pas ces caractères !';
  }
});
// Check lastName
form.lastName.addEventListener('change', () => {
  if (isValid(form.lastName.value)) {
    console.log('ok nom');
    lastName.innerHTML = '';
  } else {
    console.log('prénom impossible');
    lastName.innerText = 'Attention, un Nom ne contient pas ces caractères !';
  }
});

// Check city
form.city.addEventListener('change', () => {
  if (isValid(form.city.value)) {
    console.log('ok ville');
    city.innerHTML = '';
  } else {
    console.log('prénom impossible');
    city.innerText =
      'Attention, un nom de ville ne contient pas ces caractères !';
  }
});

// Check address
form.address.addEventListener('change', () => {
  if (isValidAddress(form.address.value)) {
    console.log('ok ville');
    address.innerHTML = '';
  } else {
    console.log('prénom impossible');
    address.innerText =
      'Attention, une adresse ne peut contenir certains caractères !';
  }
});

class Contact {
  constructor(firstName, lastName, city, address, email) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.city = city;
    this.address = address;
    this.email = email;
  }
  // showContact() {
  //   console.log(
  //     `Contact : ${this.firstName}, ${this.lastName}, ${this.address}, ${this.city}, ${this.email}`
  //   );
  // }
}

btnSubmit.addEventListener('click', (e) => {
  e.preventDefault();
  const contact = new Contact(
    form.firstName.value,
    form.lastName.value,
    form.address.value,
    form.city.value,
    form.email.value
  );
  if (
    isValid(form.firstName.value) &&
    isValid(form.lastName.value) &&
    isValid(form.city.value) &&
    isValidAddress(form.address.value) &&
    isValidMail(form.email.value)
  ) {
    contact.showContact();
  } else {
    let msg = 'Attention, vous devez renseigner ce champs!';
    if (form.firstName.value === '') {
      firstName.innerText = msg;
    }
    if (form.lastName.value === '') {
      lastName.innerText = msg;
    }
    if (form.address.value === '') {
      address.innerText = msg;
    }
    if (form.city.value === '') {
      city.innerText = msg;
    }
    if (form.email.value === '') {
      email.innerText = msg;
    }
  }
});
