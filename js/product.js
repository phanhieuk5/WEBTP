// Danh sách sản phẩm
const products = [
    { id: "1", name: "Bơ Booth", price: 50000, image: "bobooth.jpg", description: "Bơ Booth giàu dinh dưỡng." },
    { id: "2", name: "Nho mẫu đơn", price: 180000, image: "nhomaudon.jpg", description: "Nho mẫu đơn ngọt ngào." },
    { id: "3", name: "Táo Mỹ", price: 150000, image: "taomy.jpg", description: "Táo Mỹ thơm ngon và giòn." },
    { id: "4", name: "Việt quất", price: 180000, image: "vietquat.jpg", description: "Việt quất tươi mới và bổ dưỡng." },
    { id: "5", name: "Táo xanh", price: 80000, image: "taoxanh.jpg", description: "Táo xanh tươi ngon." },
    { id: "6", name: "Dâu Tây Đà Lạt", price: 100000, image: "dautaydalat.jpg", description: "Dâu Tây Đà Lạt ngọt ngào." },
    { id: "7", name: "Bắp cải xanh", price: 25000, image: "bapcaixanh.jpg", description: "Bắp cải xanh tươi." },
    { id: "8", name: "Cà Chua", price: 20000, image: "cachua.jpg", description: "Cà chua chín mọng." },
    { id: "9", name: "Cà Rốt", price: 30000, image: "carot.jpg", description: "Cà rốt tốt cho sức khỏe." },
    { id: "10", name: "Khoai Tây", price: 25000, image: "khoaitay.jpg", description: "Khoai tây giòn ngon." },
    { id: "11", name: "Bông cải trắng", price: 35000, image: "bongcaitrang.jpg", description: "Bông cải trắng bổ dưỡng." },
    { id: "12", name: "Cà tím loại 1", price: 20000, image: "catimloai1.jpg", description: "Cà tím loại 1 tươi." },
    { id: "13", name: "Cua Hoàng Đế", price: 800000, image: "cuahoangde.jpg", description: "Cua Hoàng Đế tươi sống." },
    { id: "14", name: "Cá hồi miền", price: 200000, image: "cahoimien.jpg", description: "Cá hồi miền thơm ngon." },
    { id: "15", name: "Thịt cá ngừ đại dương", price: 200000, image: "thitcangudaiduong.jpg", description: "Thịt cá ngừ đại dương tươi ngon." },
    { id: "16", name: "Ghẹ", price: 250000, image: "ghe.jpg", description: "Ghẹ tươi ngọt." },
    { id: "17", name: "Tôm", price: 250000, image: "tom.jpg", description: "Tôm tươi ngon." },
    { id: "18", name: "Sò Huyết", price: 70000, image: "sohuyet.jpg", description: "Sò huyết bổ dưỡng." },
    { id: "19", name: "Đùi gà thả vườn", price: 120000, image: "duigathavuon.jpg", description: "Đùi gà thả vườn tươi ngon." },
    { id: "20", name: "Thịt bò thượng hạng", price: 350000, image: "thitbothuonghang.jpg", description: "Thịt bò thượng hạng." },
    { id: "21", name: "Trứng gà thả vườn", price: 40000, image: "trunggathavuon.jpg", description: "Trứng gà thả vườn." },
    { id: "22", name: "Gà ta", price: 150000, image: "gata.jpg", description: "Gà ta tươi ngon." },
    { id: "23", name: "Thịt cá ngừ đại dương", price: 200000, image: "thitcangudaiduong.jpg", description: "Thịt cá ngừ tươi ngon." },
    { id: "24", name: "Bắp Mỹ", price: 15000, image: "bapmy.jpg", description: "Bắp Mỹ ngọt." },
    { id: "25", name: "Dưa chuột", price: 18000, image: "duachuot.jpg", description: "Dưa chuột tươi giòn." },
    { id: "26", name: "Tỏi khô", price: 50000, image: "toikho.jpg", description: "Tỏi khô sạch." },
    { id: "27", name: "Bí ngòi xanh", price: 25000, image: "bingoixanh.jpg", description: "Bí ngòi xanh bổ dưỡng." },
    { id: "28", name: "Rong nho", price: 50000, image: "rongnho.jpg", description: "Rong nho sạch." },
    { id: "29", name: "Lúa mì", price: 30000, image: "luami.jpg", description: "Lúa mì giàu dinh dưỡng." },
    { id: "30", name: "Ngô ngọt", price: 17000, image: "ngongot.jpg", description: "Ngô ngọt tự nhiên." },
    { id: "31", name: "Khoai lang", price: 30000, image: "khoailang.jpg", description: "Khoai lang ngọt và mềm." },
    { id: "32", name: "Hành tây", price: 25000, image: "hanhtay.jpg", description: "Hành tây tươi." }
];

// Hàm mở modal với chi tiết sản phẩm
function openModal(productId) {
    const product = products.find(item => item.id === productId);
    if (product) {
        document.getElementById("modal-product-image").src = `img/${product.image}`;

        document.getElementById("modal-product-name").textContent = product.name;
        document.getElementById("modal-product-price").textContent = `Giá: ${product.price.toLocaleString()} VND`;
        document.getElementById("modal-product-description").textContent = product.description;
        document.getElementById("product-modal").style.display = "flex";
        currentProductId = productId; // Lưu ID sản phẩm hiện tại
    }
}

// Hàm đóng modal
function closeModal() {
    document.getElementById("product-modal").style.display = "none";
}

function addToCart(productId = currentProductId) {
    // Kiểm tra xem người dùng đã đăng nhập chưa
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

    if (!loggedInUser) {
        alert('Bạn cần đăng nhập để thêm sản phẩm vào giỏ hàng!');
        window.location.href = 'nhanh/login.html'; // Chuyển hướng đến trang đăng nhập
        return; // Dừng lại nếu chưa đăng nhập
    }

    const product = products.find(item => item.id === productId);
    const quantity = parseInt(document.getElementById("modal-quantity").value);

    if (product && quantity > 0) {
        const cartItem = {
            id: product.id,
            name: product.name,
            price: product.price,
            image: `../img/${product.image}`, // Đường dẫn đến hình ảnh
            quantity: quantity
        };

        let cart = JSON.parse(localStorage.getItem("cart")) || [];
        const existingProductIndex = cart.findIndex(item => item.id === productId);

        if (existingProductIndex > -1) {
            cart[existingProductIndex].quantity += quantity;
        } else {
            cart.push(cartItem);
        }

        localStorage.setItem("cart", JSON.stringify(cart)); // Lưu vào localStorage
        alert(`Đã thêm ${product.name} (Số lượng: ${quantity}) vào giỏ hàng!`);
    }

    closeModal();
}
