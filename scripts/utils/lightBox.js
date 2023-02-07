//ouvrir la lightbox

function showLightbox() {

    window.onload = () => {

        const images = document.querySelectorAll('#post_section .post img');
        const videos = document.querySelectorAll('#post_section .post video');
        const lightBox = document.getElementById('lightbox');
        const titleLightbox = document.querySelector('#lightbox #title')
        //const titles = document.querySelectorAll('#post_section .title')
        const i = document.querySelector('.fa-angle-left')

        for (let image of images) {
            image.addEventListener('click', (e) => {

                const imageLightbox = document.createElement('img');
                lightBox.appendChild(imageLightbox)
                lightBox.style.display = 'flex';
                imageLightbox.setAttribute("src", image.src)
                imageLightbox.setAttribute("alt", image.alt)
                lightBox.insertBefore(imageLightbox, i.nextSibling)
                //astuce provisoire ? 
                titleLightbox.textContent = image.alt
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
                //astuce provisoire ? 
                titleLightbox.textContent = video.alt
            })
        }
    }
}



function closeLightbox() {
    const lightBox = document.getElementById('lightbox');
    const closeBtn = document.querySelector('#closeBtn')

    closeBtn.addEventListener('click', (e) => {
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

showLightbox();
closeLightbox();




/*function openLightBox() {

    window.onload = () => {

        const images = document.querySelectorAll('#post_section .post img');
        const lightBox = document.getElementById('lightbox');

        images.forEach(image => {
            image.addEventListener('click', (e) => {
                lightBox.style.display = 'flex';
            })
        });
    }
}

openLightBox();
*/




