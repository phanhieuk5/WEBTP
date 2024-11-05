// search.js

// Hàm để tìm kiếm sản phẩm theo tên
function filterByName() {
    const searchName = document.getElementById("search-name").value.toLowerCase();
    const productElements = document.querySelectorAll(".product");

    productElements.forEach(product => {
        const productName = product.getAttribute("data-name").toLowerCase();
        if (productName.includes(searchName)) {
            product.style.display = "block";
        } else {
            product.style.display = "none";
        }
    });

    // Cập nhật phân trang sau khi lọc
    updatePagination();
}

// Hàm lọc sản phẩm theo giá
function filterByPrice() {
    const minPrice = parseFloat(document.getElementById('min-price').value) || 10000;
    const maxPrice = parseFloat(document.getElementById('max-price').value) || 5000000;
    const products = document.querySelectorAll('.product');

    products.forEach(product => {
        const productPrice = parseFloat(product.dataset.price);
        product.style.display = (productPrice >= minPrice && productPrice <= maxPrice) ? 'block' : 'none';
    });

    // Cập nhật phân trang sau khi lọc
    updatePagination();
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
