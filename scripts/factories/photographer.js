function photographerFactory(data) {
    const { name, portrait, city, country, tagline, price } = data;

    const picture = `assets/photographers/${portrait}`;

    function getUserCardDOM() {
        const article = document.createElement('article');
        const img = document.createElement('img');
        img.setAttribute("src", picture)
        const h2 = document.createElement('h2');
        h2.textContent = name;
        const city_country = document.createElement('div')
        city_country.textContent = city + ', ' + country;
        const tagLine = document.createElement('div');
        tagLine.textContent = tagline;
        const textPrice = document.createElement('div');
        textPrice.textContent = price + ' €'


        article.appendChild(img);
        article.appendChild(h2);
        article.appendChild(city_country);
        article.appendChild(tagLine);
        article.appendChild(textPrice);
        return (article);
    }
    return { name, picture, getUserCardDOM }
}