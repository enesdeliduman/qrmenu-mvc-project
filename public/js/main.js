// Header Elements
var body = document.querySelector('body');
var nav = document.querySelector('nav');
var userArea = document.querySelector('.user-area');
var mobileMenuIcons = document.querySelectorAll('.mobile-menu-icon');
var mobileMenu = document.querySelector('.mobile-menu-area');
var removeButtons = document.querySelectorAll('.remove-button');
var foodImages = document.querySelectorAll('.food-image');
var inModalImageSelectButton = document.querySelector('.in-modal-image-select-button');
var newProductButton = document.querySelector('.new-product');
var newProfilePhoto = document.querySelector('#new-profile-photo');
var profilePhotoInEditPage = document.querySelector('.profile-photo-img');
var QRCodeViewLinks = document.querySelectorAll('.qrcode')
var bulkUpdateLinks = document.querySelectorAll('.bulk-update')
var bulkUpdateArea = document.querySelector('.bulk-update-area')
var priceAction = document.querySelector('#priceAction')
var updateType = document.querySelector('#updateType')
var updateValue = document.querySelector('#updateValue')
var bulkUpdateInfo = document.querySelector('#bulk-update-info')
var updateThreshold = document.querySelector('#updateThreshold')
var thresholdType = document.querySelector('#thresholdType')
var bulkUpdateSubmitButton = document.querySelector('#bulkUpdateSubmitButton')
var companyTableItems = document.querySelectorAll('.company-table-item');
var categoryCards = document.querySelectorAll('.category-card');
var mobileMenuLinks = document.querySelectorAll('.mobile-menu-link')

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
    setupMobileMenuLinks();
    setupNewProfilePhoto();
    setupNewProduct();
    setupDefPhotos();
    setupBulkUpdate()
    setupCategoryCard()
    setupBlockedE()
    setupCompanySearch()
    setupQRCodeViewers()
}


// Random id creators
function randomId(place) {
    var newRandomId
    if (place == "newProduct") {
        newRandomId = 'newProduct-' + (Math.floor(Math.random() * 900000) + 100000);
    } else if (place == "uploadNewPhoto") {
        newRandomId = (Math.floor(Math.random() * 90000000) + 10000000);
    }
    return newRandomId
}

function setupMobileMenuLinks() {
    mobileMenuLinks.forEach(mobileMenuLink => {
        mobileMenuLink.addEventListener("click", () => {
            mobileMenu.classList.remove('mobile-menu-area-active');
            body.classList.remove('overflow-y');
        })
    })
}

function setupCompanySearch() {
    var companySearchInput = document.querySelector('#company-search-input');
    if (companySearchInput && companyTableItems) {
        companySearchInput.addEventListener("input", () => {
            var searchValue = companySearchInput.value.trim().toLowerCase();
            companyTableItems.forEach(item => {
                var itemName = item.dataset.name.toLowerCase();
                if (itemName.includes(searchValue) || searchValue === "") {
                    item.hidden = false;
                } else {
                    item.hidden = true;
                }
            });
        });
    }
}


