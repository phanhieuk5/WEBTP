// Hàm kiểm tra đăng nhập
document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault(); // Ngăn chặn gửi form

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Giả sử chúng ta có một tài khoản mặc định
    const validUser = { username: "admin", password: "123456" };

    // Kiểm tra tên đăng nhập và mật khẩu
    if (username === validUser.username && password === validUser.password) {
        // Nếu đúng, lưu trạng thái đăng nhập và chuyển đến trang quản trị
        localStorage.setItem('isLoggedIn', 'true'); // Đổi thành 'isLoggedIn'
        window.location.href = 'admin_dashboard.html';
    } else {
        // Hiển thị thông báo lỗi
        document.getElementById('message').textContent = 'Tên đăng nhập hoặc mật khẩu không đúng.';
    }
});
