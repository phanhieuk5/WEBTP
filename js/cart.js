const cart = JSON.parse(localStorage.getItem('cart')) || [];
// của product
const products = [
    { id: 1, name: "Bơ Booth", price: 50000, description: "Bơ Booth chất lượng cao.", image: "img/bobooth.jpg" },
    { id: 2, name: "Nho mẫu đơn", price: 180000, description: "Nho mẫu đơn thơm ngon.", image: "img/nhomaudon.jpg" },
    { id: 3, name: "Táo Mỹ", price: 150000, description: "Táo Mỹ tươi ngon, nhập khẩu.", image: "img/taomy.jpg" },
    { id: 4, name: "Việt quất", price: 180000, description: "Việt quất tươi từ Đà Lạt.", image: "img/vietquat.jpg" },
    { id: 5, name: "Táo xanh", price: 80000, description: "Táo xanh giòn và ngọt.", image: "img/taoxanh.jpg" },
    { id: 6, name: "Dâu Tây Đà Lạt", price: 100000, description: "Dâu Tây Đà Lạt chín mọng.", image: "img/dautaydalat.jpg" },
    { id: 7, name: "Bắp cải xanh", price: 25000, description: "Bắp cải xanh, giàu dinh dưỡng.", image: "img/bapcaixanh.jpg" },
    { id: 8, name: "Cà Chua", price: 20000, description: "Cà chua tươi ngon, bổ dưỡng.", image: "img/cachua.jpg" },
    { id: 9, name: "Cà Rốt", price: 30000, description: "Cà rốt tươi, nhiều vitamin A.", image: "img/carot.jpg" },
    { id: 10, name: "Khoai Tây", price: 25000, description: "Khoai tây chất lượng cao.", image: "img/khoaitay.jpg" },
    { id: 11, name: "Bông cải trắng", price: 35000, description: "Bông cải trắng tươi ngon.", image: "img/bongcaitrang.jpg" },
    { id: 12, name: "Cà tím loại 1", price: 20000, description: "Cà tím chất lượng, loại 1.", image: "img/catimloai1.jpg" },
    { id: 13, name: "Cua Hoàng Đế", price: 800000, description: "Cua Hoàng Đế tươi sống.", image: "img/cuahoangde.jpg" },
    { id: 14, name: "Cá hồi miền", price: 200000, description: "Cá hồi tươi, nhiều dinh dưỡng.", image: "img/cahoimien.jpg" },
    { id: 15, name: "Thịt cá ngừ đại dương", price: 200000, description: "Cá ngừ đại dương tươi.", image: "img/thitcangudaiduong.jpg" },
    { id: 16, name: "Ghẹ", price: 250000, description: "Ghẹ tươi sống, chất lượng cao.", image: "img/ghe.jpg" },
    { id: 17, name: "Tôm", price: 250000, description: "Tôm tươi sống, chất lượng.", image: "img/tom.jpg" },
    { id: 18, name: "Sò Huyết", price: 70000, description: "Sò huyết tươi ngon.", image: "img/sohuyet.jpg" },
    { id: 19, name: "Đùi gà thả vườn", price: 120000, description: "Gà thả vườn chất lượng cao.", image: "img/duigathavuon.jpg" },
    { id: 20, name: "Thịt bò thượng hạng", price: 350000, description: "Thịt bò cao cấp, giàu dinh dưỡng.", image: "img/thitbothuonghang.jpg" },
    { id: 21, name: "Trứng gà thả vườn", price: 40000, description: "Trứng gà thả vườn, tự nhiên.", image: "img/trunggathavuon.jpg" },
    { id: 22, name: "Gà ta", price: 150000, description: "Gà ta tươi ngon.", image: "img/gata.jpg" },
    { id: 23, name: "Thịt cá ngừ đại dương", price: 200000, description: "Cá ngừ đại dương tươi.", image: "img/thitcangudaiduong.jpg" },
    { id: 24, name: "Bắp Mỹ", price: 15000, description: "Bắp Mỹ ngọt ngào, tươi mới.", image: "img/bapmy.jpg" },
    { id: 25, name: "Dưa chuột", price: 18000, description: "Dưa chuột tươi mát.", image: "img/duachuot.jpg" },
    { id: 26, name: "Tỏi khô", price: 50000, description: "Tỏi khô, hương vị đậm đà.", image: "img/toikho.jpg" },
    { id: 27, name: "Bí ngòi xanh", price: 25000, description: "Bí ngòi tươi xanh.", image: "img/bingoixanh.jpg" },
    { id: 28, name: "Rong nho", price: 50000, description: "Rong nho tươi, giàu khoáng chất.", image: "img/rongnho.jpg" },
    { id: 29, name: "Lúa mì", price: 30000, description: "Lúa mì chất lượng cao.", image: "img/luami.jpg" },
    { id: 30, name: "Nho đen Nam Mỹ", price: 190000, description: "Nho đen nhập khẩu Nam Mỹ.", image: "img/nhodennammy.jpg" },
    { id: 31, name: "Rau ngót", price: 15000, description: "Rau ngót tươi, bổ dưỡng.", image: "img/raungot.jpg" },
    { id: 32, name: "Dưa gang", price: 25000, description: "Dưa gang thơm ngon.", image: "img/duagang.jpg" }
];
// Tải giỏ hàng từ localStorage khi trang tải
function cartLoadPage() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartItemsContainer = document.getElementById('cart-items');
    const totalPriceElement = document.getElementById('total-price');
    cartItemsContainer.innerHTML = ''; // Xóa nội dung cũ

    let totalPrice = 0;

    // Hiển thị từng sản phẩm trong giỏ hàng
    cart.forEach((product, index) => {
        const productElement = document.createElement('div');
        productElement.classList.add('cart-item');

        productElement.innerHTML = `
            <img src="../img/${product.image}" alt="${product.name}">
            <span>${product.name}</span>
            <span>${product.price.toLocaleString()} VNĐ</span>
            <input type="number" value="${product.quantity}" min="1" class="quantity-input"
                   onchange="updateQuantity(${index}, this.value)">
            <span>${(product.price * product.quantity).toLocaleString()} VNĐ</span>
            <button class="btn-remove" onclick="removeFromCart(${index})">Xóa</button>
        `;

        cartItemsContainer.appendChild(productElement);
        totalPrice += product.price * product.quantity;
    });

    totalPriceElement.innerText = totalPrice.toLocaleString() + ' VNĐ';
}

// Cập nhật số lượng sản phẩm
function updateQuantity(index, quantity) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart[index].quantity = parseInt(quantity);
    localStorage.setItem('cart', JSON.stringify(cart));
    cartLoadPage(); // Cập nhật lại giỏ hàng
}

// Xóa sản phẩm khỏi giỏ hàng
function removeFromCart(index) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    cartLoadPage(); // Cập nhật lại giỏ hàng
}

// Gọi hàm cartLoadPage để tải giỏ hàng khi trang được mở
document.addEventListener('DOMContentLoaded', cartLoadPage);