// Qr code view
function setupQRCodeViewers() {
    var qrcodeArea = document.querySelector('.qrcode-area')
    var qrcodeAreaCloseButton = document.querySelector('#qrcode-area-close-button')
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

function setupCategoryCard() {
    const categoryCards = document.querySelectorAll('.category-card');
    
    categoryCards.forEach(categoryCard => {
        categoryCard.addEventListener('click', () => {
            const content = categoryCard.querySelector('.category-card-content');
            const isActive = categoryCard.classList.contains('category-card-active');

            // Kapalı olan diğer içerikleri kapat
            document.querySelectorAll('.category-card').forEach(card => {
                const cardContent = card.querySelector('.category-card-content');
                if (card !== categoryCard) {
                    card.classList.remove('category-card-active');
                    cardContent.classList.remove('category-card-content-active');
                }
            });

            // Tıklanan kartın içeriğini aç veya kapat
            categoryCard.classList.toggle('category-card-active', !isActive);
            content.classList.toggle('category-card-active', !isActive);
        });
    });
}




function setupBlockedE() {
    var numberInputs = document.querySelectorAll(".number-input")
    numberInputs.forEach(numberInput => {
        numberInput.addEventListener("keydown", (e) => {
            var validKeys = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", ","];
            var devareKeys = ["Backspace", "Devare", "ArrowLeft", "ArrowRight"];
            if (devareKeys.includes(e.key)) {
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
    var defPhotos = document.querySelectorAll('.def-photo');
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

function setupBulkUpdate() {
    if (bulkUpdateLinks) {
        bulkUpdateLinks.forEach(bulkUpdateLink => {
            bulkUpdateLink.addEventListener('click', () => {
                overlay()
                bulkUpdateArea.classList.toggle('bulk-update-area-active')
            })
        })
        document.querySelectorAll('#priceAction, #updateType, #thresholdType, #updateValue, #updateThreshold').forEach(element => {
            element.addEventListener('input', updateInfos);
        });
        function updateInfos() {
            var priceAction = document.getElementById('priceAction');
            var updateType = document.getElementById('updateType');
            var thresholdType = document.getElementById('thresholdType');
            var updateValue = parseFloat(document.getElementById('updateValue').value);
            var updateThreshold = parseFloat(document.getElementById('updateThreshold').value);
            var bulkUpdateSubmitButton = document.getElementById('bulkUpdateSubmitButton');
            var bulkUpdateInfo = document.getElementById('bulk-update-info');

            // Geçerlilik kontrolü
            var isInvalidValue = isNaN(updateValue) || updateValue <= 0;
            var isInvalidThreshold = isNaN(updateThreshold) || updateThreshold <= 0;
            var isInvalidDiscount = (priceAction.value === 'discount' && updateType.value === 'percentage' && updateValue >= 100);
            var isInvalidThresholdCondition = (thresholdType.value === 'below' && updateValue >= updateThreshold);

            if (isInvalidValue || isInvalidThreshold || isInvalidDiscount || isInvalidThresholdCondition) {
                bulkUpdateSubmitButton.disabled = true;
                bulkUpdateSubmitButton.classList.add('disabled');
            } else {
                bulkUpdateSubmitButton.disabled = false;
                bulkUpdateSubmitButton.classList.remove('disabled');

                var actionText = priceAction.options[priceAction.selectedIndex].dataset.name;
                var valueType = updateType.options[updateType.selectedIndex].dataset.name;
                var thresholdText = thresholdType.options[thresholdType.selectedIndex].dataset.name;

                var formattedUpdateValue = updateType.value === 'percentage' ? `%${updateValue}` : `${updateValue}₺`;

                bulkUpdateInfo.textContent = `${updateThreshold}₺ ${thresholdText} tüm ürünlerinize ${formattedUpdateValue} ${actionText}`;
            }
        }


    }
}




// 15
// 10
// 12


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
            var file = newProfilePhoto.files[0];
            if (file) {
                // Dosya ismini değiştir
                var newFileName = 'new-profile-photo-' + randomId('uploadNewPhoto') + '.' + file.name.split('.').pop();

                var newFile = new File([file], newFileName, { type: file.type });

                var dataTransfer = new DataTransfer();
                dataTransfer.items.add(newFile);
                newProfilePhoto.files = dataTransfer.files;

                var reader = new FileReader();
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
    var photoChangeButtons = document.querySelectorAll('.photoChangeInput');
    photoChangeButtons.forEach(button => {
        button.addEventListener('change', () => {
            overlay();
            modalToggle(button.dataset.for);
        });
    });
}

// Setup modals
function setupModals() {
    var modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        setupModalImages(modal);
        setupNewImageInput(modal);
    });
}

// Setup modal images
function setupModalImages(modal) {
    var modalImages = modal.querySelectorAll('.modal-image');
    modalImages.forEach(image => {
        addImageClickListener(image);
    });
}

// Add click listener to image
function addImageClickListener(imageElement) {
    imageElement.addEventListener('click', () => {
        var modal = imageElement.closest('.modal');
        var modalImages = modal.querySelectorAll('.modal-image');

        modalImages.forEach(img => img.classList.remove('modal-image-selected'));
        imageElement.classList.toggle('modal-image-selected');
    });
}

// Setup new image input
function setupNewImageInput(modal) {
    var newImageInputs = modal.querySelectorAll('.newImageInput');
    var allFiles = [];

    newImageInputs.forEach(newImageInput => {
        newImageInput.addEventListener('click', (e) => {
            if (allFiles.length >= 10) {
                alert("Tek seferde en fazla 10 adet görsel yükleyebilirsin.");
                e.preventDefault();
            }
        });

        newImageInput.addEventListener('change', (e) => {
            var files = newImageInput.files;
            if (files.length > 0) {
                Array.from(files).forEach(file => {
                    var reader = new FileReader();
                    reader.onload = (e) => {
                        var img = new Image();
                        img.onload = function () {
                            var canvas = document.createElement('canvas');
                            var ctx = canvas.getContext('2d');

                            var maxWidth = 1920;
                            var maxHeight = 1080;
                            var width = img.width;
                            var height = img.height;

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

                            var targetSizeKB = 750;
                            var qualityStep = 0.05;
                            var quality = 1.0;
                            var attemptCount = 0;

                            function adjustQuality() {
                                canvas.toBlob(function (blob) {
                                    var fileSizeKB = blob.size / 1024;

                                    // Convert Blob to File
                                    var fileName = 'new-product-photo-' + randomId("uploadNewPhoto") + '.jpg';
                                    var file = new File([blob], fileName, { type: 'image/jpeg' });

                                    var outputImg = document.createElement('img');
                                    outputImg.src = e.target.result;
                                    outputImg.classList.add('modal-image');
                                    outputImg.dataset.for = newImageInput.dataset.for;
                                    outputImg.dataset.name = fileName;

                                    var targetImagesArea = modal.querySelector(`.images-area[data-for="${newImageInput.dataset.for}"]`);
                                    if (targetImagesArea) {
                                        var secondChild = targetImagesArea.children[1] || null;
                                        targetImagesArea.insertBefore(outputImg, secondChild);
                                        addImageClickListener(outputImg);
                                    }

                                    allFiles.push(file);

                                    // Update DataTransfer files
                                    var dataTransfer = new DataTransfer();
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
    var removeButtons = document.querySelectorAll('.remove-button');
    removeButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            foodImages.forEach(image => {
                if (image.dataset.for === button.dataset.for) {
                    image.src = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQmvxUtkhdIZbvRg2WRHHYLRdFV9IIy9CPfxQ&s';
                    setupDefPhotos(image.dataset.for, 'notPhoto.png');
                }
            });
        });
    });
}

// Setup in-modal image select buttons
function setupInModalImageSelectButton() {
    if (inModalImageSelectButton) {
        inModalImageSelectButton.addEventListener('click', () => {
            var foodImages = document.querySelectorAll('.food-image');
            foodImages.forEach(foodImage => {
                if (foodImage.dataset.for === inModalImageSelectButton.dataset.for) {
                    var modal = document.querySelector(`.modal`);
                    if (modal) {
                        var selectedImage = modal.querySelector('.modal-image-selected');
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
    var qrcodeImgDiv = document.getElementById('qrcode-img');

    qrcodeImgDiv.addEventListener('click', function () {
        var svgElement = qrcodeImgDiv.innerHTML.trim();
        var svgBlob = new Blob([svgElement], { type: 'image/svg+xml;charset=utf-8' });
        var url = URL.createObjectURL(svgBlob);

        var downloadLink = document.createElement('a');
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
            var id = randomId("newProduct")
            if (document.querySelector(`[data-for="${id}"]`)) {
                var id = randomId("newProduct")
            } else {
                var productsEditArea = document.querySelector('.products-edit-area');
                if (productsEditArea) {
                    var secondChild = productsEditArea.children[1] || null;

                    var newProductDiv = document.createElement('div');
                    newProductDiv.classList.add('product-edit-area');

                    var productPhotoDiv = document.createElement('div');
                    productPhotoDiv.classList.add('product-photo');

                    var imageDiv = document.createElement('div');
                    imageDiv.classList.add('image');

                    var imgElement = document.createElement('img');
                    imgElement.classList.add('food-image');
                    imgElement.dataset.for = id;
                    imgElement.src = '/uploads/notPhoto.png';
                    imageDiv.appendChild(imgElement);

                    var defPhotoInput = document.createElement('input')
                    defPhotoInput.type = 'hidden';
                    defPhotoInput.name = `${id}[productDefPhoto]`
                    defPhotoInput.classList.add('def-photo')
                    defPhotoInput.dataset.for = `${id}`
                    defPhotoInput.value = 'notPhoto.png'
                    imageDiv.appendChild(defPhotoInput);

                    var buttonsDiv = document.createElement('div');
                    buttonsDiv.classList.add('buttons');

                    var changeButtonLabel = document.createElement('label');
                    changeButtonLabel.htmlFor = 'modal'; // Assuming "modal" is the ID of a modal element
                    changeButtonLabel.dataset.for = id; // Assuming a unique identifier for the product
                    changeButtonLabel.classList.add('changeButton', 'btn', 'btn-primary');
                    changeButtonLabel.textContent = 'Değiştir'; // "Değiştir" means "Change" in Turkish
                    buttonsDiv.appendChild(changeButtonLabel);

                    var removeButtonLink = document.createElement('a');
                    removeButtonLink.href = '#';
                    removeButtonLink.classList.add('remove-button', 'btn', 'btn-primary');
                    removeButtonLink.dataset.for = id;
                    removeButtonLink.textContent = 'Kaldır';
                    buttonsDiv.appendChild(removeButtonLink);

                    productPhotoDiv.appendChild(imageDiv);
                    productPhotoDiv.appendChild(buttonsDiv);

                    // Ürün girişleri bölümü oluştur
                    var productInputsDiv = document.createElement('div');
                    productInputsDiv.classList.add('product-inputs');

                    var nameInput = document.createElement('input');
                    nameInput.classList.add('name', 'input');
                    nameInput.name = `${id}[name]`;
                    nameInput.placeholder = 'Ürün ismi';
                    nameInput.required = true
                    productInputsDiv.appendChild(nameInput);

                    var descriptionTextarea = document.createElement('textarea');
                    descriptionTextarea.classList.add('description', 'input', 'textarea');
                    descriptionTextarea.name = `${id}[description]`;
                    descriptionTextarea.placeholder = 'Ürün açıklaması';
                    descriptionTextarea.required = true
                    productInputsDiv.appendChild(descriptionTextarea);

                    var priceInput = document.createElement('input');
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
    var modal = document.querySelector(`.modal`);
    if (modal) {
        modal.classList.toggle('modal-active');
    }
}

// Toggle overlay visibility
function overlay() {
    var overlayElement = document.querySelector('.overlay');
    if (overlayElement) {
        overlayElement.classList.toggle('overlay-active');
        body.classList.toggle('overflow-y');
    }
}


var modalButtons = document.querySelectorAll(".changeButton");
var modal = document.querySelector(".modal");
var imagesInModal = document.querySelectorAll(".modal-image")

modalButtons.forEach(modalButton => {
    modalButton.addEventListener("click", () => {
        inModalImageSelectButton.dataset.for = modalButton.dataset.for
        imagesInModal.forEach(imageInModal => {
            imageInModal.dataset.for = modalButton.dataset.for
        })
    });
});


init();