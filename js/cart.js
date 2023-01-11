function uiListItem() {
    let cart = handleDatalocalStorate(keyLocalStorageItemCart);
    let htmlUiList
    if (cart.length === 0) {
        htmlUiList = `<img src="http://bizweb.dktcdn.net/100/319/764/themes/668785/assets/empty-cart.png?1529997226343" alt="" class="empty">`
        document.querySelector(".total-price").style.display = "none";
        document.querySelector(".shopping-cart-footer").style.display = "none";
        document.querySelector('.shopping-cart').innerHTML = htmlUiList
        document.querySelector('.btn-buy').style.display = "none"
    }
    else {
        htmlUiList = cart.map(item => {
            return `
            <tr>
                <td>
                    <div class="product-item">
                        <a class="product-thumb" href="#"><img
                                src=${item.product.images} alt="Product"></a>
                        <div class="product-info">
                            <h4 class="product-title"><a href="#">${item.product.name}</a></h4><span><em>Quantity:</em>${item.product.soLuong}</span>
                        </div>
                    </div>
                </td>
                <td class="text-center">
                    <spaan class="count" onclick="decrease(${item.id})">-</spaan>
                    <span class="count-input">
                    ${item.quantity}
                    </span>
                    <span class="count" onclick="increment(${item.id})">+</span>
                </td>
                <td class="text-center text-lg">$ ${item.product.price.toLocaleString()}</td>
                <td class="text-center text-lg">$ ${(item.product.price * item.quantity).toLocaleString()}</td>
                <td class="text-center">
                    <span onclick="removeItem(${item.id})" style="cursor: pointer;color:red;" class="material-symbols-outlined">
cancel
</span>
                    </td>
            </tr>`
        });
        document.querySelector('.tbody').innerHTML = htmlUiList.join('');

        let total = cart.total();
        let totalquantity = total.get('totalprice')
        document.querySelector(".text-medium").textContent = "$" + totalquantity.toLocaleString()
    }



}
uiListItem();
// xóa cart
function removeItem(id) {
    let cartItem = handleDatalocalStorate(keyLocalStorageItemCart)
    const removeCart = cartItem.filter(item => item.id != id)
    handleDatalocalStorate(keyLocalStorageItemCart, removeCart)
    alert('Gỡ sản phẩm thành công.!')
    uiListItem()
}
// thêm bớt sản phẩm đã mua
function getProductbyId(producid) {
    const product = handleDatalocalStorate(keyLocalStorageListSP);
    const productitem = product.find(item => item.id === producid);
    return productitem
}

function increment(id) {
    let cart = handleDatalocalStorate(keyLocalStorageItemCart)
    let product = getProductbyId(id);
    const upCart = cart.find(item => item.id === id)
    if (product.soLuong === upCart.quantity) {
        alert('Hết hàng')
        return
    }
    upCart.quantity++
    handleDatalocalStorate(keyLocalStorageItemCart, cart)
    uiListItem()
}

function decrease(id) {
    let text = "Bạn có muốn gỡ sản phẩm ra khỏi giỏ hàng??";
    let cart = handleDatalocalStorate(keyLocalStorageItemCart)
    const upCart = cart.find(item => item.id === id)
    if (upCart.quantity == 1) {
        if (confirm(text) == true) {
            const removeCart = cart.filter(item => item.id != id)
            handleDatalocalStorate(keyLocalStorageItemCart, removeCart)
        } else {
            upCart.quantity++
        }
        uiListItem()
        return;
    } else {
        upCart.quantity--
    }
    handleDatalocalStorate(keyLocalStorageItemCart, cart)
    uiListItem()
}

//  lấy data andress
async function provinces(data) {
    let htmlprovinces = `
    <option value="0">--Chọn Tỉnh/ Thành phố--</option>
    `;
    htmlprovinces += await data.map(item => {
        return `
        <option value="${item.code}" data="provinces">${item.name}</option>
        `
    });
    document.getElementById('provinces').innerHTML = htmlprovinces;
}

function getDistricsByProvincesID(id) {
    getDistrics(function (data) {
        let htmldistricts = document.getElementById('districts');
        let uiDistricts = `
        <option value="0">--Chọn Huyện/Quận--</option>
        `;
        let listDitricts = [];
        for (let i = 0; i < data.length; i++) {
            if (data[i].province_code == id) {
                listDitricts.push(data[i])
            }
        }
        uiDistricts += listDitricts.map(item => {
            return `
            <option value="${item.code}" name="${item.name}">${item.name}</option>
            `
        })
        htmldistricts.innerHTML = uiDistricts
    })
    getDistricsByWardsID()
}

function getDistricsByWardsID(id) {
    getWards(function (data) {
        let htmlwards = document.getElementById('wards');
        let uiWards = `
        <option value="0">--Chọn Phường/Xã--</option>
        `;
        let listWards = [];
        for (let i = 0; i < data.length; i++) {
            if (data[i].district_code == id) {
                listWards.push(data[i])
            }
        };
        uiWards += listWards.map(item => {
            return `
            <option value="${item.code}" name="${item.name}">${item.name}</option>
            `
        });
        htmlwards.innerHTML = uiWards;
    })
}

