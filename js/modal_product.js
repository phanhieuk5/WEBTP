
// Biến để lưu trữ sản phẩm hiện tại trong modal
let currentProductId = null;

// Hàm mở modal và hiển thị chi tiết sản phẩm
// Tìm sản phẩm theo ID và hiển thị trong modal

// Mở modal với thông tin sản phẩm
function openModal(productId) {
    const product = products.find(item => item.id === productId);
    currentProductId = productId;
    
    if (product) {
        document.getElementById("modal-product-image").src = product.image;
        document.getElementById("modal-product-name").textContent = product.name;
        document.getElementById("modal-product-price").textContent = `Giá: ${product.price} VND`;
        document.getElementById("modal-product-description").textContent = product.description;
        document.getElementById("modal-quantity").value = 1; // Đặt lại số lượng về 1 khi mở modal
        document.getElementById("product-modal").style.display = "flex";
    }
}

// Đóng modal
function closeModal() {
    document.getElementById("product-modal").style.display = "none";
}


