const main = () => {

    // RECUPERER ORDERID DANS URL
    const url = document.location.search;
    const id = new URLSearchParams(url)
    let orderId = id.get("order_id");

    // AFFICHER ORDERID
    const documentOrderId = document.querySelector("#orderId");
    documentOrderId.innerText = orderId;
    if(orderId != null) {
        localStorage.clear();
    }

}

main();