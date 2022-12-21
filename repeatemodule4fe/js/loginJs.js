
function login() {
    let username = document.getElementById("userName").value;
    let password = document.getElementById("passWord").value;

    let Account = {
        userName: username,
        passWord: password,
    };
    $.ajax({
        type: "POST",
        headers: {
            //kiểu dữ liệu nhận về
            'Accept': 'application/json',
            // kiểu truyền đi
            'Content-Type': 'application/json'
        },
        url: "http://localhost:8080/login",
        data: JSON.stringify(Account),
        //xử lý khi thành công
        success: function (data) {
            console.log(data)
            localStorage.setItem("token", data.token);
            localStorage.setItem("username", data.username);
            localStorage.setItem("roles", data.roles.name);
            localStorage.setItem("id_user",data.id)
            if(data.roles.name === "ROLE_ADMIN"){
                location.href = "admin.html"
            }
            if (data.roles.name === "ROLE_USER"){
                location.href = "user.html"
            }
            if(data.roles.name === "ROLE_SHOP")
            {

                location.href = "shop.html"
            }
            alert("Đăng nhập thành công")
        },
        error: function (err) {
            console.log(err)
            //     alert("khong der tai khoan trong hoac mat khau trong ")
            // }else {
            alert("Sai tài khoản hoặc mật khẩu. Vui lòng nhập lại!")
            // }

        }
    })
}

function logout() {
    localStorage.setItem("token", "")
    localStorage.setItem("username", "");
    localStorage.setItem("roles", "");
    localStorage.setItem("id_user","");
    localStorage.setItem("id_shop","");
    location.href = "login.html"
}
