// Kiểm tra trạng thái đăng nhập
if (!localStorage.getItem('isLoggedIn')) {
    // Nếu chưa đăng nhập, chuyển đến trang đăng nhập
    window.location.href = 'login_admin.html';
}

// Xử lý đăng xuất
document.getElementById('logout').addEventListener('click', function() {
    localStorage.removeItem('isLoggedIn'); // Xóa trạng thái đăng nhập
    window.location.href = 'login_admin.html'; // Chuyển về trang đăng nhập
});
// Xử lý hiển thị thông tin tài khoản khi nhấn nút
document.getElementById('admin-info-button').addEventListener('click', function() {
    const adminUsername = 'admin'; // Thay thế bằng tên người dùng thực tế
    alert(`Tài khoản của bạn: ${adminUsername}`);
});

// Hàm hiển thị thông tin quản lý (giả lập)
function displayManagementInfo() {
    // Bạn có thể thực hiện các thao tác AJAX để lấy dữ liệu hoặc làm gì đó khác tại đây
    console.log("Đang hiển thị thông tin quản lý...");
}

// Gọi hàm hiển thị thông tin khi trang được tải
document.addEventListener('DOMContentLoaded', displayManagementInfo);

// Sự kiện cho nút đăng xuất
const logoutButton = document.querySelector('.nav-bar a[href="html_admin/logout.html"]');
if (logoutButton) {
    logoutButton.addEventListener('click', logout);
}
