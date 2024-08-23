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
let QRCodeViewLinks = document.querySelectorAll('.qrcode')

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
    setupQRCodeViewers()
}

document.addEventListener('DOMContentLoaded', () => {

})

// Qr code view
function setupQRCodeViewers() {
    let qrcodeArea = document.querySelector('.qrcode-area')
    let qrcodeAreaCloseButton = document.querySelector('#qrcode-area-close-button')

    QRCodeViewLinks = document.querySelectorAll('.qrcode'); // Ögeleri tekrar seçelim

    QRCodeViewLinks.forEach(QRCodeViewLink => {
        QRCodeViewLink.addEventListener('click', () => {
            toggle()
            body.classList.add('overflow-y');
        });
    });
    qrcodeAreaCloseButton.addEventListener('click', () => {
        toggle()
        if (window.innerWidth > 992) {
            body.classList.remove('overflow-y');
        } else {
            body.classList.add('overflow-y');
        }
    });
    function toggle() {
        overlay()
        qrcodeArea.classList.toggle('qrcode-area-active')

    }
}


// Random id creators
function randomId(place) {
    let newRandomId
    if (place == "newProduct") {
        newRandomId = 'newProduct-' + (Math.floor(Math.random() * 900000) + 100000);
    } else if (place == "uploadNewPhoto") {
        newRandomId = (Math.floor(Math.random() * 90000000) + 10000000);
    }
    return newRandomId
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

function setupNewProfilePhoto() {
    if (newProfilePhoto) {
        newProfilePhoto.addEventListener('change', () => {
            const file = newProfilePhoto.files[0];
            if (file) {
                // Dosya ismini değiştir
                const newFileName = 'new-profile-photo-' + randomId('uploadNewPhoto') + '.' + file.name.split('.').pop();

                const newFile = new File([file], newFileName, { type: file.type });

                const dataTransfer = new DataTransfer();
                dataTransfer.items.add(newFile);
                newProfilePhoto.files = dataTransfer.files;

                const reader = new FileReader();
                reader.onload = (event) => {
                    profilePhotoInEditPage.src = event.target.result;
                };
                reader.readAsDataURL(newFile);
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
    let allFiles = [];

    newImageInputs.forEach(newImageInput => {
        newImageInput.addEventListener('click', (e) => {
            if (allFiles.length >= 10) {
                alert("Tek seferde en fazla 10 adet görsel yükleyebilirsin.");
                e.preventDefault();
            }
        });

        newImageInput.addEventListener('change', (e) => {
            const files = newImageInput.files;
            if (files.length > 0) {
                Array.from(files).forEach(file => {
                    const reader = new FileReader();
                    reader.onload = (e) => {
                        const img = new Image();
                        img.onload = function () {
                            const canvas = document.createElement('canvas');
                            const ctx = canvas.getContext('2d');

                            const maxWidth = 1920;
                            const maxHeight = 1080;
                            let width = img.width;
                            let height = img.height;

                            if (width > height) {
                                if (width > maxWidth) {
                                    height *= maxWidth / width;
                                    width = maxWidth;
                                }
                            } else {
                                if (height > maxHeight) {
                                    width *= maxHeight / height;
                                    height = maxHeight;
                                }
                            }

                            canvas.width = width;
                            canvas.height = height;
                            ctx.drawImage(img, 0, 0, width, height);

                            const targetSizeKB = 750;
                            const qualityStep = 0.05;
                            let quality = 1.0;
                            let attemptCount = 0;

                            function adjustQuality() {
                                canvas.toBlob(function (blob) {
                                    const fileSizeKB = blob.size / 1024;

                                    // Convert Blob to File
                                    const fileName = 'new-product-photo-' + randomId("uploadNewPhoto") + '.jpg';
                                    const file = new File([blob], fileName, { type: 'image/jpeg' });

                                    const outputImg = document.createElement('img');
                                    outputImg.src = e.target.result;
                                    outputImg.classList.add('modal-image');
                                    outputImg.dataset.for = newImageInput.dataset.for;
                                    outputImg.dataset.name = fileName;

                                    const targetImagesArea = modal.querySelector(`.images-area[data-for="${newImageInput.dataset.for}"]`);
                                    if (targetImagesArea) {
                                        const secondChild = targetImagesArea.children[1] || null;
                                        targetImagesArea.insertBefore(outputImg, secondChild);
                                        addImageClickListener(outputImg);
                                    }

                                    allFiles.push(file);

                                    // Update DataTransfer files
                                    const dataTransfer = new DataTransfer();
                                    allFiles.forEach(f => dataTransfer.items.add(f));
                                    newImageInput.files = dataTransfer.files;

                                    if (fileSizeKB > targetSizeKB && quality > 0.5 && attemptCount < 10) {
                                        quality -= qualityStep;
                                        attemptCount++;
                                        adjustQuality();
                                    }
                                }, 'image/jpeg', quality);
                            }

                            adjustQuality();
                        };
                        img.src = e.target.result;
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
    if (inModalImageSelectButton) {
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
                            setupDefPhotos(foodImage.dataset.for, selectedImage.dataset.name);
                            overlay();
                        }
                    }
                }
            });
        });
    }
}

// Sayfa yüklendiğinde çalışacak kod
document.addEventListener('DOMContentLoaded', function () {
    const qrcodeImgDiv = document.getElementById('qrcode-img');

    qrcodeImgDiv.addEventListener('click', function () {
        const svgElement = qrcodeImgDiv.innerHTML.trim();
        const svgBlob = new Blob([svgElement], { type: 'image/svg+xml;charset=utf-8' });
        const url = URL.createObjectURL(svgBlob);

        const downloadLink = document.createElement('a');
        downloadLink.href = url;
        downloadLink.download = 'qrcode.svg';
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);

        // Blob URL'sini temizleyin
        URL.revokeObjectURL(url);
    });
});




// Create a new product area
function setupNewProduct() {
    if (newProductButton) {
        newProductButton.addEventListener('click', () => {
            let id = randomId("newProduct")
            if (document.querySelector(`[data-for="${id}"]`)) {
                let id = randomId("newProduct")
            } else {
                const productsEditArea = document.querySelector('.products-edit-area');
                if (productsEditArea) {
                    const secondChild = productsEditArea.children[1] || null;

                    const newProductDiv = document.createElement('div');
                    newProductDiv.classList.add('product-edit-area');

                    const productPhotoDiv = document.createElement('div');
                    productPhotoDiv.classList.add('product-photo');

                    const imageDiv = document.createElement('div');
                    imageDiv.classList.add('image');

                    const imgElement = document.createElement('img');
                    imgElement.classList.add('food-image');
                    imgElement.dataset.for = id;
                    imgElement.src = '/uploads/notPhoto.png';
                    imageDiv.appendChild(imgElement);

                    const defPhotoInput = document.createElement('input')
                    defPhotoInput.type = 'hidden';
                    defPhotoInput.name = `${id}[productDefPhoto]`
                    defPhotoInput.classList.add('def-photo')
                    defPhotoInput.dataset.for = `${id}`
                    defPhotoInput.value = 'notPhoto.png'
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
                    nameInput.required = true
                    productInputsDiv.appendChild(nameInput);

                    const descriptionTextarea = document.createElement('textarea');
                    descriptionTextarea.classList.add('description', 'input', 'textarea');
                    descriptionTextarea.name = `${id}[description]`;
                    descriptionTextarea.placeholder = 'Ürün açıklaması';
                    descriptionTextarea.required = true
                    productInputsDiv.appendChild(descriptionTextarea);

                    const priceInput = document.createElement('input');
                    priceInput.classList.add('price', 'input');
                    priceInput.name = `${id}[price]`;
                    priceInput.placeholder = 'Ürün fiyatı';
                    priceInput.type = 'number';
                    priceInput.required = true
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


init();