const main = async () => {
    const params = new URLSearchParams(document.location.search);
    const id = params.get('id');
    const res = await fetch(`http://localhost:3000/api/products/${id}`).then(function (response) {
        if (!response.ok) {
            console.log('Network request for products.json failed with response ' + response.status + ': ' + response.statusText);
        } else {
            response.json().then(function (json) {
                product = json;

                const {

                    price,
                    name,
                    imageUrl,
                    altTxt,
                    description,
                    colors
                } = product;

                document.querySelector(".item__img").innerHTML = `<img src="${imageUrl}" alt="${altTxt}">`;
                document.querySelector("#title").innerHTML = name;
                document.querySelector("#price").innerHTML = price / 100;
                document.querySelector("#description").innerHTML = description;

                const color_select = document.querySelector("#colors");

                for (color of colors) {
                    let option = document.createElement("option");
                    option.innerHTML = color;
                    color_select.appendChild(option);
                }

                const quantity = document.querySelector("#quantity");


                document.querySelector("#addToCart").addEventListener('click', () => {

                    let intQuantity = parseInt(quantity.value);
                    const kanap = {
                        "id": id,
                        "quantity": intQuantity,
                        "color": color_select.value
                    };
                    let parse = JSON.parse(localStorage.kanap)

                    if(!localStorage.kanap) {
                        localStorage.setItem('kanap', JSON.stringify(kanap));
                    } else if (!parse.id) {
                        console.log(parse.id);

                    }


                    // let stringifyKanap = JSON.stringify(kanap);
                    // let parseKanap = JSON.parse(stringifyKanap);

                    // if (!localStorage.kanap) {
                        
                    //     localStorage.setItem('kanap', stringifyKanap);

                    // } else {

                    // }
                })

                // créer 

                // si il y n'y a pas l'id ajouter


            });
        }
    });
}


main();




// récupérer le nombre d'éléments qu'on veut dans le local storage