fetch('./data/photographers.json')
    .then(response => response.json())
    .then(data => {

        let medias = data.media.filter(element => element.photographerId == paramId)
        const selectElement = document.querySelector('#trier #tri')

        selectElement.addEventListener('change', function () {
            if (this.value === 'popularity') {
                medias.sort((a, b) => b.likes - a.likes);
                console.log('tableau après tri like : ');
                console.log(medias);

                const postSection = document.querySelector("#post_section");
                postSection.innerHTML = ''

                medias.forEach(media => {

                    const picture = `./assets/photographers/medias/${media.image}`;
                    const video_ = `./assets/photographers/medias/${media.video}`;
                    const post = document.createElement('div');
                    post.classList.add('post');

                    if (media.video) {
                        const vidMedia = document.createElement('video');
                        vidMedia.setAttribute("src", video_);
                        vidMedia.setAttribute("alt", media.title);
                        // vidMedia.setAttribute("controls", '')
                        post.appendChild(vidMedia)
                    }

                    if (media.image) {
                        const imgMedia = document.createElement('img');
                        imgMedia.setAttribute("src", picture);
                        imgMedia.setAttribute("alt", media.title);
                        post.appendChild(imgMedia);
                    }

                    const title_like = document.createElement('div');
                    title_like.classList.add('title_like');

                    const divTitle = document.createElement('div');
                    divTitle.classList.add('title');
                    divTitle.textContent = media.title;

                    const divLike = document.createElement('div');
                    divLike.classList.add('like');
                    divLike.textContent = media.likes + ' ';

                    const heartLike = document.createElement('i');
                    heartLike.classList.add('fa-solid');
                    heartLike.classList.add('fa-heart');

                    const bandPrice = document.getElementById('band_price')
                    bandPrice.innerText = media.price + '€ / jour'

                    divLike.appendChild(heartLike);
                    title_like.appendChild(divTitle);
                    title_like.appendChild(divLike);

                    post.appendChild(title_like);
                    postSection.appendChild(post)
                });

            }

            else if (this.value === 'title') {
                medias.sort((a, b) => a.title.localeCompare(b.title));
                console.log('tableau après tri titre : ');
                console.log(medias);
                const postSection = document.querySelector("#post_section");
                postSection.innerHTML = ''

                medias.forEach(media => {

                    const picture = `./assets/photographers/medias/${media.image}`;
                    const video_ = `./assets/photographers/medias/${media.video}`;
                    const post = document.createElement('div');
                    post.classList.add('post');

                    if (media.video) {
                        const vidMedia = document.createElement('video');
                        vidMedia.setAttribute("src", video_);
                        vidMedia.setAttribute("alt", media.title);
                        // vidMedia.setAttribute("controls", '')
                        post.appendChild(vidMedia)
                    }

                    if (media.image) {
                        const imgMedia = document.createElement('img');
                        imgMedia.setAttribute("src", picture);
                        imgMedia.setAttribute("alt", media.title);
                        post.appendChild(imgMedia);
                    }

                    const title_like = document.createElement('div');
                    title_like.classList.add('title_like');

                    const divTitle = document.createElement('div');
                    divTitle.classList.add('title');
                    divTitle.textContent = media.title;

                    const divLike = document.createElement('div');
                    divLike.classList.add('like');
                    divLike.textContent = media.likes + ' ';

                    const heartLike = document.createElement('i');
                    heartLike.classList.add('fa-solid');
                    heartLike.classList.add('fa-heart');

                    const bandPrice = document.getElementById('band_price')
                    bandPrice.innerText = media.price + '€ / jour'

                    divLike.appendChild(heartLike);
                    title_like.appendChild(divTitle);
                    title_like.appendChild(divLike);

                    post.appendChild(title_like);
                    postSection.appendChild(post)
                });
            }
        });

    });

