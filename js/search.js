document.addEventListener('DOMContentLoaded', function () {
    const itemsPerPage = 10; // Số sản phẩm trên mỗi trang
    const products = Array.from(document.querySelectorAll('#product-list .product')); // Lấy danh sách sản phẩm
    const pagination = document.getElementById('pagination'); // Container phân trang
    let currentPage = 1; // Trang hiện tại

    // Hàm hiển thị sản phẩm theo trang
    function displayPage(page) {
        // Ẩn tất cả sản phẩm
        products.forEach(product => (product.style.display = 'none'));

        // Tính chỉ số sản phẩm cần hiển thị
        const startIndex = (page - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const visibleProducts = products.slice(startIndex, endIndex);

        // Hiển thị các sản phẩm trong khoảng
        visibleProducts.forEach(product => {
            product.style.display = 'block';
        });

        updatePagination(page); // Cập nhật phân trang
    }

    // Hàm cập nhật nút phân trang
    function updatePagination(page) {
        pagination.innerHTML = ''; // Xóa các nút phân trang cũ
        const totalPages = Math.ceil(products.length / itemsPerPage); // Tính tổng số trang

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

    // Mặc định hiển thị tất cả sản phẩm và phân trang
    displayPage(currentPage); // Hiển thị trang đầu tiên
});
