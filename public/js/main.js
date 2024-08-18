// Header Elements
let body = document.querySelector('body');
let nav = document.querySelector('nav');
let userArea = document.querySelector('.user-area');
let mobileMenuIcons = document.querySelectorAll('.mobile-menu-icon');
let mobileMenu = document.querySelector('.mobile-menu-area');
let removeButtons = document.querySelectorAll('.remove-button');
let foodImages = document.querySelectorAll('.food-image');
let inModalImageSelectButton = document.querySelector('.in-modal-image-select-button');
let newProductButton = document.querySelector('.new-product');
let newProfilePhoto = document.querySelector('#new-profile-photo');
let profilePhotoInEditPage = document.querySelector('.profile-photo-img');

// Sağ tık engelle
// document.oncontextmenu = function () {
//     return false;
// }


// Initialize event listeners
function init() {
    setupScrollListener();
    setupUserAreaToggle();
    setupMobileMenuToggle();
    setupPhotoChangeButtons();
    setupModals();
    setupRemoveButtons();
    setupInModalImageSelectButton();
    setupNewProfilePhoto();
    setupNewProduct();
    setupDefPhotos();
    setupBlockedE()
}

// Block e for number inputs

function setupBlockedE() {
    let numberInputs = document.querySelectorAll(".number-input")
    numberInputs.forEach(numberInput => {
        numberInput.addEventListener("keydown", (e) => {
            const validKeys = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", ","];
            const deleteKeys = ["Backspace", "Delete", "ArrowLeft", "ArrowRight"];
            if (deleteKeys.includes(e.key)) {
                return;
            }
            if (!validKeys.includes(e.key)) {
                e.preventDefault();
                return;
            }
            if (e.key === "," && numberInput.value.length === 0) {
                e.preventDefault();
            }
        });
    });
}

// Setup default photos
function setupDefPhotos(dataFor, url) {
let defPhotos = document.querySelectorAll('.def-photo');
    if (defPhotos) {
        defPhotos.forEach(defPhoto => {
            if (defPhoto.dataset.for === dataFor) {
                defPhoto.value = url;
            }
        });
    }
}

// Setup scroll event listener for nav
function setupScrollListener() {
    window.addEventListener('scroll', () => {
        nav.classList.toggle('scrolled', scrollY > 40);
    });
}

// Toggle user area
function setupUserAreaToggle() {
    if (userArea) {
        userArea.addEventListener('click', () => {
            userArea.classList.toggle('user-area-active');
        });
    }
}

// Toggle mobile menu
function setupMobileMenuToggle() {
    mobileMenuIcons.forEach(icon => {
        icon.addEventListener('click', () => {
            mobileMenu.classList.toggle('mobile-menu-area-active');
            body.classList.toggle('overflow-y');
        });
    });
}

// Setup new profile photo
function setupNewProfilePhoto() {
    if (newProfilePhoto) {
        newProfilePhoto.addEventListener('change', () => {
            const file = newProfilePhoto.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (event) => {
                    profilePhotoInEditPage.src = event.target.result;
                };
                reader.readAsDataURL(file);
            }
        });
    }
}

// Setup photo change buttons
function setupPhotoChangeButtons() {
    const photoChangeButtons = document.querySelectorAll('.photoChangeInput');
    photoChangeButtons.forEach(button => {
        button.addEventListener('change', () => {
            overlay();
            modalToggle(button.dataset.for);
        });
    });
}

// Setup modals
function setupModals() {
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        setupModalImages(modal);
        setupNewImageInput(modal);
    });
}

// Setup modal images
function setupModalImages(modal) {
    const modalImages = modal.querySelectorAll('.modal-image');
    modalImages.forEach(image => {
        addImageClickListener(image);
    });
}

