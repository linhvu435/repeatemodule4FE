let totalPages = 1;

function getData(pageNumber) {

    if (pageNumber < 0) {
        pageNumber = 0;
    }
    if (pageNumber > totalPages - 1) {
        pageNumber = totalPages - 1;
    }

    let id = localStorage.getItem("id_shop");
    let url1 = `http://localhost:8080/products/home/` + id + `?page=${pageNumber}`;
    $.ajax({
        type: "GET",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            "Authorization": 'Bearer ' + localStorage.getItem('token')
        },
        // url: ur,
        url: url1,
        // xu ly khi thanh cong
        success: function (data) {
            document.getElementById("showList").innerHTML = showData(data);
            totalPages = data.totalPages;
        },
        error: function (err) {
        }
    })
}


function showData(pageable) {
    let arrProduct = pageable.content;
    let str = "";
    for (let i = 0; i < arrProduct.length; i++) {

        str += "<tr>"
        str += `<div>`
        str += `<td>${arrProduct[i].name}</td>`
        str += `<td><img src="${arrProduct[i].img}" height="150" width="200"></td>`
        str += `<td>${arrProduct[i].price}</td>`
        str += `<td>${arrProduct[i].amount}</td>`
        str += `<td><button type="button" data-toggle="modal" data-target="#myModal1" onclick="showEdit(${arrProduct[i].id})">Edit</td>`
        str += `<td><button type="button" onclick="deleteProduct(${arrProduct[i].id})">Delete</button></td>`
        str += `</div>`
        str += "</tr>"
    }
    str += `  <button onclick="getData(${pageable.number - 1})">Previous</button>
            <span>${pageable.number + 1}</span>/<span>${pageable.totalPages}</span>
             <button onclick="getData(${pageable.number + 1})">Next</button>`

    return str;
}

function create() {
    let name = document.getElementById("name").value;
    let img = document.getElementById("img").value;
    let price = document.getElementById("price").value;
    let amount = document.getElementById("amount").value;
    let idshop = document.getElementById("idshop").value;
    let product = {
        name: name,
        img: img,
        price: price,
        amount: amount,
        shop: {id: idshop},
    }

    $.ajax({
        type: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            "Authorization": 'Bearer ' + localStorage.getItem('token')
        },
        url: `http://localhost:8080/products`,
        data: JSON.stringify(product),
        //xử lý khi thành công
        success: function (data) {
            alert("ok!")
            document.getElementById("name").value = ""
            document.getElementById("img").value = ""
            document.getElementById("price").value = ""
            document.getElementById("amount").value = ""
            document.getElementById("idshop").value = ""
            location.reload();
        },
        error: function (err) {
        }
    })
}

function findShopByUserName() {
    let id = localStorage.getItem("id_user");
    $.ajax({
        type: "GET",
        headers: {
            //kiểu dữ liệu nhận về
            'Accept': 'application/json',
            // kiểu truyền đi
            'Content-Type': 'application/json',
            "Authorization": 'Bearer ' + localStorage.getItem('token')
        },
        url: "http://localhost:8080/shop/" + id,
        success: function (data) {
            localStorage.setItem("id_shop", data.id)
            document.getElementById("idshop").value = data.id
            document.getElementById("shopName").innerHTML = data.name
            getData(0);

        },
        error: function (err) {
        }
    })
}

document.getElementById("namehienthi").innerHTML = localStorage.getItem("username")
findShopByUserName();


function deleteProduct(id) {
    $.ajax({
        type: "delete",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            "Authorization": 'Bearer ' + localStorage.getItem('token')
        },
        url: `http://localhost:8080/products/` + id,
        success: function () {
            alert("Do You Want Delete?")
            location.reload();
        },
        error: function (err) {
        }
    })
}

function showEdit(id) {
    $.ajax({
        type: "GET",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            "Authorization": 'Bearer ' + localStorage.getItem('token')
        },
        url: `http://localhost:8080/products/` + id,
        //xử lý khi thành công
        success: function (data) {
            document.getElementById("id").value = data.id;
            document.getElementById("nameEdit").value = data.name;
            document.getElementById("imgEdit").value = data.img;
            document.getElementById("priceEdit").value = data.price;
            document.getElementById("amountEdit").value = data.amount;
            document.getElementById("shop").value = data.shop.id;
        },
        error: function (err) {
        }
    })
}

function edit() {
    let id =   document.getElementById("id").value;
    let name = document.getElementById("nameEdit").value;
    let img =  document.getElementById("imgEdit").value;
    let price =  document.getElementById("priceEdit").value
    let amount =  document.getElementById("amountEdit").value
    let shop = document.getElementById("shop").value

    let product = {
        id : id,
        name: name,
        img: img,
        price: price,
        amount: amount,
        shop: {id :shop},
    }

    $.ajax({
        headers: {
            "Accept": "application/json",
            "Content-type": "application/json",
            "Authorization": 'Bearer ' + localStorage.getItem('token')
        },
        type: "PUT",
        url:  `http://localhost:8080/products/` + id,
        data: JSON.stringify(product),
        success: function (data) {

            alert("Do you want edit")
            location.reload();
        }
    })
    event.preventDefault()
}

