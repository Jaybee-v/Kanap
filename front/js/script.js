const items = document.getElementById('items');
const API_URL = 'http://localhost:3000/api/products';

// INSERT PRODUCTS ON WEBSITE

(function displayItems() {
  fetch(`${API_URL}`)
    .then(function (res) {
      if (res.ok) {
        return res.json();
      }
    })
    .then(function (product) {
      for (let i = 0; i < product.length; i++) {
        const link = document.createElement('a');
        link.href = `./product.html?id=${product[i]._id}`;
        const article = document.createElement('article');
        article.innerHTML = `<img src="${product[i].imageUrl}" alt="${product[i].altTxt}"/>`;
        const article_name = document.createElement('h3');
        article_name.classList.add('productName');
        article_name.innerHTML = `${product[i].name}`;
        const paragraph = document.createElement('p');
        paragraph.classList.add('productDescription');
        paragraph.innerHTML = `${product[i].description}`;

        article.appendChild(article_name);
        article.appendChild(paragraph);
        link.appendChild(article);
        items.appendChild(link);
      }
    })
    .catch(function (err) {
      console.log(err);
    });
})();
