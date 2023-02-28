function photographerFactory(data) {
    const { name, portrait, city, country, tagline, price, id } = data;

    const picture = `./assets/photographers/Photographers-ID-Photos/${portrait}`;

    //fonction qui va créer les carte des photographes sur la page index.html
    function getUserCardDOM() {

        const article = document.createElement('article');
        article.setAttribute("role", "article");
        article.setAttribute("tabindex", "0");
        article.setAttribute("aria-label", "Article sur le photographe " + name);

        const a = document.createElement('a');
        a.setAttribute("href", "./photographer.html?id=" + id);
        a.setAttribute("aria-label", "Lien qui va mener vers la page du photographe " + name);

        const img = document.createElement('img');
        img.setAttribute("src", picture);
        img.setAttribute("alt", "Photo de profil de " + name);

        const h2 = document.createElement('h2');
        h2.textContent = name;
        h2.setAttribute("aria-label", "Nom du photographe");


        //ajout de l'élement affichant la ville et le pays
        const city_country = document.createElement('div');
        city_country.classList.add('city_country');
        city_country.textContent = city + ', ' + country;
        city_country.setAttribute("aria-label", "Ville et pays du photographe");


        //ajout de l'élement affichant la phrase d'accroche
        const tagLine = document.createElement('div');
        tagLine.classList.add('tagline');
        tagLine.textContent = tagline;
        tagLine.setAttribute("aria-label", "Phrase d'accroche du photographe");


        //ajout de l'élement affichant le prix
        const textPrice = document.createElement('div');
        textPrice.classList.add('price');
        textPrice.textContent = price + '€/jour';
        textPrice.setAttribute("aria-label", "Prix du photographe par jour");

        a.appendChild(img);
        article.appendChild(a);
        article.appendChild(h2);
        article.appendChild(city_country);
        article.appendChild(tagLine);
        article.appendChild(textPrice);
        return (article);
    }

    //fonction qui va afficher les informations de l'utilisateur sur la page photographer.html
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




    }

    //on retourne les fonctions
    return { getUserCardDOM, getProfilUserDOM }
}

