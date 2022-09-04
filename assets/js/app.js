// Categories API Load
const loadCategories = () => {
    const url = `https://openapi.programming-hero.com/api/news/categories`
    fetch(url)
        .then(res => res.json())
        .then(data => showCategories(data.data.news_category));
}

const showCategories = cat => {
    const categoriesContainer = document.getElementById('categories-container');

    cat.forEach(category => {
        // console.log(category);
        const categoryDiv = document.createElement('li');
        categoryDiv.classList.add('mb-3');
        categoryDiv.innerHTML = `
                <a class="me-4" onClick="callCategory('${category.category_id}')">${category.category_name}</a>
        `;
        categoriesContainer.appendChild(categoryDiv);
    });
}

loadCategories();

// News API Use
const newsCategory = (searchNews) => {
    const url = `https://openapi.programming-hero.com/api/news/category/${searchNews}`
    fetch(url)
        .then(res => res.json())
        .then(data => displayNews(data.data))
        .catch(error => console.log(error))
}

const displayNews = newsCat => {
    const newsContainer = document.getElementById('news-container');
    newsContainer.innerHTML = ``;

    // News Length
    document.getElementById('news-counter').innerText = newsCat.length;

    // Data not Found
    const noNews = document.getElementById('news-not-found');
    if (newsCat.length === 0) {
        noNews.classList.remove('d-none');
    } else {
        noNews.classList.add('d-none');
    }

    newsCat.forEach(news => {
        // console.log(news);
        const newsDiv = document.createElement('div');
        newsDiv.classList.add('card')
        newsDiv.innerHTML = `
            <div class="row align-items-center p-2 rounded">
                <div class="card_image col-lg-4 pe-2">
                    <img src="${news.image_url}" class="img-fluid rounded-start" alt="...">
                </div>
                <div class="card_contante col-lg-8">
                    <div class="card-body">
                        <h5 class="card-title fw-bold">${news.title}</h5>
                        <p class="card-text pt-2 pb-3">${news.details.slice(0, 200)}...</p>
                        <div
                            class="card_footer card-text row align-items-center border-top pt-2">
                            <div class="writer row align-items-center col-6">
                                <img src="${news.author.img ? news.author.img : 'Image Not Found'}" class="img-fluid rounded-circle col-5 col-lg-2" alt="...">
                                <div class="col-7 col-lg-10">
                                    <p class="fw-bold">${news.author.name ? news.author.name : 'Name Not Found'}</p>
                                </div>
                            </div>
                            <a class="fw-bold col-4"><i class="fa-regular fa-eye"></i> ${news.total_view ? news.total_view : 'Not Found'}</a>
                            <a class=" col-2 text-end" data-bs-toggle="modal" data-bs-target="#detailModal" 
                            onClick="modalCategory('${news._id}')"><i class="fa-solid fa-clipboard"></i></a>
                        </div>
                    </div>
                </div>
            </div>
        `
        newsContainer.appendChild(newsDiv);
    })
    // Stop Loader
    spinner(false);
}

const callCategory = (code) => {
    // Start Loader
    spinner(true);
    newsCategory(code);
}
// Spinner Add
const spinner = isLoading => {
    const addLoader = document.getElementById('loader');
    if (isLoading) {
        addLoader.classList.remove('d-none');
    } else {
        addLoader.classList.add('d-none');
    }
}
newsCategory('08');

// Modal add function
const modalCategory = async (findModal) => {
    const url = `https://openapi.programming-hero.com/api/news/${findModal}`
    try {
        const res = await fetch(url)
        const data = await res.json()
        displayModal(data.data)
    }
    catch (error) {
        console.log(error);
    }

}

const displayModal = modal => {
    // console.log(modal)
    const modalContainer = document.getElementById('modal');
    modalContainer.innerHTML = ``;
    const modalDiv = document.createElement('div');
    modal.forEach(modalCategory => {
        console.log(modalCategory)
        modalDiv.innerHTML = `
        <div class="modal-img">
        <img src="${modalCategory.thumbnail_url}" class="w-100 rounded-start" alt="...">
    </div>
    <h5 class="modal-title pt-4 pb-2 mb-2 fw-bold border-bottom">${modalCategory.title}</h5>
    <p class="modal-text pb-2 mb-2 border-bottom">${modalCategory.details.slice(0, 600)}</p>

    <div class=" writer row align-items-center">
        <img src="${modalCategory.author.img}" class="img-fluid rounded-circle col-2" alt="...">
        <div class="col-5">
            <p class="fw-bold">${modalCategory.author.name}</p>
            <p class="fw-bold">${modalCategory.author.published_date}</p>
        </div>
        <div class="col-5 d-flex justify-content-end">
            <p class="fw-bold pe-2">${modalCategory.rating.number}</p>
            <p class="fw-bold">${modalCategory.rating.badge}</p>
        </div>
    </div>
            `
        modalContainer.appendChild(modalDiv);

    });
}