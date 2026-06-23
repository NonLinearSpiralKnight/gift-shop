const CART_KEY = 'giftshop_cart';

function getCart() {
  const cart = localStorage.getItem(CART_KEY);

  if (!cart) {
    return [];
  }

  return JSON.parse(cart);
}

function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

function addToCart(productId) {
  const cart = getCart();

  const item = cart.find((product) => product.id === productId);

  if (item) {
    item.quantity += 1;
  } else {
    cart.push({
      id: productId,
      quantity: 1,
    });
  }

  saveCart(cart);
  alert('Товар добавлен в корзину');
}

function removeFromCart(productId) {
  const cart = getCart().filter((product) => product.id !== productId);
  saveCart(cart);
  renderCart();
}

function clearCart() {
  localStorage.removeItem(CART_KEY);
  renderCart();
}

async function renderCart() {
  const cartContainer = document.querySelector('#cartItems');
  const cartTotal = document.querySelector('#cartTotal');

  if (!cartContainer) {
    return;
  }

  const cart = getCart();
  const products = await api.getProducts();

  if (!cart.length) {
    cartContainer.innerHTML = '<p>Корзина пуста.</p>';

    if (cartTotal) {
      cartTotal.textContent = '0 ₽';
    }

    return;
  }

  const cartProducts = cart.map((cartItem) => {
    const product = products.find((item) => item.id === cartItem.id);

    return {
      ...product,
      quantity: cartItem.quantity,
    };
  });

  cartContainer.innerHTML = cartProducts
    .map(
      (product) => `
        <div class="cart-item">
          <div>
            <h3>${product.name}</h3>
            <p>${product.price} ₽ × ${product.quantity}</p>
          </div>

          <button onclick="removeFromCart(${product.id})">
            Удалить
          </button>
        </div>
      `
    )
    .join('');

  const total = cartProducts.reduce(
    (sum, product) => sum + product.price * product.quantity,
    0
  );

  if (cartTotal) {
    cartTotal.textContent = `${total} ₽`;
  }
}

document.addEventListener('DOMContentLoaded', renderCart);
