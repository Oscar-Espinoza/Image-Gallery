const itemsGrid = {
    categories: ['Recipes', 'Places to visit', 'Objectives', 'Projects'],
    items: [
                {
                    category: 'recipes',
                    name: 'feta pasta',
                    labels: 'recipes food healthy',
                    imgSrc: 'img/recipes/feta_pasta.jpg',
                    link: 'https://www.delish.com/cooking/recipe-ideas/a35421563/baked-feta-pasta-tiktok/'
                },
                {
                    category: 'recipes',
                    name: 'Honey garlic glazed salmon',
                    labels: 'recipes food healthy',
                    imgSrc: 'img/recipes/honey_garlic_glazed_salmon.jpg',
                    link: 'https://www.delish.com/cooking/recipe-ideas/recipes/a55762/honey-garlic-glazed-salmon-recipe/'
                },
                {
                    category: 'places',
                    name: 'Alberobello',
                    labels: "places italy village",
                    imgSrc: 'img/Places/Alberobello.jpg',
                    link: 'https://theculturetrip.com/europe/italy/articles/12-secret-towns-in-italy-you-need-to-visit-before-theyre-overrun-by-tourists/'
                },
                {
                    category: 'recipes',
                    name: 'Chicken Stew',
                    labels: 'recipes food healthy chicken stew',
                    imgSrc: 'img/recipes/chicken_stew.jpg',
                    link: 'https://www.delish.com/cooking/recipe-ideas/recipes/a55316/easy-chicken-stew-recipe/'
                },
                {
                    category: 'places',
                    name: 'Shirakawa-go, Japan',
                    labels: 'places japan villa view',
                    imgSrc: 'img/places/shirakawa-go_Japan.jpeg',
                    link: 'https://www.thrillist.com.au/travel/nation/best-small-towns-in-the-world-to-visit/'
                },
                {
                    category: 'places',
                    name: 'Český Krumlov, Czech Republic',
                    labels: 'places cesky krumlov czech republic',
                    imgSrc: 'img/Places/cesky_krumlov_Czech_Republic.jpeg',
                    link: 'https://www.thrillist.com.au/travel/nation/best-small-towns-in-the-world-to-visit/'
                },
                // {
                //     category: '',
                //     name: '',
                //     labels: [],
                //     imgSrc: '',
                //     link: ''
                // },
    ]
}

buildGrid = (items) => {
    funcGrid = document.getElementById('grid')

    items.forEach(item => {
        let htmlItem = `<div class='item' data-category=${item.category} data-labels=${encodeURIComponent(item.labels)}>
                        <img src=${item.imgSrc} id=${encodeURIComponent(item.name)} onClick='displayOverlay(this.id)'>
                    </div>`
        funcGrid.innerHTML += htmlItem
    })
}

buildGrid(itemsGrid.items)

const grid = new Muuri('.grid', {
    layout: {
        rounding: false
    }
});

window.addEventListener('load', () => {
    grid.refreshItems().layout
    document.getElementById('grid').classList.add('loaded-images')

//Category filter
    const categories = document.querySelectorAll('#categories a')
    categories.forEach((category) => {
        category.addEventListener('click', (e) => {
            e.preventDefault()
            if (e.target.className != 'active') {
                for (let i = 0; i < categories.length; i++) {
                    categories[i].classList.remove('active');
                }
                e.target.classList.add('active')                    
            }
            const category = e.target.innerHTML.toLowerCase();
            category === 'all' ? grid.filter('[data-category]') : grid.filter(`[data-category=${category}]`)
        })
    });

//search bar filter
    document.querySelector('#search-bar').addEventListener('input', (e) =>{
        const search = e.target.value.toLowerCase()
        grid.filter((item) => item.getElement().dataset.labels.includes(search));
    })

// display overlay on click
    displayOverlay = (imgId) => {
        imgId = decodeURIComponent(imgId)
        let item = itemsGrid.items.find(item => item.name == imgId)
        let overlay = document.getElementById('overlay')
        overlay.innerHTML = `<div class='container-img'>
        <button id='btn-close-popup'><i class="far fa-window-close" onClick='closeOverlay()'></i></button>
        <img src=${item.imgSrc} alt=''>
    </div>
    <a class='description' href=${item.link} target='_blank'>${item.name}</a>`
    overlay.classList.add('active')
    }

// Close overlay when click X button
    closeOverlay = () => {
        document.getElementById('overlay').classList.remove('active')
    }
});
