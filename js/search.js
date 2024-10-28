
// search.js

// Function to filter products by name
// Hàm để tìm kiếm theo tên sản phẩm
function filterByName() {
    const searchName = document.getElementById("search-name").value.toLowerCase();
    const productElements = document.querySelectorAll(".product");

    productElements.forEach(product => {
        const productName = product.getAttribute("data-name").toLowerCase();

        // Kiểm tra nếu tên sản phẩm chứa từ khóa tìm kiếm
        if (productName.includes(searchName)) {
            product.style.display = "block"; // Hiển thị sản phẩm khớp
        } else {
            product.style.display = "none"; // Ẩn sản phẩm không khớp
        }
    });
}

// Function to filter products by price
function filterByPrice() {
    const minPrice = parseFloat(document.getElementById('min-price').value) || 10000;
    const maxPrice = parseFloat(document.getElementById('max-price').value) || 5000000;
    const products = document.querySelectorAll('.product');

    products.forEach(product => {
        const productPrice = parseFloat(product.dataset.price);
        product.style.display = (productPrice >= minPrice && productPrice <= maxPrice) ? 'block' : 'none';
    });

    updatePagination();
}

// Function to update pagination after filtering
function updatePagination() {
    const visibleProducts = document.querySelectorAll('.product[style*="display: block"]');
    totalPages = Math.ceil(visibleProducts.length / productsPerPage);
    currentPage = 1;
    displayProducts();
    createPageButtons();
}
// Toggle dropdown display
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


