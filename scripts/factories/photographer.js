function photographerFactory(data) {
    const { name, portrait, city, country, tagline, price, id } = data;

    const picture = `./assets/photographers/Photographers-ID-Photos/${portrait}`;

    function getUserCardDOM() {

        const article = document.createElement('article');
        article.setAttribute("role", "article");
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

        const modalTitle = document.querySelector('h2')
        modalTitle.innerText = 'Contactez-moi ' + name

        const headerSection = document.querySelector(".photograph-header");
        headerSection.appendChild(imgSolo);


        return

    }
    return { getUserCardDOM, getProfilUserDOM }
}

function mediasFactory(medias) {

    function getMediaCardDOM(media) {

        let { title, image, date, likes, price, id, video } = media;

        const picture = `./assets/photographers/medias/${image}`;
        const video_ = `./assets/photographers/medias/${video}`;

        const post = document.createElement('article');
        post.classList.add('post');
        post.setAttribute('data-id', id)
        post.setAttribute('date', date)
        post.setAttribute('role', 'article')

        if (video) {
            const vidMedia = document.createElement('video');
            vidMedia.setAttribute("src", video_);
            const vidSourceMedia = document.createElement('source')
            vidSourceMedia.setAttribute('src', video_)
            vidMedia.appendChild(vidSourceMedia)
            post.appendChild(vidMedia)
        }

        if (image) {
            const imgMedia = document.createElement('img');
            imgMedia.setAttribute("src", picture);
            imgMedia.setAttribute("alt", 'Image miniature représentant la photo ' + title);
            post.appendChild(imgMedia);
        }

        const title_like = document.createElement('div');
        title_like.classList.add('title_like');

        const divTitle = document.createElement('h2');
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

        divLike.appendChild(heartLike);
        title_like.appendChild(divTitle);
        title_like.appendChild(divLike);

        post.appendChild(title_like);

        return (post);

    }

    function getLikes() {
        //lors du clic sur le bouton like, une unité supplémentaire doit pouvoir s'incrémenté uniquement à l'élément du DOM
        //et uniquement au média du tableau. 

        //on ajoute un attribut isLiked pour chaque objet, la valeur sera false de base 
        //lors d'un like, on le rendra true pour qu'il puisse attribuer la classe red 


        const allHeart = document.querySelectorAll('.fa-solid.fa-heart');


        allHeart.forEach(heart => {
            heart.addEventListener('click', (event) => {
                const post = event.target.closest('.post');
                const postId = Number(post.dataset.id);
                const media = medias.find(media => media.id === postId);
                const divLikes = event.target.closest('.like')
                if (media) {

                    media.likes += event.target.classList.contains('red') ? -1 : 1;
                    media.isLiked = event.target.classList.contains('red') ? false : true;
                    console.log(media.isLiked);
                    event.target.classList.toggle('red');
                    divLikes.innerHTML = media.likes + ' '
                    divLikes.appendChild(event.target)
                    getTotalLike();
                }
            });

        });


        function getTotalLike() {

            const bandLikes = document.getElementById('band_like');
            const bandHeartLike = document.createElement('i');
            bandHeartLike.classList.add('fa-solid');
            bandHeartLike.classList.add('fa-heart');

            let total = 0

            medias.forEach((media) => {
                total += media.likes
            });

            bandLikes.innerText = total + ' '
            bandLikes.appendChild(bandHeartLike)
        }

        getTotalLike()
    }

    function getSortMedia() {

        const selectElement = document.querySelector('#trier #tri')

        selectElement.addEventListener('change', function () {
            if (this.value === 'popularity') {
                medias.sort((a, b) => b.likes - a.likes);
                const postSection = document.querySelector("#post_section");
                postSection.innerHTML = ''
                //console.log('tableau après tri like : ');
                //console.log(medias);
                createElementSort();
                getLightBox()
                getLikes()
            }

            else if (this.value === 'title') {
                medias.sort((a, b) => a.title.localeCompare(b.title));
                const postSection = document.querySelector("#post_section");
                postSection.innerHTML = ''
                //console.log('tableau après tri titre : ');
                //console.log(medias);
                createElementSort();
                getLightBox()
                getLikes()
            }
        });


        function createElementSort() {

            const postSection = document.querySelector("#post_section");
            postSection.innerHTML = ''

            medias.forEach(media => {

                const picture = `./assets/photographers/medias/${media.image}`;
                const video_ = `./assets/photographers/medias/${media.video}`;
                const post = document.createElement('article');

                post.classList.add('post');
                post.setAttribute('data-id', media.id)
                post.setAttribute('date', media.date)
                post.setAttribute('role', 'article')

                if (media.video) {
                    const vidMedia = document.createElement('video');
                    vidMedia.setAttribute("src", video_);
                    post.appendChild(vidMedia)
                }

                if (media.image) {
                    const imgMedia = document.createElement('img');
                    imgMedia.setAttribute("src", picture);
                    imgMedia.setAttribute("alt", 'Image miniature représentant la photo ' + media.title);
                    post.appendChild(imgMedia);
                }

                const title_like = document.createElement('div');
                title_like.classList.add('title_like');

                const divTitle = document.createElement('h2');
                divTitle.classList.add('title');
                divTitle.textContent = media.title;

                const divLike = document.createElement('div');
                divLike.classList.add('like');
                divLike.textContent = media.likes + ' ';

                const heartLike = document.createElement('i');
                heartLike.classList.add('fa-solid');
                heartLike.classList.add('fa-heart');
                //si l'attribut isLiked est trouvé sur un des objets du tableau, la classe red est ajouté
                //pour pouvoir laisser le coeur rouge
                if (media.isLiked) {
                    heartLike.classList.add('red');
                }

                const bandPrice = document.getElementById('band_price')
                bandPrice.innerText = media.price + '€ / jour'

                divLike.appendChild(heartLike);
                title_like.appendChild(divTitle);
                title_like.appendChild(divLike);

                post.appendChild(title_like);
                postSection.appendChild(post)
            });
        }

    }

    function getLightBox() {

        function showLightbox() {

            const images = document.querySelectorAll('#post_section .post img');
            const videos = document.querySelectorAll('#post_section .post video');
            const lightBox = document.getElementById('lightbox');
            const titleLightbox = document.querySelector('#lightbox #title')
            const i = document.querySelector('.fa-angle-left')

            for (let image of images) {
                image.addEventListener('click', () => {

                    const imageLightbox = document.createElement('img');
                    lightBox.appendChild(imageLightbox)
                    lightBox.style.display = 'flex';
                    imageLightbox.setAttribute("src", image.src)
                    imageLightbox.setAttribute("alt", image.alt)
                    lightBox.insertBefore(imageLightbox, i.nextSibling)
                    const title = image.parentElement.querySelector('.title_like .title').textContent;
                    titleLightbox.textContent = title;
                })
            }

            for (let video of videos) {
                video.addEventListener('click', () => {

                    const videoLightbox = document.createElement('video');
                    lightBox.appendChild(videoLightbox)
                    lightBox.style.display = 'flex';
                    videoLightbox.setAttribute("src", video.src)
                    videoLightbox.setAttribute("alt", video.alt)
                    videoLightbox.setAttribute("controls", '')
                    lightBox.insertBefore(videoLightbox, i.nextSibling)
                    const title = video.parentElement.querySelector('.title_like .title').textContent;
                    titleLightbox.textContent = title;
                })
            }
        }


        function closeLightbox() {

            const lightBox = document.getElementById('lightbox');
            const closeBtn = document.querySelector('#closeBtn')

            function close() {
                lightBox.style.display = 'none'
                const imageLightbox = document.querySelector('#lightbox img')
                const videoLightbox = document.querySelector('#lightbox video')
                if (imageLightbox) {

                    lightBox.removeChild(imageLightbox);

                } else if (videoLightbox) {

                    lightBox.removeChild(videoLightbox)

                }
            }

            closeBtn.addEventListener('click', () => {
                close();
            })

            document.addEventListener("keydown", (event) => {
                if (event.key === "Escape") {
                    close();
                }
            });
        }


        function changeImage() {

            const lightBox = document.getElementById('lightbox');
            const leftArrow = document.querySelector('.fa-angle-left');
            const rightArrow = document.querySelector('.fa-angle-right');
            const titleLightbox = document.querySelector('#lightbox #title')
            const images = document.querySelectorAll('#post_section .post img');
            const videos = document.querySelectorAll('#post_section .post video');


            // Combine all images and videos into one array
            let allMedia = [...images, ...videos];

            let selectedIndex = 0;

            //pour chaque médias du tableau allMedia  :
            allMedia.forEach(media => {
                //on va chercher le parent post
                const post = media.parentNode
                //on va récupérer l'id dans l'attribut data-id du post
                const postId = Number(post.dataset.id);
                //et on va ajouter l'attribut id à l'image/vidéo
                media.setAttribute("id", postId)
            });

            allMedia.forEach((media, index) => {
                media.addEventListener('click', () => {
                    selectedIndex = index;
                    console.log(`Image with index ${selectedIndex} was clicked`);

                });
            });

            //permet de créer un nouveau tableau qui va ranger le tableau des images de
            //la même facon que le tableau des medias
            let sortedArrayImg = [];

            for (let i = 0; i < medias.length; i++) {
                for (let j = 0; j < allMedia.length; j++) {
                    if (medias[i].id === parseInt(allMedia[j].id)) {
                        sortedArrayImg[i] = allMedia[j];
                        break;
                    }
                }
            }
            //le tableau allMedia devient le tableu sortedArrayImg
            allMedia = sortedArrayImg;


            console.log(medias);
            console.log(allMedia);


            //fonction permettant de changer de média vers la gauche
            function changeLeft() {
                selectedIndex--;
                if (selectedIndex < 0) {
                    selectedIndex = allMedia.length - 1;
                }
                const img = lightBox.querySelector("img");
                const video = lightBox.querySelector("video");

                if (img) {
                    lightBox.removeChild(img);
                } else if (video) {
                    lightBox.removeChild(video);
                }
            }

            //fonction permettant de changer de média vers la droite
            function changeRight() {
                selectedIndex++;
                if (selectedIndex >= allMedia.length) {
                    selectedIndex = 0;
                }

                const img = lightBox.querySelector("img");
                const video = lightBox.querySelector("video");

                if (img) {
                    lightBox.removeChild(img);
                } else if (video) {
                    lightBox.removeChild(video);
                }
            }

            // Lors du clic sur la flèche gauche, on appelle la fonction permettant de retourner à l'image précédente
            leftArrow.addEventListener('click', () => {
                changeLeft();
                updateLightbox();
            });

            // Lorsque l'utilisateur appuie sur la flèche gauche du clavier, on appelle la fonction permettant de retourner à l'image précédente
            document.addEventListener("keydown", (event) => {
                if (event.key === "ArrowLeft") {
                    changeLeft();
                    updateLightbox();
                }
            });

            // l'utilisateur appuie sur la flèche droite du clavier, on appelle la fonction permettant de retourner à l'image suivante
            rightArrow.addEventListener('click', () => {
                changeRight();
                updateLightbox();
            });

            // Lors du clic sur la flèche droite, on appelle la fonction permettant de retourner à l'image précédente
            document.addEventListener("keydown", (event) => {
                if (event.key === "ArrowRight") {
                    changeRight();
                    updateLightbox();
                }
            });


            function updateLightbox() {
                const currentMedia = allMedia[selectedIndex];
                lightBox.style.display = 'flex';
                if (currentMedia.tagName === 'IMG') {
                    // If current media is an image
                    const imageLightbox = document.createElement('img');
                    lightBox.appendChild(imageLightbox);
                    imageLightbox.setAttribute("src", currentMedia.src);
                    imageLightbox.setAttribute("alt", currentMedia.alt);
                    lightBox.insertBefore(imageLightbox, leftArrow.nextSibling);
                } else if (currentMedia.tagName === 'VIDEO') {
                    // If current media is a video
                    const videoLightbox = document.createElement('video');
                    lightBox.appendChild(videoLightbox);
                    videoLightbox.setAttribute("src", currentMedia.src);
                    videoLightbox.setAttribute("alt", currentMedia.alt);
                    videoLightbox.setAttribute("controls", '');
                    lightBox.insertBefore(videoLightbox, leftArrow.nextSibling);
                }
                const title = currentMedia.parentElement.querySelector('.title_like .title').textContent;
                titleLightbox.textContent = title;
            }
        }

        showLightbox(); closeLightbox(); changeImage()
    }

    return { getMediaCardDOM, getLikes, getSortMedia, getLightBox }


}









