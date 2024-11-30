// search.js


function normalizeString(str) {
    return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
}
// Hàm để tìm kiếm sản phẩm theo tên
function filterByName() {
    const searchName = normalizeString(document.getElementById("search-name").value);
    const allProducts = JSON.parse(localStorage.getItem("products")) || [];

    // Lọc sản phẩm theo tên
    filteredProducts = allProducts.filter(product => {
        const normalizedProductName = normalizeString(product.name);
        return normalizedProductName.includes(searchName);
    });

    currentPage = 1; // Đặt về trang đầu tiên
    renderProducts(); // Hiển thị lại sản phẩm sau khi lọc
}

// Hàm lọc sản phẩm theo giá
function filterByPrice() {
    const minPrice = parseFloat(document.getElementById('min-price').value) || 0;
    const maxPrice = parseFloat(document.getElementById('max-price').value) || Infinity;

    const allProducts = JSON.parse(localStorage.getItem("products")) || [];

    // Lọc sản phẩm theo giá
    filteredProducts = allProducts.filter(product => {
        const productPrice = parseFloat(product.price);
        return productPrice >= minPrice && productPrice <= maxPrice;
    });

    currentPage = 1; // Đặt về trang đầu tiên
    renderProducts(); // Hiển thị lại sản phẩm sau khi lọc
}
// Cập nhật phân trang sau khi lọc
function updatePagination() {
    const visibleProducts = document.querySelectorAll('.product[style*="display: block"]');
    totalPages = Math.ceil(visibleProducts.length / productsPerPage);
    currentPage = 1;
    displayProducts();
    createPageButtons();
}

// Hiển thị sản phẩm theo trang hiện tại
function displayProducts() {
    const visibleProducts = Array.from(document.querySelectorAll('.product[style*="display: block"]'));
    const start = (currentPage - 1) * productsPerPage;
    const end = start + productsPerPage;

    visibleProducts.forEach((product, index) => {
        product.style.display = (index >= start && index < end) ? 'block' : 'none';
    });
}

// Xử lý hiển thị dropdown cho bộ lọc
function toggleSearchFilter() {
    document.querySelector(".search-filter-container").classList.toggle("show");
}

// Đóng dropdown nếu nhấn bên ngoài
window.onclick = function(event) {
    if (!event.target.closest('.dropdown-button') && !event.target.closest('.search-filter-container')) {
        const dropdowns = document.getElementsByClassName("search-filter-container");
        for (let i = 0; i < dropdowns.length; i++) {
            const openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
    }
};
