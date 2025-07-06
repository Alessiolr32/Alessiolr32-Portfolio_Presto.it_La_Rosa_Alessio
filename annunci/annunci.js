function generateAnnouncementsColumn(announcement) {
    const col = document.createElement('div');
    col.classList.add("col-12", "col-md-6", "col-xl-4");

    const card = document.createElement('article');
    card.classList.add("card", "shadow", "border-0", "h-100");
    col.appendChild(card);

    const cardArticleAnnouncement = document.createElement('div');
    cardArticleAnnouncement.classList.add("position-relative");
    card.appendChild(cardArticleAnnouncement);

    const cardImgAnnouncement = document.createElement('img');
    cardImgAnnouncement.classList.add("card-img-top");
    const randomSeed = Math.floor(Math.random() * 1000000);
    cardImgAnnouncement.src = `https://picsum.photos/seed/${randomSeed}/640/480`;
    cardArticleAnnouncement.appendChild(cardImgAnnouncement);

    const cardBadgeAnnouncement = document.createElement('span');
    cardBadgeAnnouncement.classList.add("badge", "position-absolute", "top-0", "end-0", "py-2", "px-3", "text-uppercase");

    cardBadgeAnnouncement.classList.add(announcement.type === 'sell' ? 'bg-danger' : 'bg-primary', 'text-uppercase');

    cardBadgeAnnouncement.textContent = `${announcement.type}`;
    cardArticleAnnouncement.appendChild(cardBadgeAnnouncement);

    const cardBodyAnnouncement = document.createElement('div');
    cardBodyAnnouncement.classList.add("card-body", "p-4");
    card.appendChild(cardBodyAnnouncement);

    const cardh3Announcement = document.createElement('h3');
    cardh3Announcement.classList.add("card-subtitle", "mb-2", "h5", "fw-bold", "text-primary");
    cardh3Announcement.textContent = `€${announcement.price}`;
    cardBodyAnnouncement.appendChild(cardh3Announcement);

    const cardh2Announcement = document.createElement('h2');
    cardh2Announcement.classList.add("card-title", "mb-2", "display-5");
    cardh2Announcement.textContent = `${announcement.name}`;
    cardBodyAnnouncement.appendChild(cardh2Announcement);

    const cardParagraphAnnouncement = document.createElement('p');
    cardParagraphAnnouncement.classList.add("card-text");
    cardParagraphAnnouncement.textContent = "Lorem, ipsum dolor sit amet consectetur adipisicing elit, culpa voluptates inventore facilis eaque."
    cardBodyAnnouncement.appendChild(cardParagraphAnnouncement);

    const cardFooterAnnouncement = document.createElement('div');
    cardFooterAnnouncement.classList.add("card-footer", "d-flex", "justify-content-around", "p-4", "bg-white", "text-primary");
    card.appendChild(cardFooterAnnouncement);

    const cardLikeAnnouncement = document.createElement('p');
    cardLikeAnnouncement.classList.add("mb-0");
    cardFooterAnnouncement.appendChild(cardLikeAnnouncement);

    const cardIconLikeAnnouncement = document.createElement('i');
    cardIconLikeAnnouncement.classList.add("bi", "bi-heart-fill", "me-2");
    cardLikeAnnouncement.appendChild(cardIconLikeAnnouncement);

    const cardLikeParagraphAnnouncement = document.createElement('span');
    cardLikeParagraphAnnouncement.textContent = "Like"
    cardLikeAnnouncement.appendChild(cardLikeParagraphAnnouncement);

    const cardTagAnnouncement = document.createElement('p');
    cardTagAnnouncement.classList.add("mb-0");
    cardFooterAnnouncement.appendChild(cardTagAnnouncement);

    const cardIconTagAnnouncement = document.createElement('i');
    cardIconTagAnnouncement.classList.add("bi", "bi-tag-fill", "me-2");
    cardTagAnnouncement.appendChild(cardIconTagAnnouncement);

    const cardTagParagraphAnnouncement = document.createElement('span');
    cardTagParagraphAnnouncement.textContent = `${announcement.category}`;
    cardTagAnnouncement.appendChild(cardTagParagraphAnnouncement);

    const cardDateAnnouncement = document.createElement('p');
    cardDateAnnouncement.classList.add("mb-0");
    cardFooterAnnouncement.appendChild(cardDateAnnouncement);

    const cardIconDateAnnouncement = document.createElement('i');
    cardIconDateAnnouncement.classList.add("bi", "bi-calendar-fill", "me-2");
    cardDateAnnouncement.appendChild(cardIconDateAnnouncement);

    const cardDateParagraphAnnouncement = document.createElement('span');
    const date = new Date(1647845069000);
    const formattedDate = date.toLocaleDateString();
    cardDateParagraphAnnouncement.textContent = `${formattedDate}`;
    cardDateAnnouncement.appendChild(cardDateParagraphAnnouncement);

    return col;
}

