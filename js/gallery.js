

let currentSlideIndex = 0; 
let slides = [];

//------------------------Gallery et Slider---------------------------------//

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
            cardLink.target = "_blank"; 
            cardLink.rel = "noopener noreferrer"; 


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
            filteredItems = galleryItems;
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


    const sliderContainer = document.querySelector('.slider');
    if (sliderContainer) {
        sliderContainer.innerHTML = ''; 

        galleryItems.forEach((item, index) => {
            console.log("Index:", index); 
            const slide = document.createElement('div');
            slide.className = 'slider-item';
            slide.setAttribute('data-index', index);

            const slideImage = document.createElement('img');
            slideImage.src = item.src;
            slideImage.alt = item.alt;
            slideImage.className = 'slider-image';

            const logo = document.createElement('img');
            logo.src = item.logo;
            logo.alt = `${item.category} logo`;
            logo.className = 'slider-category-logo';


            const container = document.createElement('div');
            container.className = 'slider-container';

            container.appendChild(slideImage);
            container.appendChild(logo);

            slide.appendChild(container);
          

            sliderContainer.appendChild(slide);
        });

        slides = document.getElementsByClassName('slider-item');
        console.log("Nombre d'éléments dans galleryItems:", galleryItems.length);
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

    if (closeButton) {
        closeButton.addEventListener('click', closeModal);
    }

    modal.addEventListener('click', function(event) {
        if (event.target === modal) {
            closeModal();
        }
    });

      const prevButton = document.querySelector('.prev');
    const nextButton = document.querySelector('.next');

    if (prevButton && nextButton) {
        prevButton.addEventListener('click', () => {
            console.log('Clic sur le bouton précédent');
            plusSlides(-1);
        });

        nextButton.addEventListener('click', () => {
            console.log('Clic sur le bouton suivant');
            plusSlides(1);
        });
    }
});

function showSlide(index) {
    if (slides.length === 0) return;

    
    if (index >= slides.length) {
        currentSlideIndex = 0;
    } else if (index < 0) {
        currentSlideIndex = slides.length - 1;
    } else {
        currentSlideIndex = index;
    }

   
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }

  
    slides[currentSlideIndex].style.display = "block";
    console.log(`Affichage du slide ${currentSlideIndex + 1} sur ${slides.length}`);

    const currentItem = galleryItems[currentSlideIndex];
    document.getElementById('slider-title').textContent = currentItem.title;
    document.getElementById('slider-description').textContent = currentItem.description;
    document.getElementById('slider-details').textContent = currentItem.details;

    
}

function plusSlides(n) {
    currentSlideIndex += n;
    console.log("currentSlideIndex après incrémentation:", currentSlideIndex); // Débogage
    showSlide(currentSlideIndex);
}

function openModal(index) {
    document.getElementById("modal").style.display = "block";
    currentSlideIndex = index;
    showSlide(currentSlideIndex);
}

function closeModal() {
    document.getElementById("modal").style.display = "none";
}



(function() {
    emailjs.init("zQ6KgnXC80qQHP-WY"); 
 })();
document.getElementById('contact-form').addEventListener('submit', function(event) {
    event.preventDefault();


    const fromName = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    const templateParams = {
        from_name: fromName, 
        from_email: email,  
        message: message     

    };

    emailjs.send("service_dt27s9t","template_x6rzycv", templateParams)
        .then(function(response) {
           console.log('Email envoyé avec succès!', response.status, response.text);
           alert('Votre message a été envoyé avec succès !');
        }, function(error) {
           console.error('Échec de l\'envoi de l\'email.', error);
           alert('Une erreur est survenue lors de l\'envoi du message.');
        });
});






