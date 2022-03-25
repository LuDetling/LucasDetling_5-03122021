const main = async () => {
  const response = await fetch(`http://localhost:3000/api/products/`);
  if (!response.ok) {
    console.log('Network request for products.json failed with response ' + response.status + ': ' + response.statusText);
    return;
  }

  // DECLARATION VARIABLES
  const products = await response.json();
  let parseItems = JSON.parse(localStorage.getItem("kanap"));
  const cart__items = document.querySelector("#cart__items");

  // SI PANIER VIDE
  const pannierVide = (e) => {
    if (parseItems == null || parseItems.length == 0) {

      // CREATION P
      let panierVide = document.createElement("p");
      panierVide.innerText = "Votre panier est vide";
      cart__items.appendChild(panierVide);

    }
  }
  pannierVide();
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


      //SUPPRIMER UN ITEM DANS LE PANIER
      article.querySelector(".deleteItem").addEventListener("click", () => {
        const filtrer = parseItems.filter(item => item.id !== parseItem.id || item.color !== parseItem.color);
        localStorage.setItem("kanap", JSON.stringify(filtrer));
        parseItems = JSON.parse(localStorage.getItem("kanap"));
        cart__items.removeChild(article);
        totalItems();
        pannierVide();
      })

      //MODIFIER LA QUANTITE D'UN ITEM DANS LE PANIER

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

  // VALIDER LA COMMANDE
  const form = document.querySelector(".cart__order__form");

  const verifierFormulaire = (e) => {

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


  // PASSER LA COMMANDE

  const postItem = () => {

    form.order.addEventListener("click", async (e) => {

      verifierFormulaire();
      const verif = verifierFormulaire();
      const tableauVerif = Object.values(verif);
      e.preventDefault()

      if (tableauVerif.includes(true) && tableauVerif.includes(false) || tableauVerif.includes(false)) {
        e.preventDefault();
      } else {
        e.preventDefault();
        // REVERIFICATION SI LE LOCALSTORAGE EST VIDE
        if (parseItems === null) {

          let panierVide = document.createElement("p");
          panierVide.innerText = "Votre panier est vide";
          cart__items.appendChild(panierVide);

        } else {

          const produits = [];

          for (const parseItem of parseItems) {
            produits.push(parseItem.id);
          }

          // CREATION OBJET ORDER A POST
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

          // POSTER LA COMMANDE
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
      }

    })
  }
  postItem();

}

main();