

/*function showLightbox() {

    const images = document.querySelectorAll('#post_section .post img');
    const videos = document.querySelectorAll('#post_section .post video');
    const lightBox = document.getElementById('lightbox');
    const titleLightbox = document.querySelector('#lightbox #title')
    const i = document.querySelector('.fa-angle-left')

    for (let image of images) {
        image.addEventListener('click', (e) => {

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
        video.addEventListener('click', (e) => {

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

    closeBtn.addEventListener('click', (e) => {
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

    allMedia.forEach((media, index) => {
        media.addEventListener('click', (e) => {
            selectedIndex = index;
            console.log(`Image with index ${selectedIndex} was clicked`);

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
    leftArrow.addEventListener('click', (e) => {
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
    rightArrow.addEventListener('click', (e) => {
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


window.onload = () => {

    showLightbox();
    closeLightbox();
    changeImage();

}*/















// Vous pouvez maintenant utiliser les données des médias stockées dans la variable mediasData
