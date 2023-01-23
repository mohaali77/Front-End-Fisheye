function photographerFactory(data) {
    const { name, portrait, city, country, tagline, price, id } = data;

    const picture = `./assets/photographers/${portrait}`;

    function getUserCardDOM() {

        const article = document.createElement('article');
        const a = document.createElement('a')
        a.setAttribute("href", "./photographer.html?id=" + id)
        const img = document.createElement('img');
        img.setAttribute("src", picture)
        img.setAttribute("alt", "Photo de profil de " + name)
        const h2 = document.createElement('h2');
        h2.textContent = name;

        //ajout de l'élement affichant la ville et le pays
        const city_country = document.createElement('div')
        city_country.classList.add('city_country');
        city_country.textContent = city + ', ' + country;

        //ajout de l'élement affichant la phrase d'accroche
        const tagLine = document.createElement('div');
        tagLine.classList.add('tagline');
        tagLine.textContent = tagline;

        //ajout de l'élement affichant le prix
        const textPrice = document.createElement('div');
        textPrice.classList.add('price');
        textPrice.textContent = price + '€/jour'


        a.appendChild(img);
        article.appendChild(a);
        article.appendChild(h2);
        article.appendChild(city_country);
        article.appendChild(tagLine);
        article.appendChild(textPrice);
        return (article);
    }
    return { name, picture, getUserCardDOM }
}