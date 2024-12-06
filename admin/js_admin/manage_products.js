document.addEventListener('DOMContentLoaded', function () {
    const itemsPerPage = 10; // Số sản phẩm trên mỗi trang
    const products = Array.from(document.querySelectorAll('#product-list .product')); // Lấy danh sách sản phẩm
    const pagination = document.getElementById('pagination'); // Container phân trang
    const categoryDropdown = document.getElementById('category-dropdown'); // Dropdown danh mục
    const searchNameInput = document.getElementById('search-name'); // Ô tìm kiếm theo tên sản phẩm
    const minPriceInput = document.getElementById('min-price'); // Ô nhập giá tối thiểu
    const maxPriceInput = document.getElementById('max-price'); // Ô nhập giá tối đa
    const searchButton = document.getElementById('search-button'); // Nút tìm kiếm
    let currentPage = 1; // Trang hiện tại
    let filteredProducts = [...products]; // Danh sách sản phẩm được lọc (mặc định là tất cả)

    // Hàm hiển thị sản phẩm theo trang
    function displayPage(page) {
        // Ẩn tất cả sản phẩm
        products.forEach(product => (product.style.display = 'none'));

        // Hiển thị các sản phẩm lọc theo trang
        const startIndex = (page - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const visibleProducts = filteredProducts.slice(startIndex, endIndex);
        visibleProducts.forEach(product => {
            product.style.display = 'block';
        });
        updatePagination(page); // Cập nhật phân trang
    }

    // Hàm cập nhật nút phân trang
    function updatePagination(page) {
        pagination.innerHTML = ''; // Xóa các nút phân trang cũ
        const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

        // Nếu chỉ có 1 trang, ẩn phân trang
        if (totalPages <= 1) {
            pagination.style.display = 'none';
        } else {
            pagination.style.display = 'flex'; // Hiển thị phân trang khi có nhiều hơn 1 trang

            for (let i = 1; i <= totalPages; i++) {
                const button = document.createElement('button');
                button.textContent = i;
                if (i === page) {
                    button.classList.add('active'); // Thêm class 'active' nếu là trang hiện tại
                }
                button.addEventListener('click', () => {
                    currentPage = i;
                    displayPage(currentPage);
                });
                pagination.appendChild(button);
            }
        }
    }

    // Hàm lọc sản phẩm theo danh mục, tên và giá
    function filterProducts(category, searchQuery, minPrice, maxPrice) {
        // Lọc theo danh mục
        let result = category === 'all' ? products : products.filter(product => product.dataset.category === category);

        // Lọc theo tên sản phẩm
        result = result.filter(product => product.dataset.name.toLowerCase().includes(searchQuery));

        // Lọc theo giá sản phẩm
        result = result.filter(product => {
            const productPrice = parseFloat(product.dataset.price);
            return productPrice >= minPrice && productPrice <= maxPrice;
        });

        filteredProducts = result; // Cập nhật danh sách sản phẩm lọc
        currentPage = 1; // Reset về trang đầu tiên
        displayPage(currentPage); // Hiển thị trang đầu tiên sau khi lọc
    }

    // Lắng nghe sự kiện thay đổi trên dropdown danh mục
    categoryDropdown.addEventListener('change', function () {
        const selectedCategory = this.value; // Lấy danh mục được chọn
        filterProducts(selectedCategory, searchNameInput.value.toLowerCase(), parseFloat(minPriceInput.value) || 0, parseFloat(maxPriceInput.value) || Infinity);
    });

    // Lắng nghe sự kiện nhập từ ô tìm kiếm
    searchButton.addEventListener('click', function () {
        const searchQuery = searchNameInput.value.toLowerCase();
        const minPrice = parseFloat(minPriceInput.value) || 0;
        const maxPrice = parseFloat(maxPriceInput.value) || Infinity;
        const selectedCategory = categoryDropdown.value; // Lấy danh mục đã chọn

        filterProducts(selectedCategory, searchQuery, minPrice, maxPrice); // Lọc sản phẩm và phân trang lại
    });

    // Lắng nghe sự kiện thay đổi từ ô tìm kiếm theo giá
    minPriceInput.addEventListener('input', function () {
        const searchQuery = searchNameInput.value.toLowerCase();
        const minPrice = parseFloat(minPriceInput.value) || 0;
        const maxPrice = parseFloat(maxPriceInput.value) || Infinity;
        const selectedCategory = categoryDropdown.value;
        filterProducts(selectedCategory, searchQuery, minPrice, maxPrice);
    });

    maxPriceInput.addEventListener('input', function () {
        const searchQuery = searchNameInput.value.toLowerCase();
        const minPrice = parseFloat(minPriceInput.value) || 0;
        const maxPrice = parseFloat(maxPriceInput.value) || Infinity;
        const selectedCategory = categoryDropdown.value;
        filterProducts(selectedCategory, searchQuery, minPrice, maxPrice);
    });

    // Mặc định hiển thị tất cả sản phẩm và phân trang
    filterProducts('all', '', 0, Infinity); // Không có từ khóa tìm kiếm, giá và danh mục mặc định
});

// Hàm xóa sản phẩm
function deleteProduct(productId) {
    if (confirm("Bạn có chắc chắn muốn xóa sản phẩm này không?")) {
        alert("Sản phẩm đã được xóa.");
    }
}
// Hàm thêm sản phẩm
function addProduct() {
    // Logic thêm sản phẩm (thêm sản phẩm vào danh sách, database, v.v.)
    
    // Sau khi thêm thành công, hiển thị thông báo alert
    alert('Sản phẩm đã được thêm thành công!');
}
