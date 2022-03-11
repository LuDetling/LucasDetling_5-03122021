const main = async () => {
    const params = new URLSearchParams(document.location.search);
    const id = params.get('id');
    const response = await fetch(`http://localhost:3000/api/products/${id}`);
    if (!response.ok) {
        console.log('Network request for products.json failed with response ' + response.status + ': ' + response.statusText);
        return;
    }
    const products = await response.json();

    const {

        price,
        name,
        imageUrl,
        altTxt,
        description,
        colors
    } = products;

    document.querySelector(".item__img").innerHTML = `<img src="${imageUrl}" alt="${altTxt}">`;
    document.querySelector("#title").innerHTML = name;
    document.querySelector("#price").innerHTML = price;
    document.querySelector("#description").innerHTML = description;

    const color_select = document.querySelector("#colors");

    for (const color of colors) {
        let option = document.createElement("option");
        option.innerHTML = color;
        color_select.appendChild(option);
    }

    const quantity = document.querySelector("#quantity");


    document.querySelector("#addToCart").addEventListener('click', () => {

        let intQuantity = parseInt(quantity.value);
        let color = color_select.value;
        const kanap = {
            "id": id,
            "quantity": intQuantity,
            "color": color
        };
        if (!intQuantity) {
            alert("il faut choisir une quantité");
            return;
        }
        if (!color) {
            alert("il faut choisir une couleur");
            return;
        }

        const array = JSON.parse(localStorage.getItem('kanap')) || [];

        //findindex permet de rechercher dans l'index de array 
        const key = array.findIndex(
            (e) => e.id == kanap.id && e.color == kanap.color
        );
        console.log(array[key]);
        // si la fonction key != -1 ce qui veut dire que la condition existe déjà dans array.findindex 
        // alors la quantité de kanap augmente par rapport à la donnée stocké dans array avec la fonction key
        if (key != -1) {
            kanap.quantity += array[key].quantity;
            array[key] = kanap;
        } else {
            array.push(kanap);

        }


        localStorage.setItem("kanap", JSON.stringify(array));



    })

    // créer 

    // si il y n'y a pas l'id ajouter

}


main();




// récupérer le nombre d'éléments qu'on veut dans le local storage