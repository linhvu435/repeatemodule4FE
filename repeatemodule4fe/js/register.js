function register1() {
    let userName = $("#userName").val();
    let passWord = $("#passWord").val();
    let address = $("#address").val();
    let phoneNumber = $("#phoneNumber").val();
    let email = $("#email").val();
    let roles = $("#roles").val();

    let account = {
        userName: userName,
        passWord: passWord,
        address: address,
        phoneNumber: phoneNumber,
        email: email,
        roles: {id: roles}
    }
    $.ajax({
        type: "POST",
        headers: {
            //kiểu dữ liệu nhận về
            'Accept': 'application/json',
            // kiểu truyền đi
            'Content-Type': 'application/json'
        },
        url: "http://localhost:8080/register",
        data: JSON.stringify(account),
        //xử lý khi thành công
        success: function (data) {
            alert("Đăng ký thành công!")
            location.href = "login.html"
        },
        error: function (err) {
            alert("dang ky that bai")

        }
    })
}
function checkUser() {
    let userName = document.getElementById("userName").value;
    $.ajax({
        type: "GET",
        headers: {
            //kiểu dữ liệu nhận về
            'Accept': 'application/json',
            // kiểu truyền đi
            'Content-Type': 'application/json'
        },
        url: "http://localhost:8080/register/user",
        data: {
            userName: userName,
        },
        success: function (data) {
        },
        error() {
            document.getElementById("userName-err").innerHTML = `  <p style="filter: brightness(120%)" id="messageFailed" class="small-font text-uppercase text-center py-2 text-danger bg-danger-light2 ">Trùng UserName Rồi</p>`

        }
    })
}
function checkMail() {
    let email = document.getElementById("email").value;
    $.ajax({
        type: "GET",
        headers: {
            //kiểu dữ liệu nhận về
            // 'Accept': 'application/json',
            // kiểu truyền đi
            'Content-Type': 'application/json'
        },
        url: "http://localhost:8080/register/email",
        data: {
            email: email,
        },
        success: function (data) {
        },
        error() {
            document.getElementById("email-err").innerHTML = `  <p style="filter: brightness(120%)" id="messageFailed" class="small-font text-uppercase text-center py-2 text-danger bg-danger-light2 ">Trùng email rồi</p>`

        }
    })
}
function checkPassWord() {
    let passWord = document.getElementById("passWord").value;
    let confirmpassword = document.getElementById("confirmpassword").value;
    if (passWord == confirmpassword) {
        document.getElementById("pass-err").innerHTML = ""
    }else {
        document.getElementById("pass-err").innerHTML = `  <p style="filter: brightness(120%)" class="small-font text-uppercase text-center py-2 text-danger bg-danger-light2 ">"Passwords do not match!</p>`
    }if (confirmpassword == ""){
        document.getElementById("pass-err").innerHTML = ""

    }
}




function checkTrong() {
    let userName = document.getElementById("userName").value;
    let passWord = document.getElementById("passWord").value;
    let confirmpassword = document.getElementById("confirmpassword").value;
    let address = document.getElementById("address").value;
    let phoneNumber = document.getElementById("phoneNumber").value;
    let email = document.getElementById("email").value;
    let roles = document.getElementById("roles").value;
    if (userName ===""&&passWord === ""&&confirmpassword === ""&&address === ""&&phoneNumber === ""&&email === ""&& roles === ""){
        document.getElementById("checktrong1").innerHTML=` <p class="btn-danger" style="color: white">Khong được bo trống ô trên</p>`
        document.getElementById("checktrong2").innerHTML=` <p class="btn-danger" style="color: white">Khong được bor trống ô trên</p>`
        document.getElementById("checktrong3").innerHTML=` <p class="btn-danger" style="color: white">Khong được bor trống ô trên</p>`
        document.getElementById("checktrong4").innerHTML=` <p class="btn-danger" style="color: white">Khong được bor trống ô trên</p>`
        document.getElementById("checktrong5").innerHTML=` <p class="btn-danger" style="color: white">Khong được bo trống ô trên</p>`
        document.getElementById("checktrong6").innerHTML=` <p class="btn-danger" style="color: white">Khong được bo trống ô trên</p>`
        document.getElementById("checktrong7").innerHTML=` <p class="btn-danger" style="color: white">Khong được bo trống ô trên</p>`
        return true
    }else {
        return false;
    }
}
function dangki() {
    if (checkTrong()){
        checkTrong()
    } else {
        register();
    }
}
