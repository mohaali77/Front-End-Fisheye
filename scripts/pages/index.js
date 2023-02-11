fetch('./data/photographers.json')
    .then(response => response.json())
    .then(data => {
        //cette fonction va nous permettre de récupérer les données des photographes
        async function getPhotographers() {

            //on récupère le tableau des photographes.
            let photographers = data.photographers
            console.log(photographers);

            // et bien retourner le tableau photographers seulement une fois récupéré
            return ({
                photographers: [...photographers]
            })
        }

        async function displayData(photographers) {
            //on récupère l'élément du DOM où notre contenu sera intégrer
            const photographersSection = document.querySelector(".photographer_section");

            //pour chaque photographe, 
            photographers.forEach((photographer) => {
                const photographerModel = photographerFactory(photographer);
                const userCardDOM = photographerModel.getUserCardDOM();
                //ici on va intégrer les userCard à l'intérieur de la section des photographes
                photographersSection.appendChild(userCardDOM);
            });
        };

        async function init() {
            // Récupère les datas des photographes
            const { photographers } = await getPhotographers();
            displayData(photographers);
        };

        init();

    })