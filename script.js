const products = [
    { name: "Tropicália: Panis et Circenses", artist: "Varios", price: 75.00, image: "images/disco1.jpg" },
    { name: "Simon and Garfunkel's Greatest Hits", artist: "Simon and Garfunkel", price: 40.00, image: "images/disco2.jpg" },
    { name: "No Sub Reino dos Metazoários", artist: "Marconi Notaro", price: 60.00, image: "images/disco3.jpg" },
    { name: "Loaded", artist: "The Velvet Underground", price: 45.00, image: "images/disco4.jpg" },
    { name: "Nashville Skyline", artist: "Bob Dylan", price: 55.00, image: "images/disco5.jpg" },
    { name: "Let There Be Rock", artist: "AC/DC", price: 70.00, image: "images/disco6.jpg" },
    { name: "Caymmi e Seu Violão", artist: "Dorival Caymmi", price: 35.00, image: "images/disco7.jpg" },
    { name: "Zoot Allures", artist: "Frank Zappa", price: 80.00, image: "images/disco8.jpg" },
    { name: "Born Under a Bad Sign", artist: "Albert King", price: 65.00, image: "images/disco9.jpg" },
    { name: "Eric Clapton", artist: "Eric Clapton", price: 90.00, image: "images/disco10.jpg" },
    { name: "Toys in the Attic", artist: "Aerosmith", price: 55.00, image: "images/disco11.jpg" },
    { name: "Waka/Jawaka", artist: "Frank Zappa", price: 75.00, image: "images/disco12.jpg" },
];

let cart = [];
let currentPage = 0;
const itemsPerPage = 4;

function displayProducts() {
    const productList = document.getElementById('product-list');
    productList.innerHTML = '';

    const startIndex = currentPage * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const productsToDisplay = products.slice(startIndex, endIndex);

    productsToDisplay.forEach(product => {
        const productItem = document.createElement('div');
        productItem.className = 'product-item';
        productItem.innerHTML = `
            <img src="${product.image}" alt="${product.name}" class="product-image">
            <h3>${product.name}</h3>
            <p>Artista: ${product.artist}</p>
            <p>Preço: R$ ${product.price.toFixed(2)}</p>
            <button onclick="addToCart('${product.name}')">Adicionar ao Carrinho</button>
        `;
        productList.appendChild(productItem);
    });

    document.getElementById('prev-button').disabled = currentPage === 0;
    document.getElementById('next-button').disabled = endIndex >= products.length;
}

function changePage(direction) {
    currentPage += direction;
    displayProducts();
}

function addToCart(productName) {
    const product = products.find(p => p.name === productName);
    if (product) {
        // Verifica se o item já está no carrinho
        const cartItem = cart.find(item => item.name === product.name);
        if (cartItem) {
            // Incrementa a quantidade se o item já estiver no carrinho
            cartItem.quantity += 1;
        } else {
            // Adiciona o novo item ao carrinho com quantidade 1
            cart.push({ ...product, quantity: 1 });
        }
        updateCart();
    }
}

function updateCart() {
    const cartItems = document.getElementById('cart-items');
    cartItems.innerHTML = '';

    let total = 0;

    cart.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <p>${item.name} - R$ ${item.price.toFixed(2)} (Quantidade: ${item.quantity})</p>
        `;
        cartItems.appendChild(cartItem);
        total += item.price * item.quantity; // Calcula o total com base na quantidade
    });

    document.getElementById('total-price').innerText = `Total: R$ ${total.toFixed(2)}`;
}

const modal = document.getElementById("signup-modal");

document.getElementById("checkout-button").onclick = function() {
    modal.style.display = "block";
};

function closeModal() {
    modal.style.display = "none";
}

document.querySelector(".close-button").onclick = closeModal;

document.getElementById("signup-form").onsubmit = function(event) {
    event.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;
    const address = document.getElementById("address").value;
    const bank = document.getElementById("bank").value;

    alert(`Compra Finalizada!\n\nNome: ${name}\nE-mail: ${email}\nTelefone: ${phone}\nEndereço: ${address}\nDados Bancários: ${bank}`);
    
    cart = [];
    updateCart();
    closeModal();
};

document.addEventListener('DOMContentLoaded', displayProducts);
