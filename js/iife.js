let apiData = 'http://localhost:3000/cartlist';
let apiCustomer = 'http://localhost:3000/customerinfor';

const app = (function () {
    function handleDatalocalStorate(key, data) {
        let dataLocal
        if (data) {
            localStorage.setItem(key, JSON.stringify(data))
        } else {
            dataLocal = JSON.parse(localStorage.getItem(key))
        }
        return dataLocal;
    }
    // Data cua list card
    function getData(data) {
        fetch(apiData)
            .then((response) => response.json())
            .then((data))
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

    // Data cua Customer
    function getCustomer(data) {
        fetch(apiCustomer)
            .then((response) => response.json())
            .then(data)
            .catch((e) => console.log(e))

    }
    function getCustomerUpdate() {
        return fetch(apiCustomer)
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

    const handleTotalQuantity = (array, name) => {
        let total = 0;
        if (name) {
            for (let i in array) {
                total += array[i][name]
            }
        } else {
            total = array.reduce((prev, next) => prev + next, 0)
        }
        return total;
    }

    const handleTotalPrice = (array, name) => {
        let total = 0;
        if (name) {
            for (let i in array) {
                total += array[i][name]
            }
        } else {
            total = array.reduce((prev, next) => prev + next, 0)
        }
        return total;
    }

    return {
        handleDatalocalStorate: handleDatalocalStorate,
        getData: getData,
        editData: editData,
        getCustomer: getCustomer,
        createCustomer: createCustomer,
        deleteCustomer: deleteCustomer,
        handleTotalQuantity: handleTotalQuantity,
    }
})() 
