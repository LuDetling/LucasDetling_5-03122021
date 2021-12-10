fetch('http://localhost:3000/api/products').then(function (response) {
    if (response.ok) {
        response.json().then(function (json) {
            products = json;
            console.log(products);

            let url = document.location.search;
            let urlCut = url.slice(4)
            // récupérer tous les kanap
            for (let i = 0; i < products.length; i++) {
                let id = products[i]._id;
                if(urlCut === id) {
                    let price = products[i].price; 
                    let nombreEntier = price.toString().slice(0, -2)
                    let centime = price.toString().slice(-2);

                    document.querySelector(".item__img").innerHTML = `<img src="${products[i].imageUrl}" alt="${products[i].altTxt}">`;
                    document.querySelector("#title").innerHTML = products[i].name;
                    document.querySelector("#price").innerHTML = nombreEntier + "," + centime;
                    document.querySelector("#description").innerHTML = products[i].description;

                    let colors = document.querySelector("#colors");
                    //Couleurs
                    for(let i = 0; i < products[i].colors.length; i++) {
                        let option = document.createElement("option");
                        option.innerHTML = products[i].colors[i];
                        colors.appendChild(option);

                    }

                
                }
            }

        });
    } else {
        console.log('Network request for products.json failed with response ' + response.status + ': ' + response.statusText);
    }
});

// récupérer le nombre d'éléments qu'on veut dans le local storage