// cart.js

// Mảng lưu trữ giỏ hàng
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Hàm để tải giỏ hàng khi trang tải
function cartLoadPage() {
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
    <span>${product.price.toLocaleString()} VND</span>
    <input type="number" value="${product.quantity}" min="1" class="form-control"
           onchange="updateQuantity(${index}, this.value)">
    <span>${(product.price * product.quantity).toLocaleString()} VND</span>
    <button class="btn btn-danger" onclick="removeFromCart(${index})">Xóa</button>
`;

        cartItemsContainer.appendChild(productElement);
        totalPrice += product.price * product.quantity;
    });

    totalPriceElement.innerText = totalPrice.toLocaleString() + ' VND';
}

// Hàm cập nhật số lượng sản phẩm
function updateQuantity(index, quantity) {
    cart[index].quantity = parseInt(quantity);
    localStorage.setItem('cart', JSON.stringify(cart));
    cartLoadPage(); // Cập nhật lại giỏ hàng
}

// Hàm xóa sản phẩm khỏi giỏ hàng
function removeFromCart(index) {
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    cartLoadPage(); // Cập nhật lại giỏ hàng
}

// Hàm thêm sản phẩm vào giỏ hàng
function addToCart(name, price, image) {
    const existingProduct = cart.find(item => item.name === name);
    
    if (existingProduct) {
        existingProduct.quantity += 1;
    } else {
        cart.push({ name, price, image, quantity: 1 });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    alert(`${name} đã được thêm vào giỏ hàng!`);
}


// của product
const products = [
  {
    name: "Bơ Booth",
    price: 50000,
    image: "bobooth.jpg"
  },
  {
    name: "Bắp cải xanh",
    price: 25000,
    image: "bapcaixanh.jpg"
  },
  {
    name: "Cà Chua",
    price: 20000,
    image: "cachua.jpg"
  },
  {
    name: "Cà Rốt",
    price: 30000,
    image: "carot.jpg"
  },
  {
    name: "Cua Hoàng Đế",
    price: 800000,
    image: "cuahoangde.jpg"
  },
  {
    name: "Đùi gà thả vườn",
    price: 120000,
    image: "duigathavuon.jpg"
  },
  {
    name: "Khoai Tây",
    price: 25000,
    image: "khoaitay.jpg"
  },
  {
    name: "Nho mẫu đơn",
    price: 180000,
    image: "nhomaudon.jpg"
  },
  {
    name: "Táo Mỹ",
    price: 150000,
    image: "taomy.jpg"
  },
  {
    name: "Thịt cá ngừ đại dương",
    price: 200000,
    image: "thitcangudaiduong.jpg"
  },
  {
    name: "Trứng gà thả vườn",
    price: 40000,
    image: "trunggathavuon.jpg"
  },
  {
    name: "Bắp Mỹ",
    price: 15000,
    image: "bapmy.jpg"
  },
  {
    name: "Bông cải trắng",
    price: 35000,
    image: "bongcaitrang.jpg"
  },
  {
    name: "Cá hồi miền",
    price: 200000,
    image: "cahoimien.jpg"
  },
  {
    name: "Cà tím loại 1",
    price: 20000,
    image: "catimloai1.jpg"
  },
  {
    name: "Dâu Tây Đà Lạt",
    price: 100000,
    image: "dautaydalat.jpg"
  },
  {
    name: "Hành lá",
    price: 15000,
    image: "hanhla.jpg"
  },
  {
    name: "Lê Trung Quốc",
    price: 50000,
    image: "letrungquoc.jpg"
  },
  {
    name: "Ớt đỏ",
    price: 30000,
    image: "otdo.jpg"
  },
  {
    name: "Táo xanh",
    price: 80000,
    image: "taoxanh.jpg"
  },
  {
    name: "Tỏi khô",
    price: 50000,
    image: "toikho.jpg"
  },
  {
    name: "Việt quất",
    price: 180000,
    image: "vietquat.jpg"
  },
  {
    name: "Bí ngòi xanh",
    price: 25000,
    image: "bingoixanh.jpg"
  },
  {
    name: "Bông cải xanh",
    price: 40000,
    image: "bongcaixanh.jpg"
  },
  {
    name: "Cải 7 màu",
    price: 45000,
    image: "cai7mau.jpg"
  },
  {
    name: "Chanh vàng không hạt",
    price: 60000,
    image: "chanhvangkhonghat.jpg"
  },
  {
    name: "Dưa chuột",
    price: 18000,
    image: "duachuot.jpg"
  },
  {
    name: "Hành tím",
    price: 45000,
    image: "hanhtim.jpg"
  },
  {
    name: "Nho đen Nam Mỹ",
    price: 190000,
    image: "nhodennammy.jpg"
  },
  {
    name: "Rong nho",
    price: 50000,
    image: "rongnho.jpg"
  },
  {
    name: "Thịt bò thượng hạng",
    price: 350000,
    image: "thitbothuonghang.jpg"
  },
  {
    name: "Tôm",
    price: 250000,
    image: "tom.jpg"
  }
];
