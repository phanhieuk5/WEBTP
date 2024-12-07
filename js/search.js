document.addEventListener('DOMContentLoaded', function () {
    const itemsPerPage = 10; // Số sản phẩm trên mỗi trang
    const products = Array.from(document.querySelectorAll('#product-list .product')); // Lấy danh sách sản phẩm
    const pagination = document.getElementById('pagination'); // Container phân trang
    const categoryDropdown = document.getElementById('category-dropdown'); // Dropdown danh mục
    let currentPage = 1; // Trang hiện tại
    let filteredProducts = [...products]; // Danh sách sản phẩm lọc (mặc định là tất cả)

    // Hàm hiển thị sản phẩm theo trang
    function displayPage(page) {
        // Ẩn tất cả sản phẩm
        products.forEach(product => (product.style.display = 'none'));

        // Tính chỉ số sản phẩm cần hiển thị
        const startIndex = (page - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const visibleProducts = filteredProducts.slice(startIndex, endIndex);

        // Hiển thị các sản phẩm trong khoảng
        visibleProducts.forEach(product => {
            product.style.display = 'block';
        });

        updatePagination(page); // Cập nhật phân trang
    }

    // Hàm cập nhật nút phân trang
    function updatePagination(page) {
        pagination.innerHTML = ''; // Xóa các nút phân trang cũ
        const totalPages = Math.ceil(filteredProducts.length / itemsPerPage); // Tính tổng số trang

        // Nếu chỉ có 1 trang, ẩn phân trang
        if (totalPages <= 1) {
            pagination.style.display = 'none';
        } else {
            pagination.style.display = 'flex'; // Hiển thị phân trang khi có nhiều hơn 1 trang

            // Tạo các nút phân trang
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

    // Hàm lọc sản phẩm theo danh mục
    function filterByCategory(category) {
        filteredProducts = category === 'all' 
            ? products 
            : products.filter(product => product.dataset.category === category);

        currentPage = 1; // Reset về trang đầu tiên
        displayPage(currentPage); // Hiển thị trang đầu tiên của các sản phẩm đã lọc
    }

    // Lắng nghe sự kiện thay đổi trên dropdown danh mục
    categoryDropdown.addEventListener('change', function () {
        const selectedCategory = this.value; // Lấy danh mục được chọn
        filterByCategory(selectedCategory); // Lọc và hiển thị sản phẩm
    });

    // Mặc định hiển thị tất cả sản phẩm và phân trang
    filterByCategory('all'); // Hiển thị tất cả sản phẩm khi tải trang lần đầu
});