function mediasFactory(medias) {

    //fonction qui va créer les posts du photographe sur la page photographer.html
    function getMediaCardDOM(media) {

        let { title, image, date, likes, price, id, video } = media;

        const picture = `./assets/photographers/medias/${image}`;
        const video_ = `./assets/photographers/medias/${video}`;

        //on créer un élément article qui contiendra toute les infos du post
        const post = document.createElement('article');
        post.classList.add('post');
        post.setAttribute('data-id', id)
        post.setAttribute('date', date)
        post.setAttribute('role', 'article')
        post.setAttribute('tabindex', '0');

        //si le media est une vidéo on créer un élément vidéo
        if (video) {
            const vidMedia = document.createElement('video');
            vidMedia.setAttribute("src", video_);
            const vidSourceMedia = document.createElement('source')
            vidSourceMedia.setAttribute('src', video_)
            vidMedia.appendChild(vidSourceMedia)
            //vidMedia.setAttribute('tabindex', 0)
            post.appendChild(vidMedia)

        }

        //si le media est une image on créer un élément image
        if (image) {
            const imgMedia = document.createElement('img');
            imgMedia.setAttribute("src", picture);
            imgMedia.setAttribute("alt", 'Image miniature représentant la photo ' + title);
            post.appendChild(imgMedia);
            //imgMedia.setAttribute('tabindex', 0)
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
        heartLike.setAttribute('tabindex', 0)
        heartLike.setAttribute('aria-label', 'bouton qui permet de mettre un like au post')

        //on récupère la bande fixé sur la page et on lui ajoute le prix par jour du photographe
        const bandPrice = document.getElementById('band_price')
        bandPrice.innerText = price + '€ / jour'

        divLike.appendChild(heartLike);
        title_like.appendChild(divTitle);
        title_like.appendChild(divLike);

        post.appendChild(title_like);

        return (post);

    }

    //fonction qui va permettre d'ajouter des likes, et de calculer le total des likes sur la page
    function getLikes() {

        //on récupère l'ensemble des icones coeur qui sont dans chaque post
        const allHeart = document.querySelectorAll('.fa-solid.fa-heart');

        //pour chaque clic sur un coeur, on va récupérer l'attribut data-id qui est dans la balise .post le plus proche
        //on va le convertir en nombre, et on va le comparer avec l'id d'un des medias de notre tableau. 
        allHeart.forEach(heart => {
            heart.addEventListener('click', (event) => {
                const post = event.target.closest('.post');
                const postId = Number(post.dataset.id);
                const media = medias.find(media => media.id === postId);
                const divLikes = event.target.closest('.like')
                //si un id similaire est bien trouvé dans le tableau
                if (media) {
                    //si la class red existe on ajoute -1 au likes du médias, si elle n'existe pas, on ajoute +1
                    media.likes += event.target.classList.contains('red') ? -1 : 1;
                    //si la class red existe ou non, un attribut isLiked est ajouté et sera soit true soit false
                    media.isLiked = event.target.classList.contains('red') ? false : true;
                    //on ajoute, ou supprime la class red si elle est présente ou non
                    event.target.classList.toggle('red');
                    //on change l'affichage du nombre de like dans le post
                    divLikes.innerHTML = media.likes + ' '
                    //on ajoute l'icone coeur dans la div
                    divLikes.appendChild(event.target)
                    //on appelle la fonction qui nous permet de calculer le total des likes de la page, 
                    //pour qu'elle puisse recommencer le calcul, avec cette fois le nouveau nombre de like 
                    //qui a été ajouté
                    getTotalLike();
                }
            });

            //même code, mais cette fois pour ajouter un like avec la touche entrée du clavier
            heart.addEventListener('keydown', (event) => {
                if (event.key === 'Enter') {
                    // pour empêcher la propagation de l'événement
                    event.stopPropagation();
                    const post = event.target.closest('.post');
                    const postId = Number(post.dataset.id);
                    const media = medias.find(media => media.id === postId);
                    const divLikes = event.target.closest('.like')

                    if (media) {
                        media.likes += event.target.classList.contains('red') ? -1 : 1;
                        media.isLiked = event.target.classList.contains('red') ? false : true;
                        event.target.classList.toggle('red');
                        divLikes.innerHTML = media.likes + ' '
                        divLikes.appendChild(event.target)
                        getTotalLike();
                    }
                }
            });

        });

        //fonction qui va calculer les likes totaux du photographe
        function getTotalLike() {

            //on récupère la bande du dom et on créer l'icone coeur
            const bandLikes = document.getElementById('band_like');
            const bandHeartLike = document.createElement('i');
            bandHeartLike.classList.add('fa-solid');
            bandHeartLike.classList.add('fa-heart');
            //on initialise une variable total à 0
            let total = 0

            //pour chaque média, on ajoute la valeur de l'attribut likes à la variable total, ce qui donne du coup
            //l'ensemble des likes que le photographes à reçu pour ses posts
            medias.forEach((media) => {
                total += media.likes
            });

            //on ajoute le total des likes dans la bande
            bandLikes.innerText = total + ' '
            //et on ajoute l'icone coeur dans la bande également
            bandLikes.appendChild(bandHeartLike)
        }

        //on retourne la fonction
        getTotalLike()
    }

    //fonction qui va permettre de faire un tri des médias selon sa popularité, sa date ou son titre
    function getSortMedia() {

        //on récupère la balise selection du tri
        const selectElement = document.querySelector('#trier #tri')

        //lors d'un changement d'option dans la selection : 
        selectElement.addEventListener('change', function () {
            //si la valeur d'une des options correspond à popularity
            if (this.value === 'popularity') {
                //on effectue un tri des likes du plus grand au plus petit 
                medias.sort((a, b) => b.likes - a.likes);
                //on efface tout le contenu de la section des posts
                const postSection = document.querySelector("#post_section");
                postSection.innerHTML = ''
                //et on appelle la fonction createElement qui va recréer tout les post dans la section
                //en prenant cette fois-ci en compte, le nouvel ordre d'ajout des post.
                createElementSort();
                //on appelle également la fonction de la lightbox pour pouvoir toujours l'afficher (et avec le nouvel ordre également)
                getLightBox()
                //et également la fonction des likes
                getLikes()
            }

            else if (this.value === 'title') {
                //on effectue un tri des titre 
                medias.sort((a, b) => a.title.localeCompare(b.title));
                const postSection = document.querySelector("#post_section");
                postSection.innerHTML = ''
                createElementSort();
                getLightBox()
                getLikes()
            }

            else if (this.value === 'date') {
                // on effectue un tri des articles par date du plus ancien au plus récent
                medias.sort((a, b) => new Date(a.date) - new Date(b.date));
                const postSection = document.querySelector("#post_section");
                postSection.innerHTML = '';
                createElementSort();
                getLightBox();
                getLikes();
            }
        });

        //fonction qui va recréer tout les post du photographe
        function createElementSort() {

            const postSection = document.querySelector("#post_section");
            postSection.innerHTML = ''

            medias.forEach(media => {

                let { title, image, date, likes, price, id, video, isLiked } = media;

                const picture = `./assets/photographers/medias/${image}`;
                const video_ = `./assets/photographers/medias/${video}`;
                const post = document.createElement('article');

                post.classList.add('post');
                post.setAttribute('data-id', id)
                post.setAttribute('date', date)
                post.setAttribute('role', 'article')
                post.setAttribute('tabindex', '0');


                if (media.video) {
                    const vidMedia = document.createElement('video');
                    vidMedia.setAttribute("src", video_);
                    post.appendChild(vidMedia)
                }

                if (media.image) {
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
                heartLike.setAttribute('tabindex', 0)
                heartLike.setAttribute('aria-label', 'bouton qui permet de mettre un like au post')
                //si l'attribut isLiked renvoie true sur un des objets du tableau, la classe red est ajouté
                //pour pouvoir laisser le coeur rouge
                if (isLiked) {
                    heartLike.classList.add('red');
                }

                const bandPrice = document.getElementById('band_price')
                bandPrice.innerText = price + '€ / jour'

                divLike.appendChild(heartLike);
                title_like.appendChild(divTitle);
                title_like.appendChild(divLike);

                post.appendChild(title_like);
                postSection.appendChild(post)
            });
        }

    }

    //fonction qui va permettre d'afficher, de fermer la lightbox, et de naviguer entre les différents médias
    function getLightBox() {

        //fonction qui va afficher la lightbox, et intégrer les élément dedans
        function showLightbox() {

            //on récupère toute les images dans un tableau
            const images = document.querySelectorAll('#post_section .post img');
            //on récupère toute les vidéos dans un tableau
            const videos = document.querySelectorAll('#post_section .post video');
            //on récupère la section lighbox du DOM
            const lightBox = document.getElementById('lightbox');
            const titleLightbox = document.querySelector('#lightbox #title')
            const i = document.querySelector('.fa-angle-left')
            const posts = document.querySelectorAll('.post');

            //pour chaque image du tableau des images : 
            for (let image of images) {
                //lors du clic sur une image, 
                image.addEventListener('click', () => {
                    //on créer une image
                    const imageLightbox = document.createElement('img');
                    //on l'ajoute dans la balise de la lightbox
                    lightBox.appendChild(imageLightbox)
                    //on affiche la lightbox avec un display: flex
                    lightBox.style.display = 'flex';
                    //on ajoute en attribut de l'image de la lighbox les même attribut que l'image qui a été cliqué
                    imageLightbox.setAttribute("src", image.src)
                    imageLightbox.setAttribute("alt", image.alt)
                    //on place l'image de la lightbox juste après l'icone de la flèche qui pointe à gauche
                    lightBox.insertBefore(imageLightbox, i.nextSibling)
                    //on ajoute au titre de la lightbox, le même titre que l'image qui a été cliqué
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
                    //on ajoute l'attribut controle pour permettre à l'utilisateur de contrôler la vidéo
                    videoLightbox.setAttribute("controls", '')
                    lightBox.insertBefore(videoLightbox, i.nextSibling)
                    const title = video.parentElement.querySelector('.title_like .title').textContent;
                    titleLightbox.textContent = title;
                })
            }

            function showLightboxKey() {
                posts.forEach(post => {
                    post.addEventListener('keydown', event => {
                        if (event.key === 'Enter') {
                            // on vérifie si le post contient une image ou une vidéo
                            const image = post.querySelector('img');
                            const video = post.querySelector('video');

                            if (image) {
                                // on crée une image
                                const imageSrc = image.getAttribute('src');
                                const imageAlt = image.getAttribute('alt');
                                const imageLightbox = document.createElement('img');
                                // on l'ajoute dans la balise de la lightbox
                                lightBox.appendChild(imageLightbox)
                                // on affiche la lightbox avec un display: flex
                                lightBox.style.display = 'flex';
                                // on ajoute en attribut de l'image de la lighbox les même attribut que l'image qui a été cliqué
                                imageLightbox.setAttribute("src", imageSrc)
                                imageLightbox.setAttribute("alt", imageAlt)
                                // on place l'image de la lightbox juste après l'icone de la flèche qui pointe à gauche
                                lightBox.insertBefore(imageLightbox, i.nextSibling)
                                // on ajoute au titre de la lightbox, le même titre que l'image qui a été cliqué
                                const imageTitle = post.querySelector('.title').textContent;
                                titleLightbox.textContent = imageTitle;

                            } else if (video) {
                                // on crée une vidéo
                                const videoSrc = video.getAttribute('src');
                                const videoLightbox = document.createElement('video');
                                lightBox.appendChild(videoLightbox)
                                lightBox.style.display = 'flex';
                                videoLightbox.setAttribute("src", videoSrc)
                                // on ajoute l'attribut controle pour permettre à l'utilisateur de contrôler la vidéo
                                videoLightbox.setAttribute("controls", '')
                                lightBox.insertBefore(videoLightbox, i.nextSibling)
                                const videoTitle = post.querySelector('.title').textContent;
                                titleLightbox.textContent = videoTitle;
                            }
                        }
                    });
                });
            }

            showLightboxKey();
        }

        //fonction qui va fermer la lightbox
        function closeLightbox() {

            const lightBox = document.getElementById('lightbox');
            //on récupère le bouton de fermeture de la lightbox dans le DOM
            const closeBtn = document.querySelector('#closeBtn')

            //fonction qui va fermer la lightbox lors du clic sur le bouton
            function closeButton() {
                closeBtn.addEventListener('click', () => {

                    lightBox.style.display = 'none'
                    const imageLightbox = document.querySelector('#lightbox img')
                    const videoLightbox = document.querySelector('#lightbox video')
                    if (imageLightbox) {

                        lightBox.removeChild(imageLightbox);

                    } else if (videoLightbox) {

                        lightBox.removeChild(videoLightbox)

                    }
                })
            }

            //fonction qui va ferme la lightobox en cliquant sur echap
            function closeEscape() {
                document.addEventListener("keydown", (event) => {
                    if (event.key === "Escape") {
                        lightBox.style.display = 'none'
                        const imageLightbox = document.querySelector('#lightbox img')
                        const videoLightbox = document.querySelector('#lightbox video')
                        if (imageLightbox) {

                            lightBox.removeChild(imageLightbox);

                        } else if (videoLightbox) {

                            lightBox.removeChild(videoLightbox)

                        }
                    }
                });
            }

            closeButton();
            closeEscape();

        }

        //fonction qui va permettre de naviguer dans la lightbox
        function changeImage() {

            const lightBox = document.getElementById('lightbox');
            const leftArrow = document.querySelector('.fa-angle-left');
            const rightArrow = document.querySelector('.fa-angle-right');
            const titleLightbox = document.querySelector('#lightbox #title')
            const images = document.querySelectorAll('#post_section .post img');
            const videos = document.querySelectorAll('#post_section .post video');


            // On va combiner les tableaux d'images et de videos dans un seul
            let allMedia = [...images, ...videos];

            //pour chaque médias du tableau allMedia  :
            allMedia.forEach(media => {
                //on va chercher le parent post
                const post = media.parentNode
                //on va récupérer l'id dans l'attribut data-id du post
                const postId = Number(post.dataset.id);
                //et on va ajouter l'attribut id à l'image/vidéo
                media.setAttribute("id", postId)
            });

            //on va ensuite créer un nouveau tableau qui va ranger le tableau des images de
            //la même facon que le tableau des medias pour pouvoir naviguer dans le même ordre.
            let sortedArrayImg = [];

            for (let i = 0; i < medias.length; i++) {
                for (let j = 0; j < allMedia.length; j++) {
                    if (medias[i].id === parseInt(allMedia[j].id)) {
                        sortedArrayImg[i] = allMedia[j];
                        break;
                    }
                }
            }

            //le tableau allMedia devient maintenant le tableu sortedArrayImg
            allMedia = sortedArrayImg;

            let selectedIndex = 0;

            allMedia.forEach((media, index) => {
                media.addEventListener('click', () => {
                    selectedIndex = index;
                });
            });


            //fonction permettant de changer de média vers la gauche
            function changeLeft() {
                selectedIndex--;
                if (selectedIndex < 0) {
                    selectedIndex = allMedia.length - 1;
                }
                const img = lightBox.querySelector("img");
                const video = lightBox.querySelector("video");

                //si l'élément de la lightbox déjà présent est une image on l'a supprime
                if (img) {
                    lightBox.removeChild(img);
                    //si l'élément de la lightbox déjà présent est une video on l'a supprime
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
                if (event.key === "ArrowLeft" && lightBox.style.display === "flex") {
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
                if (event.key === "ArrowRight" && lightBox.style.display === "flex") {
                    changeRight();
                    updateLightbox();
                }
            });

            //fonction qui va mettre à jour la lightbox
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

        //on retourne les fonctions.
        showLightbox(); closeLightbox(); changeImage()
    }

    //on retourne les fonctions
    return { getMediaCardDOM, getLikes, getSortMedia, getLightBox }


}








