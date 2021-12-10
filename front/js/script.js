fetch('http://localhost:3000/api/products').then(function (response) {
    if (response.ok) {
        response.json().then(function (json) {
            products = json;

            let items = document.querySelector(".items");
            for (let i = 0; i < products.length; i++) {
                let id = products[i]._id;
                let img = products[i].imageUrl;
                let alt = products[i].altTxt;
                let name = products[i].name;
                let description = products[i].description;

                let a = document.createElement("a");
                a.href = "./product.html?id=" + id;
                a.innerHTML = `
                    <a href="./product.html?id=${id}">
                    <article>
                      <img src="${img}" alt="${alt}">
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