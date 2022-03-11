const main = async () => {
    const response = await fetch('http://localhost:3000/api/products');
    if (!response.ok) {

        console.log('Network request for products.json failed with response ' + response.status + ': ' + response.statusText);

        return;
    }

    const products = await response.json();
    for (const product of products) {
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
        //d'où sorts le items

        items.appendChild(a);
    }
};


main();