document.addEventListener("DOMContentLoaded", function () {
    const modal = document.getElementById("product-modal");

    // Đảm bảo modal luôn ẩn khi trang mới tải
    if (modal) {
        modal.style.display = "none"; // Chắc chắn modal ẩn khi tải trang
    }

    // Hàm mở modal và điền thông tin vào các trường
    window.openEditModal = function (productId) {
        const productElement = document.querySelector(`[data-id="${productId}"]`);
        const productDetails = document.querySelector(`#product-${productId}`);
        if (productElement && productDetails) {
            const productName = productElement.getAttribute("data-name");
            const productPrice = productElement.getAttribute("data-price");
            const productImage = productElement.getAttribute("data-image");
            const productDescription = productDetails.querySelector("p:first-child").textContent.trim();
            const productInfo = productDetails.querySelector("p:last-child").textContent.trim();

            // Gán giá trị vào các trường trong modal
            document.getElementById("modal-title").value = productName; // Sửa tên sản phẩm
            document.getElementById("modal-price").value = productPrice; // Sửa giá sản phẩm
            document.getElementById("modal-description").value = productDescription; // Sửa mô tả sản phẩm
            document.getElementById("modal-info").value = productInfo; // Sửa thông tin sản phẩm
            document.getElementById("modal-image").src = productImage; // Hiển thị hình ảnh sản phẩm

            modal.style.display = "flex"; // Hiển thị modal khi bấm vào nút sửa
        }
    };

    // Hàm đóng modal
    window.closeModal = function () {
        modal.style.display = "none";
    };

    // Đóng modal khi click ra ngoài
    window.onclick = function (event) {
        if (event.target === modal) {
            closeModal();
        }
    };
});

// Hàm lưu thay đổi (ví dụ có thể xử lý gửi thay đổi qua API hoặc lưu vào cơ sở dữ liệu)
function saveChanges() {
    const updatedName = document.getElementById("modal-title").value.trim();
    const updatedPrice = document.getElementById("modal-price").value.trim();
    const updatedDescription = document.getElementById("modal-description").value.trim();
    const updatedInfo = document.getElementById("modal-info").value.trim();
    const updatedImage = document.getElementById("modal-image").src;

    // Xử lý lưu thay đổi (ví dụ: gửi lên server)
    console.log("Đã lưu thay đổi:", updatedName, updatedPrice, updatedDescription, updatedInfo, updatedImage);
    
    alert("Lưu thay đổi thành công!");

    closeModal();
}
