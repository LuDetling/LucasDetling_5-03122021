// fetch('http://localhost:3000/api/products').then(function (response) {
//     if (!response.ok) {
//         console.log('Network request for products.json failed with response ' + response.status + ': ' + response.statusText);


//     } else {
//         response.json().then(function (json) {
//             products = json;
//             console.log(products);
//             //placement
//             let items = document.querySelector("#cart__items");
//         });
//     }
// });

//modifier par id + couleur je pense
let item = localStorage.getItem("kanap").split(',');
const cart__items = document.querySelector("#cart__items");

cart__items.innerHTML = `
            <article class="cart__item" data-id="{product-ID}" data-color="{product-color}">
                <div class="cart__item__img">
                  <img src="${item[0]}" alt="Photographie d'un canapé">
                </div>
                <div class="cart__item__content">
                  <div class="cart__item__content__description">
                    <h2>${item[1]}</h2>
                    <p>${item[2]}</p>
                    <p>${item[3] / 100} €</p>
                  </div>
                  <div class="cart__item__content__settings">
                    <div class="cart__item__content__settings__quantity">
                      <p>Qté : </p>
                      <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${item[4]}">
                    </div>
                    <div class="cart__item__content__settings__delete">
                      <p class="deleteItem">Supprimer</p>
                    </div>
                  </div>
                </div>
            </article>
`;