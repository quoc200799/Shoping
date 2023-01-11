var listData = []
let apiData = 'http://localhost:3000/cartlist';

function getData() {
    return fetch(apiData)
        .then((response) => response.json())
        .catch((e) => console.log(e))
}

function editData(id, data) {
    console.log(id, data)
    var options = {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    };
    fetch(apiData + "/" + id, options)
        .then((response) => response.json())
        .then((data))
        .catch((e) => console.log(e))
}

let apiCustomer = 'http://localhost:3000/customerinfor';

function getCustomer() {
    return fetch(apiCustomer)
        .then((response) => response.json())
        .catch((e) => console.log(e))

}
function getCustomerUpdate(id) {
    return fetch(apiCustomer + "/" + id)
        .then((response) => response.json())
        .catch((e) => console.log(e))
}

function createCustomer(data, callback) {
    var options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    };
    fetch(apiCustomer, options)
        .then((response) => response.json())
        .then((callback))
        .catch((e) => console.log(e))
}

function deleteCustomer(id) {
    var options = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
    };
    fetch(apiCustomer + "/" + id, options)
        .then((response) => response.json())

        .catch((e) => console.log(e))
}
// call api provinces

const API_POINT = "https://provinces.open-api.vn/api/"

fetch(API_POINT + 'p')
    .then((response) => response.json())
    .then((data) => {
        provinces(data)
    })
    .catch((e) => console.log(e))

function getDistrics(data) {
    fetch(API_POINT + 'd')
        .then((response) => response.json())
        .then((data))
        .catch((e) => console.log(e))
}

function getWards(data) {
    fetch(API_POINT + 'w')
        .then((response) => response.json())
        .then((data))
        .catch((e) => console.log(e))
}


const keyLocalStorageListSP = "DANHSACHSP";
const keyLocalStorageItemCart = "DANHSACHITEMCART";


function handleDatalocalStorate(key, value) {
    let dataLocal
    if (!value) {
        dataLocal = JSON.parse(localStorage.getItem(key))
    } else {
        localStorage.setItem(key, JSON.stringify(value))
    }
    return dataLocal;
}

// handleDatalocalStorate(keyLocalStorageItemCart, listData)
Array.prototype.total = function () {
    const totalquantity = this.reduce((sum, item) => sum + item.quantity, 0);
    const totalprice = this.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
    const map = new Map();
    map.set('totalquantity', totalquantity)
    map.set('totalprice', totalprice)
    return map
}


