// Récupération des données via l'API Fetch
fetch('./data/photographers.json')
    // On transforme la réponse en JSON
    .then(response => response.json())
    .then(data => {
        //fonction qui va nous permettre de récupérer les données des photographes
        async function getPhotographers() {
            //on récupère les données des photographes.
            let photographers = data.photographers
            // on retourne le tableau photographers seulement une fois récupéré
            return ({
                photographers: [...photographers]
            })
        }

        // Fonction qui affiche les données dans le DOM
        async function displayData(photographers) {
            //on récupère l'élément du DOM où notre contenu sera intégrer
            const photographersSection = document.querySelector(".photographer_section");

            //pour chaque photographe :
            photographers.forEach((photographer) => {
                //on appelle la fonction photographerFactory 
                const photographerModel = photographerFactory(photographer);
                //on appelle la fonction userCard de chaque utilisateurs
                const userCardDOM = photographerModel.getUserCardDOM();
                //ici on va intégrer ces userCards à l'intérieur de la section des photographes
                photographersSection.appendChild(userCardDOM);
            });
        }

        async function init() {
            // Récupère les datas des photographes
            const { photographers } = await getPhotographers();
            // On appelle la fonction qui va afficher les données dans le DOM
            displayData(photographers);
        }

        init();

    })
    .catch((e) =>
        console.log("il y a une erreur :" + e)
    );