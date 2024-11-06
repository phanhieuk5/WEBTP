// Lấy danh sách người dùng từ localStorage và bổ sung thông tin từ customerInfo
function getUsers() {
    const users = JSON.parse(localStorage.getItem('users')) || [];

    users.forEach(user => {
        const customerInfo = JSON.parse(localStorage.getItem(`customerInfo_${user.username}`)) || {};
        user.address = customerInfo.address1 || 'N/A'; // Chỉ cần một địa chỉ
        user.phone = customerInfo.phone || 'N/A';
        user.status = user.status || 'Active';
    });

    return users;
}

// Hiển thị danh sách người dùng với một địa chỉ
function displayUsers() {
    const tableBody = document.getElementById('users-table');
    tableBody.innerHTML = '';
    const users = getUsers();

    users.forEach(user => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${user.username}</td>
            <td>${user.email}</td>
            <td>${user.address}</td>
            <td>${user.phone}</td>
            <td>${user.status}</td>
            <td>
                <button onclick="editUser('${user.username}')">Sửa</button>
                <button onclick="toggleUserStatus('${user.username}')">${user.status === 'Active' ? 'Khóa' : 'Mở khóa'}</button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

// Chỉnh sửa thông tin người dùng
function editUser(username) {
    const users = getUsers();
    const user = users.find(u => u.username === username);
    if (user) {
        const newEmail = prompt('Nhập email mới:', user.email);
        const newAddress = prompt('Nhập địa chỉ mới:', user.address);
        const newPhone = prompt('Nhập số điện thoại mới:', user.phone);
        
        if (newEmail) user.email = newEmail;
        if (newAddress) user.address = newAddress;
        if (newPhone) user.phone = newPhone;
        
        // Cập nhật thông tin vào customerInfo_username
        const customerInfo = {
            name: user.username,
            phone: newPhone,
            address1: newAddress
        };
        localStorage.setItem(`customerInfo_${username}`, JSON.stringify(customerInfo));

        saveUsers(users);
        displayUsers();
    }
}

// Lưu danh sách người dùng vào localStorage
function saveUsers(users) {
    localStorage.setItem('users', JSON.stringify(users));
}

// Thêm người dùng mới
function addUser() {
    const username = prompt('Nhập tên người dùng:');
    const email = prompt('Nhập email:');
    const address = prompt('Nhập địa chỉ:');
    const phone = prompt('Nhập số điện thoại:');
    const password = prompt('Nhập mật khẩu:');

    if (username && email && address && phone && password) {
        const users = getUsers();
        const newUser = {
            username: username,
            email: email,
            password: password,
            status: 'Active',
            address: address,
            phone: phone
        };
        users.push(newUser);
        saveUsers(users);
        
        const customerInfo = {
            name: username,
            phone: phone,
            address1: address
        };
        localStorage.setItem(`customerInfo_${username}`, JSON.stringify(customerInfo));

        displayUsers();
    } else {
        alert('Vui lòng điền đầy đủ thông tin!');
    }
}

// Thêm sự kiện cho nút "Thêm người dùng" khi trang tải
document.getElementById('addUserBtn').addEventListener('click', addUser);

// Hiển thị danh sách người dùng khi trang tải xong
window.onload = displayUsers;
