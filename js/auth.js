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

// Hàm để hiển thị thông tin tài khoản đang đăng nhập
function displayLoggedInUser() {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    if (loggedInUser) {
        const welcomeMessage = document.createElement('p');
        welcomeMessage.innerText = `Xin chào, ${loggedInUser.username}!`;
        document.body.prepend(welcomeMessage);
    }
}
// Hàm để hiển thị thông tin tài khoản đang đăng nhập
function displayLoggedInUser() {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    if (loggedInUser) {
        const welcomeMessage = document.createElement('div');
        welcomeMessage.innerText = `Xin chào, ${loggedInUser.username}!`;
        welcomeMessage.style.cursor = 'pointer';
        welcomeMessage.onclick = () => showUserModal(); // Gọi hàm showUserModal khi nhấp vào
        document.querySelector('.header-icons').insertBefore(welcomeMessage, document.querySelector('.header-icons a'));
    }
}

// Hàm hiển thị modal thông tin người dùng
function showUserModal() {
    const modal = document.getElementById('user-modal');
    modal.style.display = 'block';
}

// Hàm đóng modal
function closeUserModal() {
    const modal = document.getElementById('user-modal');
    modal.style.display = 'none';
}
// Hàm đăng xuất
function logout() {
    localStorage.removeItem('loggedInUser'); // Xóa thông tin đăng nhập
    window.location.href = 'nhanh/login.html'; // Chuyển hướng về trang đăng nhập
}



