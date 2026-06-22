document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.querySelector('#searchInput');
    const cards = document.querySelectorAll('.product-card');

    if (!searchInput) {
        return;
    }

    searchInput.addEventListener('input', () => {
        const searchValue = searchInput.value.toLowerCase().trim();

        cards.forEach((card) => {
            const title = card.querySelector('h3').textContent.toLowerCase();

            if (title.includes(searchValue)) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });
});