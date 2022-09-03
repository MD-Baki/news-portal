const loadCategories = () => {
    fetch(`https://openapi.programming-hero.com/api/news/categories`)
        .then(res => res.json())
        .then(data => showCategories(data.data.news_category));
}

const showCategories = cat => {
    console.log(cat);

    const categoriesContainer = document.getElementById('categories-container');

    cat.forEach(category => {
        console.log(category);

        const categoryDiv = document.createElement('li');
        categoryDiv.classList.add('mb-3');
        categoryDiv.innerHTML = `
                <a href="#" class="pe-4 px-lg-0">${category.category_name}</a>
        `;
        categoriesContainer.appendChild(categoryDiv);
    });
}

loadCategories()
