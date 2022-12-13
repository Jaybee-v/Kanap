const items = document.getElementById('items');
const API_URL = 'http://localhost:3000/api/products';

// INSERT PRODUCTS ON WEBSITE

function displayItems() {
  fetch(`${API_URL}`)
    .then(function (res) {
      if (res.ok) {
        return res.json();
      }
    })
    .then(function (value) {
      let i = 0;
      while (i < value.length) {
        const link = document.createElement('a');
        link.href = `./product.html?id=${value[i]._id}`;
        const article = document.createElement('article');
        article.innerHTML = `<img src="${value[i].imageUrl}" alt="${value[i].altTxt}"/>`;
        const article_name = document.createElement('h3');
        article_name.classList.add('productName');
        article_name.innerHTML = `${value[i].name}`;
        const paragraph = document.createElement('p');
        paragraph.classList.add('productDescription');
        paragraph.innerHTML = `${value[i].description}`;

        article.appendChild(article_name);
        article.appendChild(paragraph);
        link.appendChild(article);
        items.appendChild(link);
        i++;
      }
    })
    .catch(function (err) {
      console.log(err);
    });
}

displayItems();
