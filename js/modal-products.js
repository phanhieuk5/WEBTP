document.addEventListener("DOMContentLoaded", function () {
    const modal = document.getElementById("product-modal");

    // Đảm bảo modal luôn ẩn khi trang mới tải
    if (modal) {
        modal.style.display = "none"; // Chắc chắn modal ẩn khi tải trang
    }

    // Hàm mở modal
    window.openModal = function (productId) {
        const productElement = document.querySelector(`[data-id="${productId}"]`);
        const productDetails = document.querySelector(`#product-${productId}`);
        if (productElement && productDetails) {
            const productName = productElement.getAttribute("data-name");
            const productPrice = productElement.getAttribute("data-price");
            const productImage = productElement.getAttribute("data-image");
            const productDescription = productDetails.querySelector("p:first-child").textContent.trim();
            const productInfo = productDetails.querySelector("p:last-child").textContent.trim();

            document.getElementById("modal-title").textContent = productName;
            document.getElementById("modal-price").textContent = productPrice;
            document.getElementById("modal-image").src = productImage;
            document.getElementById("modal-description").innerHTML = ` ${productDescription}`;
            document.getElementById("modal-info").innerHTML = ` ${productInfo}`;

            modal.style.display = "flex"; // Hiển thị modal khi bấm vào sản phẩm
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

// Hàm thêm vào giỏ hàng
function addToCart(productId) {
    const productElement = document.querySelector(`[data-id="${productId}"]`);
    if (productElement) {
        const productName = productElement.getAttribute("data-name");
        alert(`Sản phẩm "${productName}" đã được thêm vào giỏ hàng!`);
    } 
}
