function photographerFactory(data) {
    const { name, portrait, city, country, tagline, price, id } = data;

    const picture = `./assets/photographers/Photographers-ID-Photos/${portrait}`;

    function getUserCardDOM() {


        const article = document.createElement('article');
        const a = document.createElement('a');
        a.setAttribute("href", "./photographer.html?id=" + id);
        const img = document.createElement('img');
        img.setAttribute("src", picture);
        img.setAttribute("alt", "Photo de profil de " + name);
        const h2 = document.createElement('h2');
        h2.textContent = name;

        //ajout de l'élement affichant la ville et le pays
        const city_country = document.createElement('div');
        city_country.classList.add('city_country');
        city_country.textContent = city + ', ' + country;

        //ajout de l'élement affichant la phrase d'accroche
        const tagLine = document.createElement('div');
        tagLine.classList.add('tagline');
        tagLine.textContent = tagline;

        //ajout de l'élement affichant le prix
        const textPrice = document.createElement('div');
        textPrice.classList.add('price');
        textPrice.textContent = price + '€/jour';


        a.appendChild(img);
        article.appendChild(a);
        article.appendChild(h2);
        article.appendChild(city_country);
        article.appendChild(tagLine);
        article.appendChild(textPrice);
        return (article);
    }

    function getProfilUserDOM() {

        const h1 = document.querySelector('h1');
        h1.textContent = name;

        const divCity = document.querySelector('.city');
        divCity.textContent = city + ', ' + country;

        const divTagline = document.querySelector('.tagline');
        divTagline.textContent = tagline;

        const imgSolo = document.createElement('img');
        imgSolo.setAttribute("src", picture);
        imgSolo.setAttribute("alt", "Photo de profil de " + name);

        const headerSection = document.querySelector(".photograph-header");
        headerSection.appendChild(imgSolo);


        return

    }
    return { getUserCardDOM, getProfilUserDOM }
}

function mediasFactory(data) {
    const { title, image, date, likes, photographerId, price, id } = data;

    const picture = `./assets/photographers/medias/${image}`;

    function getMediaCardDOM() {

        const post = document.createElement('div');
        post.classList.add('post');

        const a = document.createElement('a');
        a.setAttribute("href", "./photographer.html?id=" + id);
        console.log(id);

        const imgMedia = document.createElement('img');
        imgMedia.setAttribute("src", picture);
        imgMedia.setAttribute("alt", title);

        const title_like = document.createElement('div');
        title_like.classList.add('title_like');

        const divTitle = document.createElement('div');
        divTitle.classList.add('title');
        divTitle.textContent = title;

        const divLike = document.createElement('div');
        divLike.classList.add('like');
        divLike.textContent = likes + ' ';

        const heartLike = document.createElement('i');
        heartLike.classList.add('fa-solid');
        heartLike.classList.add('fa-heart');

        const bandPrice = document.getElementById('band_price')
        bandPrice.innerText = price + '€ / jour'

        divLike.appendChild(heartLike)
        a.appendChild(imgMedia);
        title_like.appendChild(divTitle);
        title_like.appendChild(divLike);

        post.appendChild(title_like);
        post.appendChild(a);

        return (post);

    }
    return { getMediaCardDOM }
}