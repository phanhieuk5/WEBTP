// auth.js

// Hàm đăng ký người dùng
document.getElementById('register-form')?.addEventListener('submit', function(e) {
    e.preventDefault(); // Ngăn chặn hành động mặc định của form

    const username = document.getElementById('username').value;
    const email = document.getElementById('register-email').value;
    const password = document.getElementById('register-password').value;

    // Kiểm tra xem tài khoản đã tồn tại chưa
    let users = JSON.parse(localStorage.getItem('users')) || [];
    const existingUser = users.find(user => user.email === email);

    if (existingUser) {
        alert('Email này đã được sử dụng!');
    } else {
        // Thêm người dùng mới vào localStorage
        users.push({ username, email, password });
        localStorage.setItem('users', JSON.stringify(users));
        alert('Đăng ký thành công! Bạn có thể đăng nhập ngay bây giờ.');
        window.location.href = 'login.html'; // Chuyển hướng đến trang đăng nhập
    }
});

// Hàm đăng nhập người dùng
document.getElementById('login-form')?.addEventListener('submit', function(e) {
    e.preventDefault(); // Ngăn chặn hành động mặc định của form

    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    let users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(user => user.email === email && user.password === password);

    if (user) {
        alert(`Chào mừng ${user.username}!`);
        localStorage.setItem('loggedInUser', JSON.stringify(user)); // Lưu thông tin người dùng đã đăng nhập
        window.location.href = '../index.html'; // Chuyển hướng về trang chính
    } else {
        alert('Thông tin đăng nhập không chính xác. Vui lòng thử lại.');
    }
});
function logout() {
    localStorage.removeItem("loggedInUser"); // Xóa thông tin người dùng khỏi localStorage
    alert("Bạn đã đăng xuất thành công.");
    window.location.reload(); // Tải lại trang để cập nhật giao diện
}
// auth.js

// Hàm hiển thị trạng thái đăng nhập của người dùng
function displayLoggedInUser() {
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    const profileDropdownBtn = document.querySelector('.profile-dropdown-btn');
    const profileDropdownList = document.querySelector('.profile-dropdown-list');

    if (loggedInUser) {
        profileDropdownBtn.innerHTML = `<i class="fa fa-user"></i> <span>${loggedInUser.username} <i class="fa fa-angle-down"></i></span>`;
        profileDropdownList.innerHTML = `
            <li class="profile-dropdown-list-item">
                <a href="nhanh/cart.html"><i class="fa fa-shopping-cart"></i> Giỏ hàng</a>
            </li>
            <li class="profile-dropdown-list-item">
                <a href="nhanh/customer_info.html"><i class="fa-regular fa-user"></i> Thông tin khách hàng</a>
            </li>
            <li class="profile-dropdown-list-item">
                <a href="nhanh/purchase_history.html"><i class="fa-solid fa-clock-rotate-left"></i> Lịch sử mua hàng</a>
            </li>
            <hr>
            <li class="profile-dropdown-list-item">
                <a href="javascript:void(0);" onclick="logout()"><i class="fa-solid fa-arrow-right-from-bracket"></i> Đăng xuất</a>
            </li>
        `;
    } else {
        profileDropdownBtn.innerHTML = `<i class="fa fa-user"></i> <span>Tài khoản <i class="fa fa-angle-down"></i></span>`;
        profileDropdownList.innerHTML = `
            <li class="profile-dropdown-list-item">
                <a href="nhanh/login.html"><i class="fa fa-sign-in-alt"></i> Đăng nhập</a>
            </li>
            <li class="profile-dropdown-list-item">
                <a href="nhanh/register.html"><i class="fa fa-user-plus"></i> Đăng ký</a>
            </li>
        `;
    }
}
function logout() {
    localStorage.removeItem('loggedInUser'); // Xóa thông tin đăng nhập của người dùng
    alert("Bạn đã đăng xuất thành công.");
    displayLoggedInUser(); // Cập nhật lại giao diện sau khi đăng xuất
}

// Gọi hàm hiển thị khi trang tải
document.addEventListener('DOMContentLoaded', displayLoggedInUser);

