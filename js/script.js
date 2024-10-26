let currentPage = 1;
const productsPerPage = 10; // Mỗi trang hiển thị 10 sản phẩm
let totalPages = 1;

// Hàm cập nhật chỉ báo trang
function updatePageIndicator() {
    const pageIndicator = document.getElementById('page-indicator');
    if (pageIndicator) {
        pageIndicator.innerText = `Trang ${currentPage} / ${totalPages}`;
    }
}

// Hàm chuyển đổi trạng thái nút điều hướng
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

// Hàm hiển thị sản phẩm
function displayProducts() {
    const productElements = document.querySelectorAll('.product');
    productElements.forEach((product, index) => {
        // Tính toán trang mà sản phẩm này thuộc về
        const productPage = Math.floor(index / productsPerPage) + 1;
        product.style.display = (productPage === currentPage) ? 'block' : 'none';
    });
}

// Hàm thay đổi trang
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

// Hàm tạo các nút phân trang
function createPageButtons() {
    const paginationContainer = document.querySelector('.pagination');
    updatePageIndicator();
    toggleNavigationButtons();
}

// Hàm khi trang được tải
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

// Hàm cuộn khi ấn vào mua ngay
function scrollToProduct() {
    document.getElementById('product-list').scrollIntoView({
        behavior: 'smooth'
    });
}

// Chuyển động của banner
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

// Danh mục sản phẩm
function filterByCategory(category) {
    const products = document.querySelectorAll('.product');

    products.forEach(product => {
        const productCategory = product.getAttribute('data-category');
        
        // Kiểm tra nếu sản phẩm thuộc danh mục đã chọn
        if (category === 'Tất cả' || productCategory === category) {
            product.style.display = 'block';
        } else {
            product.style.display = 'none';
        }
    });
}
//Bieu tuong người dùng
function openUserInfoModal() {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    if (loggedInUser) {
        document.getElementById('user-name').innerText = `Tên: ${loggedInUser.username}`;
        document.getElementById('user-email').innerText = `Email: ${loggedInUser.email}`;
    }
    document.getElementById('user-info-modal').style.display = 'block';
}

function closeUserInfoModal() {
    document.getElementById('user-info-modal').style.display = 'none';
}

// Gọi hàm openUserInfoModal khi nhấp vào biểu tượng người dùng
document.querySelector('.header-icons a:nth-child(1)').addEventListener('click', function(event) {
    event.preventDefault(); // Ngăn chặn hành động mặc định
    openUserInfoModal(); // Mở modal
});
//
document.addEventListener('DOMContentLoaded', () => {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    
    // Nếu có người dùng đã đăng nhập, hiển thị tên người dùng
    if (loggedInUser) {
        document.querySelector('.header-icons a:nth-child(1)').innerText = `Xin chào, ${loggedInUser.username}!`;
        document.querySelector('.header-icons a:nth-child(1)').addEventListener('click', function(event) {
            event.preventDefault(); // Ngăn chặn hành động mặc định
            openUserInfoModal(); // Mở modal thông tin người dùng
        });
    } else {
        // Nếu không có người dùng đăng nhập, hiển thị thông báo mặc định hoặc chuyển đến trang đăng nhập
        document.querySelector('.header-icons a:nth-child(1)').innerText = 'Đăng Nhập';
        document.querySelector('.header-icons a:nth-child(1)').addEventListener('click', function() {
            window.location.href = 'nhanh/login.html'; // Chuyển đến trang đăng nhập
        });
    }
});
function logout() {
    localStorage.removeItem('loggedInUser'); // Xóa thông tin đăng nhập
    window.location.href = 'nhanh/login.html'; // Chuyển hướng về trang đăng nhập
}
function displayLoggedInUser() {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    const userGreeting = document.querySelector('.header-icons a:nth-child(1)'); // Giả sử đây là vị trí hiển thị thông tin người dùng

    if (loggedInUser) {
        userGreeting.innerText = `Xin chào, ${loggedInUser.username}!`;
        userGreeting.href = "#"; // Ngăn chặn chuyển hướng nếu đã đăng nhập
        userGreeting.addEventListener('click', function(event) {
            event.preventDefault(); // Ngăn chặn hành động mặc định
            openUserInfoModal(); // Mở modal hiển thị thông tin người dùng
        });
    } else {
        userGreeting.innerText = 'Đăng Nhập'; // Nếu không có người dùng đăng nhập
        userGreeting.href = 'nhanh/login.html'; // Chuyển đến trang đăng nhập
    }
}