// Add click listener to image
function addImageClickListener(imageElement) {
    imageElement.addEventListener('click', () => {
        const modal = imageElement.closest('.modal');
        const modalImages = modal.querySelectorAll('.modal-image');

        modalImages.forEach(img => img.classList.remove('modal-image-selected'));
        imageElement.classList.toggle('modal-image-selected');
    });
}

// Setup new image input
function setupNewImageInput(modal) {
    const newImageInputs = modal.querySelectorAll('.newImageInput');
    newImageInputs.forEach(newImageInput => {
        newImageInput.addEventListener('change', () => {
            const files = newImageInput.files;
            if (files.length > 0) {
                // Tüm dosyalar üzerinde döngü yap
                Array.from(files).forEach(file => {
                    const reader = new FileReader();
                    reader.onload = (e) => {
                        const newImg = document.createElement('img');
                        newImg.src = e.target.result;
                        newImg.classList.add('modal-image');
                        newImg.dataset.for = newImageInput.dataset.for;

                        // Hedef alanı seç
                        const targetImagesArea = modal.querySelector(`.images-area[data-for="${newImageInput.dataset.for}"]`);
                        if (targetImagesArea) {
                            // Resmi ekle
                            const secondChild = targetImagesArea.children[1] || null;
                            targetImagesArea.insertBefore(newImg, secondChild);
                            addImageClickListener(newImg);
                        }
                    };
                    reader.readAsDataURL(file);
                });
            }
        });
    });
}

// Setup remove buttons
function setupRemoveButtons() {
    const removeButtons = document.querySelectorAll('.remove-button');
    removeButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            foodImages.forEach(image => {
                if (image.dataset.for === button.dataset.for) {
                    image.src = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQmvxUtkhdIZbvRg2WRHHYLRdFV9IIy9CPfxQ&s';
                }
            });
        });
    });
}

// Setup in-modal image select buttons
function setupInModalImageSelectButton() {
    inModalImageSelectButton.addEventListener('click', () => {
        const foodImages = document.querySelectorAll('.food-image');
        foodImages.forEach(foodImage => {
            if (foodImage.dataset.for === inModalImageSelectButton.dataset.for) {
                const modal = document.querySelector(`.modal`);
                if (modal) {
                    const selectedImage = modal.querySelector('.modal-image-selected');
                    if (selectedImage) {
                        foodImage.src = selectedImage.src;
                        modalToggle();
                        setupDefPhotos(foodImage.dataset.for, foodImage.src);
                        overlay();
                    }
                }
            }
        });
    });
}

