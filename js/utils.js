export const getData = (url, selector) => {
        const proxyUrl = 'https://cors-anywhere.herokuapp.com/';

        const searchParams = new URLSearchParams();
        for (const pair of new FormData(document.forms['recipe-fetch-form'])) {
            searchParams.append(pair[0], pair[1]);
        }

        fetch(`${proxyUrl}${url}${searchParams && `?${searchParams}`}`)
        .then(response => response.json())
        .then(data => {
            const outerContainer = document.querySelector(selector);
            const section = document.createElement('section');
            outerContainer.appendChild(section);
            section.classList.add('container');

            const h1 = document.createElement('h1');
            h1.classList.add('w-100', 'text-center');
            h1.textContent = `${data.title} Results`;
            section.insertAdjacentElement('beforebegin', h1);

            const sortedRecipes = sortRecipeByTitle(data.results);

            console.log(data);

            sortedRecipes.forEach(recipe => {
                const { title, ingredients, href, thumbnail } = recipe;

                const card = document.createElement('div');
                card.classList.add('card');

                const h2 = document.createElement('h2');
                h2.textContent = title;

                const p = document.createElement('p');
                const ingredientsArray = ingredients.trim().split(',');

                if (thumbnail) {
                    fetch(proxyUrl + thumbnail, {'Retry-After': 3600})
                        .then(response => {
                            if (response.ok) {
                                p.insertAdjacentHTML('afterbegin', `<img src="${thumbnail}" class="d-block mb-3 mx-auto" alt="${title}"/>`);
                            } else {
                                p.insertAdjacentHTML('afterbegin', `<img src="/images/utensils-icon.png" class="d-block mb-3 mx-auto" alt="${title}"/>`);
                            }
                        })
                        .catch(err => console.debug(`Failed to fetch ${thumbnail} due to ${err}`));
                } else {
                    p.insertAdjacentHTML('afterbegin', `<img src="/images/utensils-icon.png" class="d-block mb-3 mx-auto" alt="${title}"/>`);
                }

                ingredientsArray.map((ingredient, index) => {
                    const a = document.createElement('a');
                    a.href = '#';

                    ingredient = ingredient.trim();
                    a.setAttribute('data-ingredient', ingredient);
                    a.textContent = ingredient;
                    p.appendChild(a);

                    const lastIngredient = ingredientsArray.length === index + 1;
                    if (!lastIngredient) {
                        a.insertAdjacentHTML('afterend', ', ');
                    }

                    a.addEventListener('click', event => {
                        event.preventDefault();
                        const form = document.forms['recipe-fetch-form'];
                        const input = document.createElement('input');
                        input.setAttribute('type', 'hidden');
                        input.setAttribute('name', 'i');
                        input.setAttribute('value', ingredient);
                        form.appendChild(input);

                        //getData('http://www.recipepuppy.com/api/', '#recipe-fetch-list');
                    });
                });

                section.appendChild(card);
                card.appendChild(h2);
                card.appendChild(p);

                fetch(proxyUrl + href, { 'Retry-After': 3600 })
                    .then(response => {
                        if (response.ok) {
                            const a = document.createElement('a');
                            a.href = href;
                            a.target = '_blank';
                            a.classList.add('recipe-link', 'm-0', 'mt-3', 'd-block', 'text-center', 'btn', 'btn-default');
                            a.textContent = 'View Recipe';
                            p.appendChild(a);
                        }
                    })
                    .catch(err => console.debug(`Failed to fetch ${href} due to ${err}`));
            });
        })
        .catch(error => console.log(error));
};

const sortRecipeByTitle = arr => arr
    .filter(item => item.title)
    .sort((item1, item2) => {
        if (item1.title < item2.title) {
            return -1;
        } else if (item1.title > item2.title) {
            return 1;
        }

        return 0;
    });
