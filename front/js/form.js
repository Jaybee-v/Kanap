const URL_POST = `http://localhost:3000/api/order/`;
const form = document.querySelector('.cart__order__form');
const firstName = document.getElementById('firstNameErrorMsg');
const lastName = document.getElementById('lastNameErrorMsg');
const address = document.getElementById('addressErrorMsg');
const city = document.getElementById('cityErrorMsg');
const email = document.getElementById('emailErrorMsg');
const btnSubmit = document.getElementById('order');
const dataList = document.getElementById('city-choice');

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

let communes = [];
form.address.addEventListener('change', () => {
  fetch(`https://api-adresse.data.gouv.fr/search/?q=${form.address.value}`)
    .then(function (res) {
      if (res.ok) {
        return res.json();
      }
    })
    .then(function (data) {
      communes = [];
      for (let i = 0; i < data.features.length; i++) {
        console.log(data.features[i].properties.city);
        let commune = data.features[i].properties.city;
        communes.push(commune);
      }

      form.city.addEventListener('click', () => {
        console.log(communes);
        let c = 0;
        while (c < communes.length) {
          const dataChoice = document.createElement('option');
          dataChoice.value = `${communes[c]}`;
          dataList.appendChild(dataChoice);
          c++;
        }
      });
    })
    .catch(function (err) {
      console.log(err);
    });
});

class Contact {
  constructor(firstName, lastName, city, address, email) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.city = city;
    this.address = address;
    this.email = email;
  }
  showContact() {
    console.log(
      `Contact : ${this.firstName}, ${this.lastName}, ${this.address}, ${this.city}, ${this.email}`
    );
  }
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