// Create a new product area
function setupNewProduct() {

    function newProductRandomId() {
        let newRandomId = 'newProduct-' + (Math.floor(Math.random() * 900000) + 100000);
        return newRandomId
    }

    if (newProductButton) {
        newProductButton.addEventListener('click', () => {
            let id = newProductRandomId()
            if (document.querySelector(`[data-for="${id}"]`)) {
                let id = newProductRandomId()
            } else {
                const productsEditArea = document.querySelector('.products-edit-area');
                if (productsEditArea) {
                    const secondChild = productsEditArea.children[1] || null;
                    // Yeni bir ürün edit alanı oluştur

                    const newProductDiv = document.createElement('div');
                    newProductDiv.classList.add('product-edit-area');

                    // Ürün fotoğrafı bölümü oluştur
                    const productPhotoDiv = document.createElement('div');
                    productPhotoDiv.classList.add('product-photo');

                    const imageDiv = document.createElement('div');
                    imageDiv.classList.add('image');

                    const imgElement = document.createElement('img');
                    imgElement.classList.add('food-image');
                    imgElement.dataset.for = id;
                    imgElement.src = 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Mona_Lisa%2C_by_Leonardo_da_Vinci%2C_from_C2RMF_retouched.jpg/220px-Mona_Lisa%2C_by_Leonardo_da_Vinci%2C_from_C2RMF_retouched.jpg';
                    imageDiv.appendChild(imgElement);
                    
                    const defPhotoInput = document.createElement('input')
                    defPhotoInput.type = 'hidden';
                    defPhotoInput.name = `${id}[productDefPhoto]`
                    defPhotoInput.classList.add('def-photo')
                    defPhotoInput.dataset.for = `${id}`
                    imageDiv.appendChild(defPhotoInput);

                    const buttonsDiv = document.createElement('div');
                    buttonsDiv.classList.add('buttons');

                    const changeButtonLabel = document.createElement('label');
                    changeButtonLabel.htmlFor = 'modal'; // Assuming "modal" is the ID of a modal element
                    changeButtonLabel.dataset.for = id; // Assuming a unique identifier for the product
                    changeButtonLabel.classList.add('changeButton', 'btn', 'btn-primary');
                    changeButtonLabel.textContent = 'Değiştir'; // "Değiştir" means "Change" in Turkish
                    buttonsDiv.appendChild(changeButtonLabel);

                    const removeButtonLink = document.createElement('a');
                    removeButtonLink.href = '#';
                    removeButtonLink.classList.add('remove-button', 'btn', 'btn-primary');
                    removeButtonLink.dataset.for = id;
                    removeButtonLink.textContent = 'Kaldır';
                    buttonsDiv.appendChild(removeButtonLink);

                    productPhotoDiv.appendChild(imageDiv);
                    productPhotoDiv.appendChild(buttonsDiv);

                    // Ürün girişleri bölümü oluştur
                    const productInputsDiv = document.createElement('div');
                    productInputsDiv.classList.add('product-inputs');

                    const nameInput = document.createElement('input');
                    nameInput.classList.add('name', 'input');
                    nameInput.name = `${id}[name]`;
                    nameInput.placeholder = 'Ürün ismi';
                    productInputsDiv.appendChild(nameInput);

                    const descriptionTextarea = document.createElement('textarea');
                    descriptionTextarea.classList.add('description', 'input', 'textarea');
                    descriptionTextarea.name = `${id}[description]`;
                    descriptionTextarea.placeholder = 'Ürün açıklaması';
                    productInputsDiv.appendChild(descriptionTextarea);

                    const priceInput = document.createElement('input');
                    priceInput.classList.add('price', 'input');
                    priceInput.name = `${id}[price]`;
                    priceInput.placeholder = 'Ürün fiyatı';
                    priceInput.type = 'number';
                    productInputsDiv.appendChild(priceInput);

                    newProductDiv.appendChild(productPhotoDiv);
                    newProductDiv.appendChild(productInputsDiv);


                    changeButtonLabel.addEventListener('click', () => {
                        inModalImageSelectButton.dataset.for = id
                        imagesInModal.forEach(imageInModal => {
                            imageInModal.dataset.for = id
                        })
                    });
                    productsEditArea.insertBefore(newProductDiv, secondChild);
                    setupRemoveButtons()
                    setupBlockedE()
                    setupDefPhotos()
                    foodImages = document.querySelectorAll(".food-image")
                    removeButtons = document.querySelectorAll(".remove-button")
                }
            }
        });
    }
}

// Toggle modal visibility
function modalToggle() {
    const modal = document.querySelector(`.modal`);
    if (modal) {
        modal.classList.toggle('modal-active');
    }
}

// Toggle overlay visibility
function overlay() {
    const overlayElement = document.querySelector('.overlay');
    if (overlayElement) {
        overlayElement.classList.toggle('overlay-active');
        body.classList.toggle('overflow-y');
    }
}


const modalButtons = document.querySelectorAll(".changeButton");
const modal = document.querySelector(".modal");
const imagesInModal = document.querySelectorAll(".modal-image")

modalButtons.forEach(modalButton => {
    modalButton.addEventListener("click", () => {
        inModalImageSelectButton.dataset.for = modalButton.dataset.for
        imagesInModal.forEach(imageInModal => {
            imageInModal.dataset.for = modalButton.dataset.for
        })
    });
});

// Initialize the application
init();