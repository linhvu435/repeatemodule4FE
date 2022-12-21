
function logout() {
    localStorage.setItem("token", "")
    localStorage.setItem("username", "");
    localStorage.setItem("roles", "");
    localStorage.setItem("id_user","");
    localStorage.setItem("id_shop","");
    location.href = "login.html"
}

document.getElementById("user").innerHTML = localStorage.getItem("username")

let totalPages = 1;

function getData(pageNumber) {

    if (pageNumber < 0) {
        pageNumber = 0;
    }
    if (pageNumber > totalPages - 1) {
        pageNumber = totalPages - 1;
    }

    $.ajax({
        type: "GET",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            "Authorization": 'Bearer ' + localStorage.getItem('token')
        },
        // url: ur,
        url: `http://localhost:8080/user/products?page=${pageNumber}`,
        // xu ly khi thanh cong
        success: function (data) {
            document.getElementById("ShowList").innerHTML = showData(data);
            totalPages = data.totalPages;
        },
        error: function (err) {
        }
    })
}

getData(0)

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
        str += `<td><input type="text" id="${arrProduct[i].id}"></td>`
        str += `<td><button type="button" onclick="comment( document.getElementById('${arrProduct[i].id}').value,localStorage.getItem('id_user'),${arrProduct[i].id})">comment</td>`
        str += `<td><button type="button" onclick="">star</button></td>`
        str += `<td><button type="button" onclick="">buy</button></td>`
        str += `</div>`
        str += "</tr>"
    }
    str += `  <button onclick="getData(${pageable.number - 1})">Previous</button>
            <span>${pageable.number + 1}</span>/<span>${pageable.totalPages}</span>
             <button onclick="getData(${pageable.number + 1})">Next</button>`

    return str;
}

function comment(comment,id_user,id_product){
    let cmt = comment
    let idUser = id_user
    let idProduct = id_product

    let comment1 = {
        text : cmt,
        id_account : idUser,
        id_product : idProduct
    }
    $.ajax({
        type: "GET",
        headers: {
            //kiểu dữ liệu nhận về
            'Accept': 'application/json',
            // kiểu truyền đi
            'Content-Type': 'application/json',
            "Authorization": 'Bearer ' + localStorage.getItem('token')
        },
        url: "http://localhost:8080/comment",
        data: comment1,
        //xử lý khi thành công
        success: function (data) {
            alert("Comment thành công!")
            document.getElementById(id_product).value = ""
        },
        error: function (err) {

        }
    })
    // document.getElementById("cmt").value = ""
}