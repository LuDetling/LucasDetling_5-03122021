fetch('http://localhost:3000/api/products').then(function (response) {
    if (response.ok) {
        response.json().then(function (json) {
            products = json;

            for (product of products) {
                const {
                    _id,
                    imageUrl,
                    altTxt,
                    name,
                    description
                } = product;
                let a = document.createElement("a");
                a.href = "./product.html?id=" + _id;
                a.innerHTML = `
                    <a href="./product.html?id=${_id}">
                    <article>
                      <img src="${imageUrl}" alt="${altTxt}">
                      <h3 class="productName">${name}</h3>
                      <p class="productDescription">${description}</p>
                    </article>
                  </a>
                    `;
                items.appendChild(a);
            }

        });
    } else {
        console.log('Network request for products.json failed with response ' + response.status + ': ' + response.statusText);
    }
});