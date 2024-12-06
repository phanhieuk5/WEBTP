// Hàm mở modal khi bấm "Sửa"
function openEditModal(productId) {
    const modal = document.getElementById("edit-modal");
    const product = document.querySelector(`.product[data-id="${productId}"]`);
    
    // Điền thông tin sản phẩm vào modal
    document.getElementById("edit-name").value = product.dataset.name;
    document.getElementById("edit-price").value = product.dataset.price;
    document.getElementById("edit-description").value = product.querySelector(".product-details p").textContent;
    // Bạn có thể thêm logic xử lý ảnh ở đây nếu cần

    // Hiển thị modal
    modal.style.display = "block";
}

// Hàm đóng modal
function closeModal() {
    const modal = document.getElementById("edit-modal");
    modal.style.display = "none";
}

// Hàm lưu thông tin khi sửa sản phẩm
function saveEdit() {
    const name = document.getElementById("edit-name").value;
    const price = document.getElementById("edit-price").value;
    const description = document.getElementById("edit-description").value;

    // Cập nhật sản phẩm trong danh sách
    // Lưu lại các thay đổi (giả sử thông qua API hoặc logic thêm sản phẩm vào danh sách)
    alert("Sản phẩm đã được cập nhật.");

    // Đóng modal
    closeModal();
}

// Hàm xóa sản phẩm
function deleteProduct(productId) {
    if (confirm("Bạn có chắc chắn muốn xóa sản phẩm này không?")) {
        alert("Sản phẩm đã được xóa.");
    }
}
