// script.js

// ==================== PHÂN TRANG ====================
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
        const productPage = Math.floor(index / productsPerPage) + 1;
        product.style.display = (productPage === currentPage) ? 'block' : 'none';
    });
}

function changePage(direction) {
    currentPage += direction;
    if (currentPage < 1) currentPage = 1;
    if (currentPage > totalPages) currentPage = totalPages;
    displayProducts();
    updatePageIndicator();
    toggleNavigationButtons();
}

function createPageButtons() {
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

// ==================== TÌM KIẾM VÀ LỌC SẢN PHẨM ====================
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
    currentPage = 1;
    displayProducts();
    createPageButtons();
}

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

// ==================== LỌC SẢN PHẨM THEO DANH MỤC ====================
function filterByCategory(category) {
    const products = document.querySelectorAll('.product');

    products.forEach(product => {
        const productCategory = product.getAttribute('data-category');
        product.style.display = (category === 'Tất cả' || productCategory === category) ? 'block' : 'none';
    });
}

// ==================== MODAL NGƯỜI DÙNG VÀ ĐĂNG NHẬP ====================

function displayLoggedInUser() {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    const userGreeting = document.getElementById('user-greeting');

    if (loggedInUser && loggedInUser.username) {
        // Nếu người dùng đã đăng nhập, hiển thị lời chào kèm theo tên
        userGreeting.innerHTML = `<i class="fa fa-user"></i> Xin chào, ${loggedInUser.username}!`;
        userGreeting.href = "javascript:void(0);"; // Không chuyển hướng khi nhấn vào biểu tượng
        userGreeting.onclick = toggleUserMenu; // Gọi hàm mở menu khi nhấn vào biểu tượng
    } else {
        // Nếu người dùng chưa đăng nhập, chỉ hiển thị biểu tượng và chuyển đến trang đăng nhập khi nhấn
        userGreeting.innerHTML = `<i class="fa fa-user"></i>`;
        userGreeting.href = 'nhanh/login.html'; // Chuyển hướng đến trang đăng nhập
        userGreeting.onclick = null; // Bỏ sự kiện mở menu khi chưa đăng nhập
    }
}
document.addEventListener('DOMContentLoaded', displayLoggedInUser);
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



