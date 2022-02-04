const main = async () => {
  const response = await fetch(`http://localhost:3000/api/products/`);
  if (!response.ok) {
    console.log('Network request for products.json failed with response ' + response.status + ': ' + response.statusText);
  } else {
    response.json().then(function (products) {

      const parseItems = JSON.parse(localStorage.getItem("kanap"));
      const cart__items = document.querySelector("#cart__items");

      console.log(parseItems);

      for (parseItem of parseItems) {

        // AFFICHER LES ITEMS DU LOCALSTORAGE
        for (product of products) {

          const {
            _id,
            price,
            name,
            imageUrl,
            altTxt,
            description,
            colors
          } = product;




          if (parseItem.id == _id) {

            const article = document.createElement("article");
            article.setAttribute("class", "cart__item")
            article.setAttribute("data-id", parseItem.id);
            article.setAttribute("data-color", parseItem.color);

            article.innerHTML =
              `
                  <div class="cart__item__img">
                    <img src="${imageUrl}" alt="Photographie d'un canapé">
                  </div>
                  <div class="cart__item__content">
                    <div class="cart__item__content__description">
                      <h2>${name}</h2>
                      <p>${parseItem.color}</p>
                      <p>${price / 100} €</p>
                    </div>
                    <div class="cart__item__content__settings">
                      <div class="cart__item__content__settings__quantity">
                        <p>Qté : </p>
                        <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${parseItem.quantity}">
                      </div>
                      <div class="cart__item__content__settings__delete">
                        <p class="deleteItem">Supprimer</p>
                      </div>
                    </div>
                  </div>
            `
            cart__items.appendChild(article);
          }
        }
        // FIN AFFICHER ITEMS LOCALSTORAGE

      }
      const articleASuppr = document.querySelectorAll(".cart__item");
      const supprs = document.querySelectorAll(".deleteItem").forEach((item => {
        console.log(item);
        item.addEventListener("click", () => {
          console.log(articleASuppr);
        })
      }));

    });
  }
}


main();