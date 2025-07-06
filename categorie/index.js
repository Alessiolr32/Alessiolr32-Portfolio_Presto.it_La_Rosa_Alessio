document.addEventListener('DOMContentLoaded', () => {
    const categoriesContainer = document.getElementById('categories');
    const select = document.getElementById('categorySelect');

    function getNewCategory(category) {
        const column = document.createElement('div');
        column.classList.add('col-12', 'col-md-6', 'col-lg-4', 'col-xl-3');

        const card = document.createElement('div');
        card.classList.add('card-category', 'p-3');
        column.appendChild(card);

        const cardBody = document.createElement('div');
        cardBody.classList.add('card-body-category', 'p-4');
        card.appendChild(cardBody);

        const iconBox = document.createElement('div');
        iconBox.classList.add('card-icon-category', 'mb-3');
        cardBody.appendChild(iconBox);

        const icon = document.createElement('i');
        const classes = category.icon.split(' ');
        classes.forEach(c => icon.classList.add(c));
        iconBox.appendChild(icon);

        const title = document.createElement('h2');
        title.textContent = category.name;
        cardBody.appendChild(title);

        const paragraph = document.createElement('p');
        paragraph.textContent = `${category.announcementsCount} annunci`;
        paragraph.classList.add('mb-0');
        cardBody.appendChild(paragraph);

        return column;
    }

    async function loadCategories() {
        try {
            const response = await fetch('categorie.json');
            if (!response.ok) throw new Error('Errore caricamento categorie');

            const categories = await response.json();

            categories.forEach(category => {
                const card = getNewCategory(category);
                categoriesContainer.appendChild(card);

                const option = document.createElement('option');
                option.value = category.id;
                option.textContent = category.name;
                select.appendChild(option);
            });
        } catch (error) {
            console.error('Errore:', error);
        }
    }
    loadCategories();
});
  