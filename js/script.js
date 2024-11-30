const productsPerPage = 10;
let currentPage = 1;
let filteredProducts = []; // Mảng để lưu trữ sản phẩm đã lọc

// Hàm để hiển thị sản phẩm từ localStorage với phân trang
function renderProducts() {
    const totalProducts = filteredProducts.length;
    const productList = document.getElementById("product-list");
    productList.innerHTML = ''; // Xóa nội dung cũ

    // Tính toán chỉ số bắt đầu và kết thúc cho trang hiện tại
    const startIndex = (currentPage - 1) * productsPerPage;
    const endIndex = startIndex + productsPerPage;

    // Hiển thị sản phẩm cho trang hiện tại
    for (let i = startIndex; i < endIndex && i < totalProducts; i++) {
        const product = filteredProducts[i];
        const productElement = document.createElement('div');
        productElement.className = 'product';
        productElement.setAttribute('data-id', product.id);
        productElement.setAttribute('data-name', product.name);
        productElement.setAttribute('data-price', product.price);
        productElement.setAttribute('data-category', product.category);
        productElement.setAttribute('data-description', product.description);
        productElement.setAttribute('data-image', product.image);

        productElement.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h2>${product.name}</h2>
            <p>Giá: ${product.price.toLocaleString()} VND/(1kg)</p>
            <div class="button-container">
                <button class="button" onclick="openModal(this)">Xem chi tiết</button>
                <button class="add-to-cart-btn" onclick="addToCart(this)"><i class="fas fa-shopping-cart"></i></button>
            </div>
        `;
        productList.appendChild(productElement);
    }

    // Cập nhật thông tin phân trang
    document.getElementById('page-info').innerText = `Page ${currentPage}`;
    document.getElementById('prev').disabled = currentPage === 1;
    document.getElementById('next').disabled = endIndex >= totalProducts;
}
// Hàm thay đổi trang
function changePage(direction) {
    currentPage += direction;
    renderProducts();
}

// Gọi hàm khi trang tải
document.addEventListener('DOMContentLoaded', () => {
    saveInitialProducts();
    renderProducts();
});

// Hàm lọc sản phẩm theo danh mục
function filterByCategory(category) {
    const allProducts = JSON.parse(localStorage.getItem("products")) || [];

    // Lọc sản phẩm theo danh mục
    filteredProducts = category === 'Tất cả'
        ? allProducts
        : allProducts.filter(product => product.category === category);

    currentPage = 1; // Đặt về trang đầu tiên
    renderProducts(); // Hiển thị lại sản phẩm sau khi lọc
}
// Gọi hàm khi trang tải
document.addEventListener('DOMContentLoaded', () => {
    filterByCategory('Tất cả'); // Mặc định hiển thị tất cả sản phẩm khi trang tải lên
});


// ==================== CHUYỂN ĐỘNG CỦA BANNER ====================
let currentSlide = 0;
const slides = document.querySelectorAll('.banner-slide');
const totalSlides = slides.length;

function showSlide(index) {
    slides.forEach((slide, i) => {
        slide.classList.remove('active');
        if (i === index) {
            slide.classList.add('active');
        }
    });
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides;
    showSlide(currentSlide);
}

setInterval(nextSlide, 5000); // Chuyển ảnh mỗi 5 giây

// ==================== CUỘN ĐẾN DANH SÁCH SẢN PHẨM ====================
function scrollToProduct() {
    document.getElementById('product-list').scrollIntoView({
        behavior: 'smooth'
    });
}
let profileDropdownList = document.querySelector(".profile-dropdown-list");
let btn = document.querySelector(".profile-dropdown-btn");

const toggleDropdown = () => profileDropdownList.classList.toggle("show");

window.addEventListener("click", function (e) {
    if (!btn.contains(e.target)) profileDropdownList.classList.remove("show");
});

// Hàm đăng xuất
function logout() {
    alert("Bạn đã đăng xuất.");
    window.location.href = "nhanh/login.html"; // Đường dẫn đến trang đăng nhập
}



