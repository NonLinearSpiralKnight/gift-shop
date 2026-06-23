const productContainer = document.querySelector('#productDetails');

function getProductIdFromUrl() {
  const params = new URLSearchParams(window.location.search);
  return Number(params.get('id'));
}

function renderProduct(product) {
  if (!productContainer) {
    return;
  }

  productContainer.innerHTML = `
    <div class="product-details">
      <div class="product-details__image">🎁</div>

      <div class="product-details__content">
        <h1>${product.name}</h1>
        <p>${product.description}</p>
        <strong>${product.price} ₽</strong>

        <button class="button" onclick="addToCart(${product.id})">
          Добавить в корзину
        </button>
      </div>
    </div>
  `;
}

async function initProductPage() {
  const productId = getProductIdFromUrl();

  if (!productId) {
    productContainer.innerHTML = '<p>Товар не найден.</p>';
    return;
  }

  const product = await api.getProductById(productId);

  if (!product || !product.id) {
    productContainer.innerHTML = '<p>Товар не найден.</p>';
    return;
  }

  renderProduct(product);
}

document.addEventListener('DOMContentLoaded', initProductPage);