function showAnnouncements(announcements, parentElement) {
    while (parentElement.hasChildNodes()) {
        parentElement.removeChild(parentElement.firstChild);
    }

    if (announcements.length === 0) {
        const noResult = document.createElement('p');
        noResult.classList.add('text-center', 'text-black', 'fs-5', 'my-5');
        noResult.textContent = "Nessun articolo corrispondente trovato.";
        parentElement.appendChild(noResult);
        return;
    }

    announcements.forEach((announcement) => {
        const col = generateAnnouncementsColumn(announcement);
        parentElement.appendChild(col);
    });
}


function filteringAndSorting(announcements, options) {

    let filteredAnnouncements = announcements.filter((announcement) => {
        let isAnnouncementGood = true;

        if (options.search) {
            isAnnouncementGood = announcement.name.toLowerCase().includes(options.search.toLowerCase());
        }
        if (isAnnouncementGood && options.category) {
            isAnnouncementGood = announcement.category == options.category;
        }
        if (isAnnouncementGood && options.minPrice) {
            isAnnouncementGood = Number(announcement.price) >= Number(options.minPrice);
        }
        if (isAnnouncementGood && options.maxPrice) {
            isAnnouncementGood = Number(announcement.price) <= Number(options.maxPrice);
        }

        return isAnnouncementGood;
    });

    switch (options.orderBy) {
        case 'ascByPrice':
            filteredAnnouncements.sort((left, right) => {
                return Number(left.price) - Number(right.price);
            });
            break;
        case 'descByPrice':
            filteredAnnouncements.sort((left, right) => {
                return Number(right.price) - Number(left.price);
            });
            break;
        case 'ascByAlpha':
            filteredAnnouncements.sort((left, right) => {
                return left.name.toLowerCase().localeCompare(right.name.toLowerCase());
            });
            break;
        case 'descByAlpha':
            filteredAnnouncements.sort((left, right) => {
                return right.name.toLowerCase().localeCompare(left.name.toLowerCase());
            });
            break;
    }

    return filteredAnnouncements;
}

function showCategoriesOptions(announcements, parentElement) {
    const categories = new Set();

    announcements.forEach((announcement) => {
        categories.add(announcement.category);
    });

    categories.forEach((category) => {
        const option = document.createElement('option');
        option.setAttribute('value', category);
        option.textContent = category;
        parentElement.appendChild(option);
    });
}

async function loadAnnoucements() {
    const response = await fetch('annunci.json');
    return await response.json();
}

document.addEventListener('DOMContentLoaded', async () => {

    const searchInput = document.getElementById('searchInput');
    const categorySelect = document.getElementById('categorySelect');
    const minPriceInput = document.getElementById('minPriceInput');
    const maxPriceInput = document.getElementById('maxPriceInput');
    const sortSelect = document.getElementById('sortSelect');

    const announcementsRow = document.getElementById('announcementsRow');

    try {
        const announcements = await loadAnnoucements();
        showCategoriesOptions(announcements, categorySelect);
        showAnnouncements(announcements, announcementsRow);

        const filterAndSortForm = document.getElementById('filterAndSortForm');
        filterAndSortForm.addEventListener('submit', (event) => {
            event.preventDefault();

            const options = {
                search: searchInput.value,
                category: categorySelect.value,
                minPrice: minPriceInput.value,
                maxPrice: maxPriceInput.value,
                orderBy: sortSelect.value
            };

            const filteredAnnouncements = filteringAndSorting(announcements, options);
            showAnnouncements(filteredAnnouncements, announcementsRow);
        });
        
    } catch (error) {
        console.error(error);
    }
});