async function dataCustomer() {
    const data = await getCustomer();
    getID(data)
}
dataCustomer()

function getID(data) {
    const Randomid = Math.random().toString(36).slice(2);
    const checkId = data?.find(e => e.id === Randomid)
    function increase() {
        if (!checkId) {
            return Randomid;
        }
    }
    return increase;
}
const getRandomID = getID();

const today = new Date().toLocaleDateString()

// update so luong item khi mua
function updateQuantityBuy() {
    const cart = handleDatalocalStorate(keyLocalStorageItemCart);
    const product = handleDatalocalStorate(keyLocalStorageListSP);
    cart.forEach(element => {
        let productItem = product.find(e => e.id === element.id);
        editData(element.id, { soLuong: productItem.soLuong - element.quantity })
    });
    handleDatalocalStorate(keyLocalStorageListSP, product)
}

function handleForm() {
    const cart = handleDatalocalStorate(keyLocalStorageItemCart)
    const total = cart.total();
    const totalprice = total.get('totalprice')
    const totalquantity = total.get('totalquantity')

    const lastname = document.querySelector('input[name="ho"]').value
    const firstname = document.querySelector('input[name="ten"]').value
    const email = document.querySelector('input[name="email"]').value
    const numbers = document.querySelector('input[name="sdt"]').value

    let sonhaform = document.querySelector('input[name="sonha"]').value
    let noteform = document.querySelector('textarea[name="note"]').value
    let provincesform = document.querySelector('#provinces')
    let districtsform = document.querySelector('#districts')
    let wardsform = document.querySelector('#wards')

    let dataProvinces = provincesform.options[provincesform.selectedIndex].text;
    let dataDistricts = districtsform.options[districtsform.selectedIndex].text;
    let dataWards = wardsform.options[wardsform.selectedIndex].text;

    if (validate()) {
        const customer = {
            name: lastname + " " + firstname,
            email: email,
            phone_number: numbers,
            sonha: sonhaform,
            province: dataProvinces,
            district: dataDistricts,
            wards: dataWards,
            note: noteform,
            date: today,
            id: getRandomID(),
            cart: cart,
            sumprice: totalprice,
            sumquantity: totalquantity

        }
        createCustomer(customer)
        updateQuantityBuy()
        handleDatalocalStorate(keyLocalStorageItemCart, [])
        alert("Mua hàng thành công!");
        window.location.reload()
    }

}

const lastname = document.querySelector('input[name="ho"]')
const firstname = document.querySelector('input[name="ten"]')
const email = document.querySelector('input[name="email"]')
const numbers = document.querySelector('input[name="sdt"]')
const sonhaform = document.querySelector('input[name="sonha"]')
let provincesform = document.querySelector('#provinces')
let districtsform = document.querySelector('#districts')
let wardsform = document.querySelector('#wards')

var error_valid = document.querySelectorAll(".error-valid");


function validate() {
    const emailValue = email.value.trim()
    const firstnameValue = firstname.value.trim()
    const lastnameValue = lastname.value.trim()
    const phoneValue = numbers.value.trim()
    const andress = sonhaform.value.trim()

    error_valid.forEach(e => e.textContent = "")
    let text
    let isCheck = true;

    if (lastnameValue === "") {
        setError(lastname, 'Họ không được để trống');
        isCheck = false;
    } else {
        setSuccess(lastname)
    }
    if (firstnameValue === "") {
        setError(firstname, 'Tên không được để trống');
        isCheck = false;
    }
    if (emailValue === "") {
        setError(email, 'Email không được để trống');
        isCheck = false;
    } else if (!isEmail(emailValue)) {
        setError(email, 'Email không đúng định dạng');
        isCheck = false;
    }
    if (phoneValue === '') {
        setError(numbers, 'Số không được để trống');
        isCheck = false;
    } else if (!isPhone(phoneValue)) {
        setError(numbers, 'Số không đúng định dạng');
        isCheck = false;
    }
    if (provincesform.value === "0") {
        text = "Xin hãy nhập Tỉnh thành";
        error_valid[4].textContent = text;
        isCheck = false;
    }
    if (districtsform.value === "0") {
        text = "Xin hãy nhập Huyện/Quận";
        error_valid[5].textContent = text;
        isCheck = false;
    }
    if (wardsform.value === "0") {
        text = "Xin hãy nhập Phường/Xã";
        error_valid[6].textContent = text;
        isCheck = false;
    }
    if (andress === "") {
        text = "Xin hãy nhập địa chỉ";
        error_valid[7].textContent = text;
        isCheck = false;
    }
    return isCheck;
}

function setSuccess(ele) {
    ele.parentNode.classList.add('success');
}

function setError(ele, message) {
    let parentEle = ele.parentNode;
    parentEle.classList.add('error');
    parentEle.querySelector('small').innerText = message;
}

function isEmail(email) {
    return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        email
    );
}

function isPhone(number) {
    return /(84|0[3|5|7|8|9])+([0-9]{8})\b/.test(number);
}

