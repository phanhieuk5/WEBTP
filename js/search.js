function removeDiacritics(str) {
    return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

function searchProducts() {
    // Lấy giá trị từ các ô tìm kiếm
    const nameSearch = removeDiacritics(document.getElementById('search-name').value.toLowerCase());
    const minPrice = parseFloat(document.getElementById('min-price').value) || 0;
    const maxPrice = parseFloat(document.getElementById('max-price').value) || Infinity;

    // Lấy danh sách các sản phẩm
    const products = document.querySelectorAll('.product');
    let found = false;

    products.forEach(product => {
        const productName = removeDiacritics(product.getAttribute('data-name').toLowerCase());
        const productPrice = parseFloat(product.getAttribute('data-price'));

        let isNameMatch = productName.includes(nameSearch);
        let isPriceMatch = productPrice >= minPrice && productPrice <= maxPrice;

        if (isNameMatch && isPriceMatch) {
            product.style.display = 'block';
            found = true;
        } else {
            product.style.display = 'none';
        }
    }); 
}

// Đăng ký sự kiện click
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('search-button').addEventListener('click', searchProducts);
});