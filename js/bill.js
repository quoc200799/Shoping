async function getInforCustomer() {
    let data = await getCustomer();
    UiCustomer(data)
};
getInforCustomer()

function UiCustomer(data) {
    let htmlUiList
    if (0 === data.length) {
        htmlUiList = `<img src="https://giian.vn/tp/T0114/mimg/cartempty.png" alt="" class="img-bill">`
        document.querySelector('.table').innerHTML = htmlUiList
    } else {
        htmlUiList = data.map(item => {
            let infor = "";
            item.cart.forEach(element => {
                return infor +=
                    `                        
                <tr>
                    <td><img class="rounded" src=${element.product.images} alt="Cinque Terre"> 
                    <span>${element.product.name}</span>
                    </td>
                    
                    <td>$ ${element.product.price.toLocaleString()}</td>
                    <td>${element.quantity}</td>
                    <td>$ ${(element.quantity * element.product.price).toLocaleString()}</td>
                </tr>                                `
            });
            return `
            <tr>
                    <td>${item.id}
                        <a class="nav-link dropdown-toggle text-primary" data-bs-toggle="dropdown" href="#">Details</a>
                        <div class="dropdown-menu" style="width:80vw">
                            <div style="overflow-x:auto; ">
                                <table class="table table-borderless">
                                    <thead>
                                           <tr>
                                         
                                            <th>Product Name</th>
                                            <th>Price</th>
                                            <th>Quantity</th>
                                            <th>Total</th>
                                        </tr>
                                    </thead>
                                    <tbody class="dropdown">
                                        ${infor}
                                       </tbody>
                                </table>
                            </div>
                        </div>
                    </td>
                    <td>${item.name}</td>
                    <td>${item.date}</td>
                    <td>${item.cart.length}</td>
                    <td>${item.sumquantity}</td>
                    <td>$ ${item.sumprice.toLocaleString()}</td>
                    <td><span onclick="handleReturn('${item.id}')" class="material-symbols-outlined delete-btn">cancel_presentation</span></td>
            </tr>
        `
        });
        document.querySelector('.getitembuy').innerHTML = htmlUiList.join('');
    }
}

async function updateQuantityReturn(id) {
    const product = handleDatalocalStorate(keyLocalStorageListSP);
    let update = await getCustomerUpdate(id);
    update.cart.forEach((item) => {
        let productItem = product.find(e => e.id == item.id);
        editData(item.id, { soLuong: productItem.soLuong + item.quantity })
    });

}

function handleReturn(id) {
    updateQuantityReturn(id);
    deleteCustomer(id);
    alert('Hoàn trả thành công');
}
