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
    const article = [];
    console.log(color.value, quantity.value, id);
    if (!article) {
      article = [`${id},${color.value}, ${quantity.value}`];
      localStorage.setItem(`${value.name}`, article);
    }
    console.log(article);
    console.log(localStorage.getItem(`${value.name}`));
    choice_color.value = '';
    quantity.value = 0;
  });
})();
