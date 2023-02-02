let params = new URL(document.location).searchParams;
let paramId = params.get("id");
console.log(paramId);

//Mettre le code JavaScript lié à la page photographer.html

fetch('./data/photographers.json')
    .then(response => response.json())
    .then(data => {
        async function getPhotographers() {
            // Ceci est un exemple de données pour avoir un affichage de photographes de test dès le démarrage du projet, 
            // mais il sera à remplacer avec une requête sur le fichier JSON en utilisant "fetch".

            let photographers = data.photographers
            console.log(photographers);


            // et bien retourner le tableau photographers seulement une fois récupéré
            return ({
                photographers: [...photographers]
            })
        }

        async function getMedias() {
            // Ceci est un exemple de données pour avoir un affichage de photographes de test dès le démarrage du projet, 
            // mais il sera à remplacer avec une requête sur le fichier JSON en utilisant "fetch".

            const medias = data.media.filter((element) => element.photographerId == paramId)
            console.log(medias);


            // et bien retourner le tableau photographers seulement une fois récupéré
            return ({
                medias: [...medias]
            })
        }

        async function displayDataMedia(medias) {

            const postSection = document.querySelector("#post_section");

            medias.forEach((media) => {
                const mediasModel = mediasFactory(media);
                const mediasCardDOM = mediasModel.getMediaCardDOM();
                postSection.appendChild(mediasCardDOM);
            });

            const bandLikes = document.getElementById('band_like');
            const heartLike = document.createElement('i');
            heartLike.classList.add('fa-solid');
            heartLike.classList.add('fa-heart');

            let total = 0

            medias.forEach((media) => {
                total += media.likes
            });

            bandLikes.innerText = total + ' '
            bandLikes.appendChild(heartLike)
            console.log(total);

        }


        async function displayData(photographers) {


            const onePhotographer = photographers.find((element) => element.id == paramId)
            console.log(onePhotographer);
            const photographerModel = photographerFactory(onePhotographer);
            const profilUserDOM = photographerModel.getProfilUserDOM();

        };

        async function init() {
            // Récupère les datas des photographes
            const { photographers } = await getPhotographers();
            const { medias } = await getMedias();
            displayData(photographers);
            displayDataMedia(medias)

        };

        init();

    })