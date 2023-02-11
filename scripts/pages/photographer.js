let params = new URL(document.location).searchParams;
let paramId = params.get("id");

//Mettre le code JavaScript lié à la page photographer.html

fetch('./data/photographers.json')
    .then(response => response.json())
    .then(data => {
        async function getPhotographers() {

            let photographers = data.photographers
            console.log(photographers);

            // et bien retourner le tableau photographers seulement une fois récupéré
            return ({
                photographers: [...photographers]
            })
        }

        async function getMedias() {

            //on récupère un tableau de média qui correspondra à l'id de l'utilisateur sélectionné
            let medias = data.media.filter((element) => element.photographerId == paramId)
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
            // Récupère les datas des medias
            const { medias } = await getMedias();
            displayData(photographers);
            displayDataMedia(medias)

        };

        init();

    })