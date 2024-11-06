function openModal(element) {
    // Tìm phần tử sản phẩm
    const productElement = element.closest('.product');
    if (productElement) {
        const productId = productElement.getAttribute('data-id');
        const productName = productElement.getAttribute('data-name');
        const productPrice = productElement.getAttribute('data-price');
        const productDescription = productElement.getAttribute('data-description');
        const productImage = productElement.getAttribute('data-image');

        // Cập nhật modal với thông tin sản phẩm
        document.getElementById("modal-product-image").src = productImage;
        document.getElementById("modal-product-name").textContent = productName;
        document.getElementById("modal-product-price").textContent = `Giá: ${parseInt(productPrice).toLocaleString()} VND`;
        document.getElementById("modal-product-description").textContent = productDescription;

        // Lưu `productId` vào data-attribute của modal
        document.getElementById("product-modal").setAttribute("data-product-id", productId);

        // Hiển thị modal
        document.getElementById("product-modal").style.display = "flex";
    }
}

// Hàm đóng modal
function closeModal() {
    document.getElementById("product-modal").style.display = "none";
}

function addToCart(element = null) {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    if (!loggedInUser) {
        alert('Bạn cần đăng nhập để thêm sản phẩm vào giỏ hàng!');
        window.location.href = 'nhanh/login.html'; // Chuyển hướng đến trang đăng nhập
        return;
    }

    let productId, productName, productPrice, productImage;

    if (element) {
        // Lấy thông tin từ phần tử sản phẩm nếu `element` được truyền
        const productElement = element.closest('.product');
        if (!productElement) {
            console.error("Không tìm thấy phần tử sản phẩm.");
            return;
        }
        productId = parseInt(productElement.getAttribute('data-id'));
        productName = productElement.getAttribute('data-name');
        productPrice = parseInt(productElement.getAttribute('data-price'));
        productImage = productElement.getAttribute('data-image');  // Đường dẫn tương đối
    } else {
        // Nếu không có `element`, lấy thông tin từ modal
        const modal = document.getElementById("product-modal");
        productId = parseInt(modal.getAttribute("data-product-id"));
        productName = document.getElementById("modal-product-name").textContent;
        productPrice = parseInt(document.getElementById("modal-product-price").textContent.replace(/[^\d]/g, ''));
        
        // Lấy `data-image` từ `data-product-id` trong modal để đảm bảo tính nhất quán
        const productElement = document.querySelector(`.product[data-id="${productId}"]`);
        productImage = productElement ? productElement.getAttribute('data-image') : ''; // Đường dẫn tương đối
    }

    const quantity = 1;

    const cartItem = {
        id: productId,
        name: productName,
        price: productPrice,
        image: productImage,
        quantity: quantity
    };

    const username = loggedInUser.username;
    let cart = JSON.parse(localStorage.getItem(`cart_${username}`)) || [];

    let existingProductIndex = cart.findIndex(item => item.id === productId);
    if (existingProductIndex > -1) {
        cart[existingProductIndex].quantity += quantity;
        alert(`Đã thêm ${productName} vào giỏ hàng! Số lượng: ${cart[existingProductIndex].quantity}`);
    } else {
        cart.push(cartItem);
        alert(`Đã thêm ${productName} vào giỏ hàng! Số lượng: ${cartItem.quantity}`);
    }

    localStorage.setItem(`cart_${username}`, JSON.stringify(cart));

    updateCartQuantity();
}
// Hàm lưu trữ sản phẩm ban đầu từ HTML vào localStorage
function saveInitialProducts() {
    if (!localStorage.getItem("products")) { // Chỉ lưu nếu chưa có
        const products = Array.from(document.querySelectorAll('.product')).map(product => ({
            id: product.getAttribute('data-id'),
            name: product.getAttribute('data-name'),
            price: parseInt(product.getAttribute('data-price')),
            category: product.getAttribute('data-category'),
            description: product.getAttribute('data-description'),
            image: product.getAttribute('data-image')
        }));
        localStorage.setItem("products", JSON.stringify(products));
    }
}

// Gọi hàm lưu dữ liệu khi tải trang
window.onload = saveInitialProducts;
