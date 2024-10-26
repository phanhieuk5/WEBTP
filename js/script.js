let currentPage = 1;
const productsPerPage = 10; // Mỗi trang hiển thị 10 sản phẩm
let totalPages = 1;

function updatePageIndicator() {
    const pageIndicator = document.getElementById('page-indicator');
    if (pageIndicator) {
        pageIndicator.innerText = `Trang ${currentPage} / ${totalPages}`;
    }
}

function toggleNavigationButtons() {
    const prevButton = document.getElementById('prevPage');
    const nextButton = document.getElementById('nextPage');
    
    if (prevButton) {
        prevButton.disabled = (currentPage === 1);
    }
    if (nextButton) {
        nextButton.disabled = (currentPage === totalPages);
    }
}

function displayProducts() {
    const productElements = document.querySelectorAll('.product');
    productElements.forEach((product, index) => {
        // Tính toán trang mà sản phẩm này thuộc về
        const productPage = Math.floor(index / productsPerPage) + 1;
        product.style.display = (productPage === currentPage) ? 'block' : 'none';
    });
}


function changePage(direction) {
    currentPage += direction;
    if (currentPage < 1) {
        currentPage = 1;
    } else if (currentPage > totalPages) {
        currentPage = totalPages;
    }
    displayProducts();
    updatePageIndicator();
    toggleNavigationButtons();
}


function createPageButtons() {
    const paginationContainer = document.querySelector('.pagination');
    updatePageIndicator();
    toggleNavigationButtons();
}

window.onload = function() {
    const productElements = document.querySelectorAll('.product');
    totalPages = Math.ceil(productElements.length / productsPerPage);

    displayProducts();
    createPageButtons();
    updatePageIndicator();
    toggleNavigationButtons();
};

// Các hàm tìm kiếm và lọc
function filterByName() {
    const name = document.getElementById('search-name').value.toLowerCase();
    const products = document.querySelectorAll('.product');
    
    products.forEach(product => {
        const productName = product.querySelector('h2').innerText.toLowerCase();
        product.style.display = productName.includes(name) ? 'block' : 'none';
    });

    updatePagination();
}

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

function updatePagination() {
    const visibleProducts = document.querySelectorAll('.product[style*="display: block"]');
    totalPages = Math.ceil(visibleProducts.length / productsPerPage);
    currentPage = 1; // Reset về trang đầu
    displayProducts();
    createPageButtons();
}

// Lưu giỏ hàng và thêm sản phẩm vào giỏ
const cart = JSON.parse(localStorage.getItem('cart')) || [];

// Thêm sản phẩm vào giỏ hàng
function addToCart(name, price, image) {
    const product = { name, price, image };
    cart.push(product);
    localStorage.setItem('cart', JSON.stringify(cart));
    alert(`${name} đã được thêm vào giỏ hàng!`);
}

// Sự kiện cho nút "Thêm vào giỏ hàng"
document.querySelectorAll('.add-to-cart-btn').forEach(button => {
    button.addEventListener('click', function() {
        const productName = this.getAttribute('data-name');
        const productPrice = parseFloat(this.getAttribute('data-price'));
        addToCart(productName, productPrice);
        this.innerHTML = '<i class="fas fa-check"></i>'; 
        this.disabled = true; 
    });
});

// Hiển thị sản phẩm trong giỏ hàng
function displayCartItems() {
    const cartItemsContainer = document.getElementById('cart-items');
    cartItemsContainer.innerHTML = ''; 

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p>Chưa có sản phẩm nào trong giỏ hàng.</p>';
    } else {
        let totalPrice = 0;
        cart.forEach(item => {
            const productDiv = document.createElement('div');
            productDiv.innerHTML = `
                <h3>${item.name}</h3>
                <p>Giá: ${item.price} VND</p>
            `;
            cartItemsContainer.appendChild(productDiv);
            totalPrice += item.price;
        });
        
        document.getElementById('total-price').innerHTML = `Tổng giá: <span>${totalPrice} VND</span>`;
    }
}
//hàm cuộn khi ấn vào mua ngay
function scrollToProduct() {
    document.getElementById('product-list').scrollIntoView({
        behavior: 'smooth'
    });
}

window.onload = function() {
    const productElements = document.querySelectorAll('.product'); // Lấy tất cả sản phẩm
    totalPages = Math.ceil(productElements.length / productsPerPage); // Tính tổng số trang

    displayProducts();            // Hiển thị sản phẩm trên trang đầu tiên
    createPageButtons();          // Tạo các nút phân trang
    updatePageIndicator();        // Cập nhật chỉ báo trang
    toggleNavigationButtons();    // Kích hoạt hoặc vô hiệu hóa các nút chuyển trang
};

