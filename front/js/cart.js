fetch('http://localhost:3000/api/products').then(function (response) {
    if (response.ok) {
        response.json().then(function (json) {
            products = json;
            console.log(products);

            let items = document.querySelector("#cart__items");

        });
    } else {
        console.log('Network request for products.json failed with response ' + response.status + ': ' + response.statusText);
    }
});