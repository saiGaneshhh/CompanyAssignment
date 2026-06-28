const navbar = document.querySelector('.navbar');

const handleScroll = () => {
    navbar.classList.toggle('scrolled', window.scrollY > 10);
};

window.addEventListener('scroll', handleScroll);
handleScroll();


/*=========================================
      HAMBURGER MENU
=========================================*/

const hamburger = document.getElementById('hamburger');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
});


/*=========================================
      SECTION 2 - DRAG SLIDER
=========================================*/

/*=========================================
        SECTION 2 - SCHOOL SLIDER
=========================================*/

document.addEventListener("DOMContentLoaded", () => {

    initSchoolSlider();

});

function initSchoolSlider() {

    const sliders = document.querySelectorAll(".school-slider");

    sliders.forEach(slider => {
        initSingleSlider(slider);
    });

}

function initSingleSlider(slider) {

    let isDragging = false;
    let startX = 0;
    let scrollLeft = 0;

    /* Prevent image drag */

    slider.querySelectorAll("img").forEach(img => {

        img.setAttribute("draggable", "false");

    });

    /*=========================
        Mouse Events
    =========================*/

    slider.addEventListener("mousedown", (e) => {

        isDragging = true;

        slider.classList.add("dragging");

        startX = e.pageX;

        scrollLeft = slider.scrollLeft;

    });

    document.addEventListener("mouseup", () => {

        isDragging = false;

        slider.classList.remove("dragging");

    });

    document.addEventListener("mousemove", (e) => {

        if (!isDragging) return;

        e.preventDefault();

        const distance = e.pageX - startX;

        slider.scrollLeft = scrollLeft - distance * 1.5;

    });

    slider.addEventListener("mouseleave", () => {

        if (!isDragging) return;

        isDragging = false;

        slider.classList.remove("dragging");

    });

    /*=========================
        Touch Events
    =========================*/

    let touchStartX = 0;
    let touchScrollLeft = 0;

    slider.addEventListener("touchstart", (e) => {

        touchStartX = e.touches[0].pageX;

        touchScrollLeft = slider.scrollLeft;

    }, { passive: true });

    slider.addEventListener("touchmove", (e) => {

        const touchX = e.touches[0].pageX;

        const distance = touchX - touchStartX;

        slider.scrollLeft = touchScrollLeft - distance * 1.5;

    }, { passive: true });

}

/*=========================================
        SECTION 5 CAROUSEL
=========================================*/

document.addEventListener("DOMContentLoaded", () => {

    const slider = document.querySelector(".why-slider");
    const track = document.querySelector(".why-track");

    const prevBtn = document.querySelector(".prev-btn");
    const nextBtn = document.querySelector(".next-btn");

    if (!slider || !track) return;

    const cards = [...track.children];

    let currentIndex = 0;

    let cardsPerView = 4;

    let autoPlay;

    let startX = 0;
    let currentTranslate = 0;
    let prevTranslate = 0;

    let isDragging = false;



    /*=========================================
            RESPONSIVE
    =========================================*/

    function getCardsPerView(){

        if(window.innerWidth <= 480){

            cardsPerView = 1;

        }

        else if(window.innerWidth <= 768){

            cardsPerView = 2;

        }

        else if(window.innerWidth <= 992){

            cardsPerView = 3;

        }

        else{

            cardsPerView = 4;

        }

    }



    function updateSlider(){

        getCardsPerView();

        const cardWidth = cards[0].offsetWidth + 24;

        currentTranslate = -(currentIndex * cardWidth);

        track.style.transform = `translateX(${currentTranslate}px)`;

    }



    /*=========================================
            NEXT
    =========================================*/

    function nextSlide(){

        getCardsPerView();

        if(currentIndex >= cards.length - cardsPerView){

            currentIndex = 0;

        }else{

            currentIndex++;

        }

        updateSlider();

    }



    /*=========================================
            PREVIOUS
    =========================================*/

    function prevSlide(){

        getCardsPerView();

        if(currentIndex <= 0){

            currentIndex = cards.length - cardsPerView;

        }else{

            currentIndex--;

        }

        updateSlider();

    }



    nextBtn.addEventListener("click", nextSlide);

    prevBtn.addEventListener("click", prevSlide);



    /*=========================================
            AUTOPLAY
    =========================================*/

    function startAuto(){

        autoPlay = setInterval(nextSlide,3000);

    }

    function stopAuto(){

        clearInterval(autoPlay);

    }

    startAuto();



    slider.addEventListener("mouseenter",stopAuto);

    slider.addEventListener("mouseleave",startAuto);



    /*=========================================
            DRAG
    =========================================*/

    slider.addEventListener("mousedown",(e)=>{

        isDragging=true;

        startX=e.pageX;

        prevTranslate=currentTranslate;

        stopAuto();

        slider.style.cursor="grabbing";

    });



    window.addEventListener("mouseup",()=>{

        if(!isDragging) return;

        isDragging=false;

        slider.style.cursor="grab";



        const moved=currentTranslate-prevTranslate;



        if(moved<-120){

            nextSlide();

        }

        else if(moved>120){

            prevSlide();

        }

        else{

            updateSlider();

        }

        startAuto();

    });



    window.addEventListener("mousemove",(e)=>{

        if(!isDragging) return;

        e.preventDefault();

        const currentPosition=e.pageX;

        const diff=currentPosition-startX;

        currentTranslate=prevTranslate+diff;

        track.style.transform=`translateX(${currentTranslate}px)`;

    });



    /*=========================================
            TOUCH
    =========================================*/

    slider.addEventListener("touchstart",(e)=>{

        startX=e.touches[0].clientX;

        prevTranslate=currentTranslate;

        stopAuto();

    },{passive:true});



    slider.addEventListener("touchmove",(e)=>{

        const current=e.touches[0].clientX;

        const diff=current-startX;

        currentTranslate=prevTranslate+diff;

        track.style.transform=`translateX(${currentTranslate}px)`;

    },{passive:true});



    slider.addEventListener("touchend",()=>{

        const moved=currentTranslate-prevTranslate;

        if(moved<-100){

            nextSlide();

        }

        else if(moved>100){

            prevSlide();

        }

        else{

            updateSlider();

        }

        startAuto();

    });



    /*=========================================
            KEYBOARD
    =========================================*/

    document.addEventListener("keydown",(e)=>{

        if(e.key==="ArrowRight"){

            nextSlide();

        }

        if(e.key==="ArrowLeft"){

            prevSlide();

        }

    });



    window.addEventListener("resize",updateSlider);

    updateSlider();

});

const submitBtn = document.querySelector(".submit-btn");

submitBtn.addEventListener("click", function(e){

    e.preventDefault();

    this.classList.add("active");

    setTimeout(()=>{

        this.classList.remove("active");

    },1800);

});
