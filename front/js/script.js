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


        // CREATION A
        let lien = document.createElement("a");
        lien.setAttribute("href", "./product.html?id=" + _id);
        items.appendChild(lien);

        // CREATION ARTICLE 
        let article = document.createElement("article");
        lien.appendChild(article);

        // CREATION IMG
        let img = document.createElement("img");
        img.setAttribute("src",  imageUrl);
        img.setAttribute("alt",  altTxt);
        article.appendChild(img);

        // CREATION H3
        let h3 = document.createElement("h3");
        h3.setAttribute("class", "productName");
        h3.innerHTML = name;
        article.appendChild(h3);

        // CREATION P
        let p = document.createElement("p");
        p.setAttribute("class", "productDescription");
        p.innerHTML = description;
        article.appendChild(p);
    }
};


main();