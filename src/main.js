import products from './data/products.json';

const productGrid = document.querySelector('#product-grid');

if (productGrid) {
  const previousButton = document.querySelector('#previous-button');
  const nextButton = document.querySelector('#next-button');
  const pageIndicator = document.querySelector('#page-indicator');
  const productCount = document.querySelector('#product-count');

  const productsPerPage = 5;
  const totalPages = Math.ceil(products.length / productsPerPage);
  let currentPage = 1;

  const currencyFormatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });

  function createProductCard(product) {
    const card = document.createElement('article');
    card.className = 'product-card';

    const image = document.createElement('img');
    image.src = product.imageUrl;
    image.alt = product.name;
    image.loading = 'lazy';
    image.width = 400;
    image.height = 300;

    const details = document.createElement('div');
    details.className = 'product-details';

    const category = document.createElement('span');
    category.className = 'category-badge';
    category.textContent = product.category;

    const title = document.createElement('h3');
    title.textContent = product.name;

    const price = document.createElement('p');
    price.className = 'product-price';
    price.textContent = currencyFormatter.format(product.price);

    const description = document.createElement('p');
    description.className = 'product-description';
    description.textContent = product.description;

    details.append(category, title, price, description);
    card.append(image, details);

    return card;
  }

  function renderProducts() {
    const startIndex = (currentPage - 1) * productsPerPage;
    const pageProducts = products.slice(
      startIndex,
      startIndex + productsPerPage,
    );

    const cards = pageProducts.map(createProductCard);
    productGrid.replaceChildren(...cards);

    pageIndicator.textContent = `Page ${currentPage} of ${totalPages}`;

    productCount.textContent =
      `Showing ${startIndex + 1}–${startIndex + pageProducts.length} ` +
      `of ${products.length} products`;

    previousButton.disabled = currentPage === 1;
    nextButton.disabled = currentPage === totalPages;
  }

  previousButton.addEventListener('click', () => {
    if (currentPage > 1) {
      currentPage -= 1;
      renderProducts();
    }
  });

  nextButton.addEventListener('click', () => {
    if (currentPage < totalPages) {
      currentPage += 1;
      renderProducts();
    }
  });

  renderProducts();
}
