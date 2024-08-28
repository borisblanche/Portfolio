let currentSlideIndex = 0; 
let slides = [];


//------------------------Gallery---------------------------------//

document.addEventListener('DOMContentLoaded', () => {
    function displayGallery(items) {
        const gallery = document.querySelector('.gallery');
        gallery.innerHTML = ''; 
        items.forEach((item, index) => {
            const colDiv = document.createElement('div');
            colDiv.className = 'col-lg-4 col-md-6 mb-4';

            const cardDiv = document.createElement('div');
            cardDiv.className = 'card';

            const img = document.createElement('img');
            img.src = item.src;
            img.className = 'card-img-top';
            img.alt = item.alt;

            
            img.addEventListener('click', () => {
                openModal(index);
            });

            const cardBody = document.createElement('div');
            cardBody.className = 'card-body';

            const logo = document.createElement('img');
            logo.src = item.logo;
            logo.className = 'category-logo';
            logo.alt = item.category + ' logo';

            const cardLink = document.createElement('a');
            cardLink.href = item.link;
            cardLink.className = 'btn btn-primary';
            cardLink.innerHTML = '<i class="fa-brands fa-github"></i> Voir le projet';

            cardBody.appendChild(cardLink);
            cardDiv.appendChild(img);
            cardDiv.appendChild(logo);
            cardDiv.appendChild(cardBody);
            colDiv.appendChild(cardDiv);
            gallery.appendChild(colDiv);
        });
    }
    
    function filterGallery(category) {
        let filteredItems;
        if (category === 'all') {
            filteredItems = galleryItems; // Affiche tous les projets
        } else {
            filteredItems = galleryItems.filter(item => item.category.includes(category));
        }
        displayGallery(filteredItems);
    }

  
    displayGallery(galleryItems);

    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const category = button.dataset.category;
            filterGallery(category);
        });
    });
});


//-------------Slider-------------------//

document.addEventListener('DOMContentLoaded', () => {
    const sliderContainer = document.querySelector('.slider');
    if (sliderContainer) {
        sliderContainer.innerHTML = ''; // Effacer les anciennes slides

        galleryItems.forEach((item, index) => {
            const slide = document.createElement('div');
            slide.className = 'slider-item';

            const slideImage = document.createElement('img');
            slideImage.src = item.src;  // Assurez-vous que `item.src` pointe vers une image valide
            slideImage.alt = item.alt;
            slideImage.className = 'slider-image';

            const logo = document.createElement('img');
            logo.src = item.logo;
            logo.alt = `${item.category} logo`;
            logo.className = 'slider-category-logo';

            const description = document.createElement('div');
            description.className = 'slider-description';
            description.textContent = item.description;

            const container = document.createElement('div');
            container.className = 'slider-container';

            container.appendChild(slideImage);
            container.appendChild(logo);

            slide.appendChild(container);
            slide.appendChild(description);

            sliderContainer.appendChild(slide);
        });

        slides = document.getElementsByClassName('slider-item');

        if (slides.length > 0) {
            showSlide(currentSlideIndex);
        }
    }
});
  
//-------------------------------Modal---------------------------------------//

document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('modal');
    const modalContent = document.querySelector('.modal-content');
    const closeButton = document.querySelector('.modal .close');

    // Vérifiez si le bouton de fermeture existe avant d'ajouter l'événement
    if (closeButton) {
        closeButton.addEventListener('click', closeModal);
    }

    // Fermer la modal si l'utilisateur clique en dehors de modal-content
    modal.addEventListener('click', function(event) {
        if (event.target === modal) {
            closeModal();
        }
    });

    const prevButton = document.querySelector('.prev');
    const nextButton = document.querySelector('.next');

    if (prevButton && nextButton) {
        prevButton.addEventListener('click', () => plusSlides(-1));
        nextButton.addEventListener('click', () => plusSlides(1));
    }
});

function showSlide(index) {
    if (slides.length === 0) return;
    if (index >= slides.length) {
        currentSlideIndex = 0;
    }
    if (index < 0) {
        currentSlideIndex = slides.length - 1;
    }

    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }

    slides[currentSlideIndex].style.display = "block";
}

function plusSlides(n) {
    showSlide(currentSlideIndex += n);
}

function openModal(index) {
    document.getElementById("modal").style.display = "block";
    currentSlideIndex = index;
    showSlide(currentSlideIndex);
}

function closeModal() {
    document.getElementById("modal").style.display = "none";
}









