var welcomeSwiper = new Swiper(".welcome", {});
var categoriesSwiper = new Swiper(".categories", {
    slidesPerView: 'auto',
    spaceBetween: 20,
    freeMode: true,
    on: {
        click() {
            document.querySelectorAll('.swiper-slide').forEach(slide => {
                slide.classList.remove('swiper-slide-active');
            });
            var clickedSlide = this.slides[this.clickedIndex];
            if (clickedSlide) {
                clickedSlide.classList.add('swiper-slide-active');
            }
        },
    },
});