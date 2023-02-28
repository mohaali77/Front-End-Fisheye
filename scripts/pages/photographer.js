//on récupère l'URL de la page
let params = new URL(document.location).searchParams;
//on récupère l'id de l'URL de la page
let paramId = params.get("id");

// Récupération des données via l'API Fetch
fetch('./data/photographers.json')
    // On transforme la réponse en JSON
    .then(response => response.json())
    .then(data => {
        //fonction qui va nous permettre de récupérer les données des photographes
        async function getPhotographers() {
            //on récupère les données des photographes.
            let photographers = data.photographers

            // on retourne le tableau des photographes seulement une fois récupéré
            return ({
                photographers: [...photographers]
            })
        }

        //fonction qui va nous permettre de récupérer les données des médias
        async function getMedias() {

            //on récupère un tableau de média qui correspondra à l'id de l'utilisateur sélectionné
            let medias = data.media.filter((element) => element.photographerId == paramId)


            // on retourne le tableau des medias seulement une fois récupéré
            return ({
                medias: [...medias]
            })
        }

        // Fonction qui affichera les données du photographes et de ses médias dans le DOM
        async function displayData(photographers) {
            //on récupère le photographe qui possède un id similaire à celui de l'URL
            const onePhotographer = photographers.find((element) => element.id == paramId)
            //on appelle la fonction photographerFactory en passant en argument les données du photographe trouvé
            const photographerModel = photographerFactory(onePhotographer);
            const profilUserDOM = photographerModel.getProfilUserDOM();

        }

        // Fonction qui affichera les données des médias dans le DOM
        async function displayDataMedia(medias) {

            //on récupère l'élément du DOM où les médias seront intégrés
            const postSection = document.querySelector("#post_section");
            const mediasModel = mediasFactory(medias);

            //pour chaque medias : 
            medias.forEach((media) => {
                //on appelle la fonction qui va créer les cartes pour chaque médias
                const mediasCardDOM = mediasModel.getMediaCardDOM(media);
                //ici on va intégrer ces mediasCard à l'intérieur de la section des photographes
                postSection.appendChild(mediasCardDOM);

            });

            //on appelle les fonction présente dans la fonction mediasFactory
            //fonction pour trier les posts
            const sortMedia = mediasModel.getSortMedia();
            //fonction pour ajouter des likes
            const mediasLike = mediasModel.getLikes();
            //fonction pour afficher une lightbox
            const lightBox = mediasModel.getLightBox();


        }

        async function init() {
            // Récupère les datas des photographes
            const { photographers } = await getPhotographers();
            // Récupère les datas des medias
            const { medias } = await getMedias();
            // On appelle la fonction qui va afficher les données des photographes dans le DOM
            displayData(photographers);
            // On appelle la fonction qui va afficher les données des medias dans le DOM
            displayDataMedia(medias)

        }

        init();

    })
    .catch((e) =>
        console.log("il y a une erreur :" + e)
    );