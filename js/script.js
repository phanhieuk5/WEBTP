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

