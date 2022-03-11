const main = async () => {
  const response = await fetch(`http://localhost:3000/api/products/`);
  if (!response.ok) {
    console.log('Network request for products.json failed with response ' + response.status + ': ' + response.statusText);
    return;
  }


  const products = await response.json();
  let parseItems = JSON.parse(localStorage.getItem("kanap"));
  const cart__items = document.querySelector("#cart__items");


  // ITEM DANS LE STORAGE
  const createItems = () => {
    for (const parseItem of parseItems) {
      // AFFICHER LES ITEMS DU LOCALSTORAGE

      const product = products.find(item => item._id == parseItem.id);

      const {
        _id,
        price,
        name,
        imageUrl,
        altTxt,
        description,
        colors
      } = product;

      // AFFICHER LES ARTICLES DANS LE PANIER
      const article = document.createElement("article");

      article.setAttribute("class", "cart__item")
      article.setAttribute("data-id", parseItem.id);
      article.setAttribute("data-color", parseItem.color);

      article.innerHTML = /* html */
        `
                  <div class="cart__item__img">
                    <img src="${imageUrl}" alt="Photographie d'un canapé">
                  </div>
                  <div class="cart__item__content">
                    <div class="cart__item__content__description">
                      <h2>${name}</h2>
                      <p>${parseItem.color}</p>
                      <p class="price">${price} €</p>
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


      //SUPPRIMER UN ITEM DANS LE PANIER
      article.querySelector(".deleteItem").addEventListener("click", () => {
        const filtrer = parseItems.filter(item => item.id !== parseItem.id || item.color !== parseItem.color);
        localStorage.setItem("kanap", JSON.stringify(filtrer));
        parseItems = JSON.parse(localStorage.getItem("kanap"));
        cart__items.removeChild(article);
        totalItems();
      })

      //MODIFIER LA QUANTITE D'UN ITEM DANS LE PANIER

      article.querySelector(".itemQuantity").addEventListener("change", (e) => {
        const value = e.target.value;
        if (value <= 0) {
          e.target.value = 1;
        }
        const modifQty = parseItems.map(item => {
          if (item.id !== parseItem.id || item.color !== parseItem.color) {
            return item;
          }
          return {
            ...item,
            quantity: parseInt(e.target.value),
          }
        });
        localStorage.setItem("kanap", JSON.stringify(modifQty));
        parseItems = JSON.parse(localStorage.getItem("kanap"));
        totalItems();
      })
    }
  }
  createItems();

  const totalItems = () => {
    const totalQty = document.querySelector('#totalQuantity');
    const totalPrice = document.querySelector('#totalPrice');


    let sumQty = 0;
    let sumPrice = 0;

    for (const parseItem of parseItems) {

      const product = products.find(item => item._id == parseItem.id);

      sumQty += parseItem.quantity;
      sumPrice += product.price * parseItem.quantity;
    }

    totalQty.innerHTML = sumQty;
    totalPrice.innerHTML = sumPrice;
  }

  totalItems();

  const postItem = () => {


    document.querySelector("#order").addEventListener("click", (e) => {
      e.preventDefault();
      const firstName = document.querySelector("#firstName");
      const lastName = document.querySelector("#lastName");
      const address = document.querySelector("#address");
      const city = document.querySelector("#city");
      const email = document.querySelector("#email");
      const produits = [];

      for (const parseItem of parseItems) {
        produits.push(parseItem.id);
      }

      const order = {
        contact: {
          firstName: firstName.value,
          lastName: lastName.value,
          address: address.value,
          city: city.value,
          email: email.value,
        },
        produits: produits,
      };

      console.log(JSON.stringify(order))


      const passerCommande = fetch(`http://localhost:3000/api/products/order`, {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(order),
      });
      if (!passerCommande.ok) {
        console.log('Network request for products.json failed with response ' + response.status + ': ' + response.statusText);
        return;
      }
    })
  }

  postItem();

}

main();