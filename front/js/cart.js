/* Declaring variables. */
let parseItems = JSON.parse(localStorage.getItem("kanap"));
const form = document.querySelector(".cart__order__form");
const cart__items = document.querySelector("#cart__items");

/**
 * It checks if the form is valid and if not, it displays an error message.
 * @param e - the event object
 * @returns An object with the following properties:
 * firstName: true or false
 * lastName: true or false
 * address: true or false
 * city: true or false
 * email: true or false
 */
const verifierFormulaire = (form) => {

  const regexEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  const regexUsername = /[a-zA-Z][a-zA-Z0-9-_]{3,32}/;

  let identifiant = {
    firstName: regexUsername.test(form.firstName.value),
    lastName: regexUsername.test(form.lastName.value),
    address: form.address.value,
    city: form.city.value,
    email: regexEmail.test(form.email.value)
  }

  // AFFICHAGE ERREUR SI LE FORMULAIRE N'EST PAS BON
  if (!identifiant.firstName) {
    document.querySelector("#firstNameErrorMsg").innerText = "Prénom invalide";
  } else {
    document.querySelector("#firstNameErrorMsg").innerText = "";
  }
  if (!identifiant.lastName) {
    document.querySelector("#lastNameErrorMsg").innerText = "Nom invalide";
  } else {
    document.querySelector("#lastNameErrorMsg").innerText = "";
  }
  if (!identifiant.address) {
    document.querySelector("#addressErrorMsg").innerText = "Adresse invalide";
    identifiant.address = false;
  } else {
    document.querySelector("#addressErrorMsg").innerText = "";
    identifiant.address = true;
  }
  if (!identifiant.city) {
    document.querySelector("#cityErrorMsg").innerText = "Ville invalide";
    identifiant.city = false;
  } else {
    document.querySelector("#cityErrorMsg").innerText = "";
    identifiant.city = true;
  }
  if (!identifiant.email) {
    document.querySelector("#emailErrorMsg").innerText = "Email invalide";
  } else {
    document.querySelector("#emailErrorMsg").innerText = "";
  }

  return identifiant
}


/**
 * If there are no items in the cart, create a paragraph element and append it to the cart__items
 * element.
 * @param parseItems - the parsed JSON data
 */
const panierVide = () => {

  // CREATION P
  const panierVide = document.createElement("p");
  panierVide.innerText = "Votre panier est vide";
  cart__items.appendChild(panierVide);
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    verifierFormulaire(form);
  })
}

/**
 * An async function that returns a promise.
 */
