// Hiển thị thông báo thành công bằng alert()
function showSuccessNotification(message) {
    alert(message);  // Sử dụng alert thay vì thay đổi nội dung div
}

// Hàm thêm sản phẩm
function addProduct() {
    showSuccessNotification('Đã thêm sản phẩm thành công!');
}

// Lưu thay đổi sản phẩm khi sửa
function saveChanges(button) {
    const row = button.closest('tr'); // Lấy dòng hiện tại
    const name = row.cells[1].innerText; // Lấy tên sản phẩm
    const price = row.cells[2].innerText; // Lấy giá sản phẩm
    const category = row.cells[3].querySelector('select').value; // Lấy phân loại
    const description = row.cells[4].innerText; // Lấy mô tả

    console.log(`Sửa sản phẩm: ${name}, ${price}, ${category}, ${description}`);

    // Hiển thị thông báo thành công
    showSuccessNotification('Đã sửa sản phẩm thành công!');
}

// Xóa sản phẩm khi nhấn nút Xóa
function deleteProduct(button) {
    const row = button.closest('tr'); // Lấy dòng cần xóa
    row.remove(); // Xóa dòng

    showSuccessNotification('Đã xóa sản phẩm thành công!');
}

// Hàm thay đổi hình ảnh khi nhấp vào ảnh
function changeImage(imgElement) {
    const fileInput = imgElement.closest('td').querySelector('input[type="file"]');
    fileInput.click(); // Kích hoạt input file khi nhấp vào hình ảnh
}

// Hàm hiển thị ảnh đã chọn trong input file
function previewImage(input) {
    const file = input.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const imgElement = input.closest('td').querySelector('img');
            imgElement.src = e.target.result; // Cập nhật src của ảnh với hình ảnh mới
        };
        reader.readAsDataURL(file); // Đọc hình ảnh đã chọn và hiển thị
    }
}
