async function getProduct() {
    const product = await getData();
    UiProduct(product)
    cartNumber()
};
getProduct();

function UiProduct(product) {
    const htmls = product.map(element => {
        return ` 
            <li class="item">
                <button onclick="addSP(${element.id})" class="item-add"><span class="material-symbols-outlined">
                add_shopping_cart
                </span></button>
                <img src=${element.images} alt="">
                <p class="item-description">This is an item description. Interesting content about the item will go here.
                </p>
                <h4 class="item-name">${element.name}</h4>
                <div class="content-buy">
                <h5 class="item-price">$<span class="price">${element.price.toLocaleString()}</span></h5>
                <h5 class="item-price"><span>Quantity: </span>${element.soLuong}</h5>
                </div>
            </li>       
`
    })
    document.querySelector('.l-items').innerHTML = htmls.join('');
}

function cartNumber() {
    let cart = handleDatalocalStorate(keyLocalStorageItemCart)
    let total = cart.total();
    let totalquantity = total.get('totalquantity')
    let htmlcart = document.querySelector(".iconbag")

    htmlcart.textContent = totalquantity;
};

async function getLocalProduct() {
    const product = await getData();
    handleDatalocalStorate(keyLocalStorageListSP, product)
}
getLocalProduct()

// var dsItemCard = [];
// handleDatalocalStorate(keyLocalStorageItemCart, dsItemCard)

function getProductbyId(producid) {
    const product = handleDatalocalStorate(keyLocalStorageListSP);
    const productitem = product.find(item => item.id === producid);
    return productitem
}

function addSP(id) {
    let cart = handleDatalocalStorate(keyLocalStorageItemCart)
    let cartItem = cart.find(e => e.id === id)
    let produc = getProductbyId(id);
    if (produc.soLuong === 0) {
        alert('Hết hàng trong kho!!')
        return
    } else {
        if (cartItem) {
            if (produc.soLuong === cartItem.quantity) {
                alert('Hết hàng rồi!!')
                return
            }
            cartItem.quantity++

        } else {
            let newCart = {
                id: id,
                product: produc,
                quantity: 1
            }
            cart.push(newCart)
        }
    }
    handleDatalocalStorate(keyLocalStorageItemCart, cart)
    cartNumber()
}