const main = async () => {
  const response = await fetch(`http://localhost:3000/api/products/`);
  if (!response.ok) {
    console.log('Network request for products.json failed with response ' + response.status + ': ' + response.statusText);
    return;
  }

  /* Assigning the JSON data to the products variable. */
  const products = await response.json();

  /* It checks if there are no items in the cart. If there are no items in the cart, it calls the
  panierVide function. */
  if (!parseItems) {
    panierVide();
    return;
  }
  /**
   * It creates a bunch of HTML elements and adds them to the DOM.
   */
  const createItems = () => {
    for (const parseItem of parseItems) {

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

      // CREATION ARTICLE
      let article = document.createElement("article");
      article.setAttribute("class", "cart__item")
      article.setAttribute("data-id", parseItem.id);
      article.setAttribute("data-color", parseItem.color);
      cart__items.appendChild(article);

      // CREATION DIV 
      let cart__item__img = document.createElement("div");
      cart__item__img.setAttribute("class", "cart__item__img");
      article.appendChild(cart__item__img);

      // CREATION IMG
      let img = document.createElement("img");
      img.setAttribute("src", imageUrl);
      img.setAttribute("alt", "Photographie d'un canapé");
      cart__item__img.appendChild(img);

      // CREATION DIV
      let cart__item__content = document.createElement("div");
      cart__item__content.setAttribute("class", "cart__item__content");
      article.appendChild(cart__item__content);

      // CREATION DIV
      let cart__item__content__description = document.createElement("div");
      cart__item__content__description.setAttribute("class", "cart__item__content__description");
      cart__item__content.appendChild(cart__item__content__description);

      // CREATION H2
      let h2 = document.createElement("h2");
      h2.innerText = name;
      cart__item__content__description.appendChild(h2);

      // CREATION P

      let couleur = document.createElement("p");
      couleur.innerText = parseItem.color;
      cart__item__content__description.appendChild(couleur);

      // CREATION P

      let prix = document.createElement("p");
      prix.innerText = price + " €";
      cart__item__content__description.appendChild(prix);

      // CREATION DIV

      let cart__item__content__settings = document.createElement("div");
      cart__item__content__settings.setAttribute("class", "cart__item__content__settings");
      cart__item__content.appendChild(cart__item__content__settings);

      // CREATION DIV

      let cart__item__content__settings__quantity = document.createElement("div");
      cart__item__content__settings__quantity.setAttribute("class", "cart__item__content__settings__quantity");
      cart__item__content__settings.appendChild(cart__item__content__settings__quantity);

      // CREATION P

      let quantite = document.createElement("p");
      quantite.innerText = "Qté : ";
      cart__item__content__settings__quantity.appendChild(quantite);

      // CREATION INPUT

      let inputQuantite = document.createElement("input");
      inputQuantite.setAttribute("type", "number");
      inputQuantite.setAttribute("class", "itemQuantity");
      inputQuantite.setAttribute("name", "itemQuantity");
      inputQuantite.setAttribute("min", "1");
      inputQuantite.setAttribute("max", "100");
      inputQuantite.setAttribute("value", parseItem.quantity);
      cart__item__content__settings__quantity.appendChild(inputQuantite);

      // CREATION DIV

      let cart__item__content__settings__delete = document.createElement("div");
      cart__item__content__settings__delete.setAttribute("class", "cart__item__content__settings__delete");
      cart__item__content__settings.appendChild(cart__item__content__settings__delete);

      // CREATION P 

      let supprimer = document.createElement("p");
      supprimer.setAttribute("class", "deleteItem");
      supprimer.innerText = "Supprimer";
      cart__item__content__settings__delete.appendChild(supprimer);


      /* Removing the item from the cart. */
      article.querySelector(".deleteItem").addEventListener("click", () => {
        const filtrer = parseItems.filter(item => item.id !== parseItem.id || item.color !== parseItem.color);
        localStorage.setItem("kanap", JSON.stringify(filtrer));
        parseItems = JSON.parse(localStorage.getItem("kanap"));
        cart__items.removeChild(article);
        totalItems();
        if (parseItems.length == 0) {
          localStorage.removeItem("kanap");
          panierVide();
        }
      })


      /* An event listener that listens for a change in the quantity of an item. If the quantity is
      less than or equal to 0, it sets the quantity to 1. If the quantity is greater than or equal
      to 101, it sets the quantity to 100. It then loops through the array of objects and finds the
      object that matches the id of the object in the array and the color of the object in the
      array. It then returns the object with the quantity set to the value of the input. It then
      sets the local storage to the modified array of objects. It then sets the parseItems variable
      to the parsed JSON data from the local storage. It then calls the totalItems function. */
      article.querySelector(".itemQuantity").addEventListener("change", (e) => {
        const value = e.target.value;
        if (value <= 0) {
          e.target.value = 1;
        } else if (value >= 101) {
          e.target.value = 100;
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
  /**
   * It loops through the array of objects, finds the product that matches the id of the object in the
   * array, and then multiplies the quantity of the object in the array by the price of the product
   * that matches the id of the object in the array.
   */
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

    totalQty.innerText = parseInt(sumQty);
    totalPrice.innerText = parseInt(sumPrice);
  }

  totalItems();

  /* A function that is called when the form is submitted. */
  const postItem = () => {

    form.addEventListener("submit", async (e) => {

      verifierFormulaire(form);
      const verif = verifierFormulaire(form);
      const tableauVerif = Object.values(verif);
      e.preventDefault();

      if (tableauVerif.includes(true) && tableauVerif.includes(false) || tableauVerif.includes(false)) {
        return;
      }
      // REVERIFICATION SI LE LOCALSTORAGE EST VIDE
      if (!parseItems || parseItems.length == 0) {
        return;
      } else {
        const produits = [];

        for (const parseItem of parseItems) {
          produits.push(parseItem.id);
        }

        const order = {
          contact: {
            firstName: form.firstName.value,
            lastName: form.lastName.value,
            address: form.address.value,
            city: form.city.value,
            email: form.email.value,
          },
          products: produits,
        };

        const passerCommande = await fetch(`http://localhost:3000/api/products/order`, {
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
        const json = await passerCommande.json();
        const order_id = json.orderId;
        location.href = `confirmation.html?order_id=${order_id}`;
      }

    })
  }
  postItem();
}

main();