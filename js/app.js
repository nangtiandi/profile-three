
// scrolling body overflow
function stopScrollingBody(){
    document.body.classList.toggle('hidden-scrolling');
}
// =========== ********* navigation menu ******** ============
(()=>{
    const menuBtn = document.querySelector('.menu-btn'),
    navMenu = document.querySelector('.nav-menu'),
    closeNavMenu = navMenu.querySelector('.close-nav-menu');

    menuBtn.addEventListener('click',showMenu);
    closeNavMenu.addEventListener('click',hideMenu);

    function showMenu() {
        navMenu.classList.add('open');
        stopScrollingBody();
    }
    function hideMenu() {
        navMenu.classList.remove('open');
        fadeOut();
        stopScrollingBody();
    }
    function fadeOut() {
        document.querySelector('.fade-out-effect').classList.add('active');
        setTimeout(()=>{
            document.querySelector('.fade-out-effect').classList.remove('active');
        },300);
    }
    document.addEventListener('click',(event)=>{
        // console.log(event.target.hash)
        if(event.target.classList.contains('link-item')){
            if(event.target.hash !== ""){
                event.preventDefault();
                const hash = event.target.hash;
                // console.log(hash)
                document.querySelector('.section.active').classList.add('hide');
                document.querySelector('.section.active').classList.remove('active');
                // activite new section
                document.querySelector(hash).classList.add('active');
                document.querySelector(hash).classList.remove('hide');
                navMenu.querySelector('.active').classList.remove('active');
                if(navMenu.classList.contains('open')){
                    event.target.classList.add('active');
                    hideMenu();
                }else{
                    let navItems = navMenu.querySelectorAll('.link-item');
                    navItems.forEach((item)=> {
                        if(hash === item.hash){
                            item.classList.add('active');
                        }
                    })
                    fadeOut();
                }
                // adding hash (#) to url bar
                window.location.hash = hash;
            }
        }
    })
})();

// skill tabs seciton
(()=>{
    let skillSection = document.querySelector('#skill');
    let tabContent = document.querySelector('.skill-tabs');

    tabContent.addEventListener('click',(event)=>{
        if(event.target.classList.contains('tab-item') && !event.target.classList.contains('active')){
            const target = event.target.getAttribute('data-target');
            tabContent.querySelector('.active').classList.remove('active');
            event.target.classList.add('active');
            skillSection.querySelector('.tab-content.active').classList.remove('active');
            skillSection.querySelector(target).classList.add('active');
        }
    })
})();
// portfolio filter and popup action
(()=>{
    const filterContainer = document.querySelector('.portfolio-filter'),
    portfolioItemsContainer = document.querySelector('.portfolio-items'),
    portfolioItems = document.querySelectorAll('.portfolio-item'),
    // console.log(portfolioItems)
    popup = document.querySelector('.portfolio-popup'),
    prevBtn = popup.querySelector('.popup-prev'),
    nextBtn = popup.querySelector('.popup-next'),
    closeBtn = popup.querySelector('.pupup-close-btn'),
    projectDetailsContainer = popup.querySelector('.popup-details'),
    projectDetailsBtn = popup.querySelector('.popup-details-btn');

    let itemIndex, slideIndex, screenshots;

    // filter portfolio items action

    filterContainer.addEventListener('click',(event)=>{
        // console.log(event.target);
        // if(event.target.classList.contains('filter-item') && !event.target.classList.contains('active')){
        //     console.log('true');
        // }else{
        //     console.log('false');
        // }
        // console.log(event.target)
        if(event.target.classList.contains('filter-item') && !event.target.classList.contains('active')){
            // deactive active in filter-item class
            filterContainer.querySelector('.active').classList.remove('active');
            event.target.classList.add('active');

            const target = event.target.getAttribute('data-target');
            // console.log(target)
            portfolioItems.forEach((item)=>{
                // console.log(item);
                // console.log(item.getAttribute('data-category'))
                if(target === item.getAttribute('data-category') || target === 'all'){
                    item.classList.remove('hide');
                    item.classList.add('show');
                }else{
                    item.classList.remove('show');
                    item.classList.add('hide');
                }
            })
        }
    })
    portfolioItemsContainer.addEventListener('click',(event)=>{
        // console.log(event.target) console.log(event.target.closest('.portfolio-item-inner'))
        if(event.target.closest(".portfolio-item-inner")){
            const portfolioItem = event.target.closest(".portfolio-item-inner").parentElement;
            // console.log(portfolioItem)
            itemIndex = Array.from(portfolioItem.parentElement.children).indexOf(portfolioItem);
            // console.log(itemIndex)
            screenshots = portfolioItems[itemIndex].querySelector('.portfolio-item-img img').getAttribute('data-screenshots');
            // console.log(screenshots)
            // convert screenshots into array 
            screenshots = screenshots.split(",");
            // console.log(screenshots)
            if(screenshots.length === 1){
                prevBtn.style.display = "none";
                nextBtn.style.display = "none";
            }else{
                prevBtn.style.display = "block";
                nextBtn.style.display = "block";
            }
            slideIndex = 0;
            popupToggle();
            popupSlideShow();
            popupDetails();
        }
    })

    closeBtn.addEventListener('click',()=>{
        popupToggle();
        if(projectDetailsContainer.classList.contains('active')){
            popupDetailsToggle();
        }
    })

    // popup function
    function popupToggle(){
        popup.classList.toggle('open');
        stopScrollingBody()
    }

    // image slideshow 
    function popupSlideShow(){
        const ImgSrc = screenshots[slideIndex];
        // console.log(ImgSrc)
        const popupImg = popup.querySelector('.popup-img')
        
        // loader until the popup img
        popup.querySelector('.popup-loader').classList.add('active');
        popupImg.src = ImgSrc;
        popupImg.onload = ()=>{
            popup.querySelector('.popup-loader').classList.remove('active');
        }
        // counter 1 of 6 popup
        popup.querySelector('.popup-counter').innerHTML = (slideIndex+1) + " of " + screenshots.length;

    }
    // nextBtn slide
    nextBtn.addEventListener('click', ()=>{
        if(slideIndex === screenshots.length-1){
            slideIndex = 0;
        }else{
            slideIndex ++;
        }
        popupSlideShow();
        // console.log("slideindex" + slideIndex);
    })
    // prev btn 
    prevBtn.addEventListener('click',()=>{
        if(slideIndex === 0){
            slideIndex = screenshots.length-1;
        }else{
            slideIndex--;
        }
        popupSlideShow();
        // console.log("slideindex" + slideIndex);
    })
    // popupdetails btn
    projectDetailsBtn.addEventListener('click',()=>{
        popupDetailsToggle(); 
    })

    function popupDetails(){
        // if portfolio-item-details does not exist 
        if(! portfolioItems[itemIndex].querySelector('.portfolio-item-details')){
            projectDetailsBtn.style.display = "none";
            return;
        }
        projectDetailsBtn.style.display = "block";
        const details = portfolioItems[itemIndex].querySelector('.portfolio-item-details').innerHTML;
        popup.querySelector('.popup-project-details').innerHTML = details;
        const title = portfolioItems[itemIndex].querySelector('.portfolio-item-title').innerHTML;
        // console.log(title);
        popup.querySelector('.popup-title h2').innerHTML = title;
        const category = portfolioItems[itemIndex].getAttribute('data-category');
        // console.log(category);
        popup.querySelector('.popup-project-category').innerHTML = category.split('-').join(' ');
    }
    
    function popupDetailsToggle(){
        // console.log('hi8');
        if(projectDetailsContainer.classList.contains('active')){
            // console.log('true');
            projectDetailsBtn.querySelector("i").classList.remove('fa-minus');
            projectDetailsBtn.querySelector("i").classList.add('fa-plus');
            projectDetailsContainer.classList.remove('active');
            projectDetailsContainer.style.maxHeight = 0 + "px"; 
        }else{
            // console.log('false');
            projectDetailsBtn.querySelector("i").classList.remove('fa-plus');
            projectDetailsBtn.querySelector("i").classList.add('fa-minus');
            projectDetailsContainer.classList.add('active');
            projectDetailsContainer.style.maxHeight = projectDetailsContainer.scrollHeight + "px";  
            popup.scrollTo(0,projectDetailsContainer.offsetTop);
        }
    }
})();
// ======= **** testimonial section ***** =======
(() => {
    const sliderContainer = document.querySelector('.testimonial-slider-container'),
    slides = document.querySelectorAll('.testimonial-item'),
    // console.log(slides);
    slideWidth = sliderContainer.offsetWidth,
    // console.log(slideWidth)
    prevBtn = document.querySelector('.testimonial-slider-nav .prev'),
    nextBtn = document.querySelector('.testimonial-slider-nav .next');
    activeSlide = sliderContainer.querySelector('.testimonial-item.active');

    let slideIndex = Array.from(activeSlide.parentElement.children).indexOf(activeSlide);
    // console.log(slideIndex)

    slides.forEach((slide)=>{
        // console.log(slide)
        slide.style.width = slideWidth + "px";
    })
    sliderContainer.style.width = slideWidth * slides.length + "px";
    nextBtn.addEventListener("click", () => {
        if(slideIndex === slides.length-1){
            slideIndex = 0;
        }else{
            slideIndex++;
        }
        slider()
    });
    prevBtn.addEventListener("click", () => {
        if(slideIndex === 0){
            slideIndex = slides.length-1;
        }else{
            slideIndex--;
        }
        slider()
    });
    function slider(){
        sliderContainer.querySelector('.testimonial-item.active').classList.remove('active');
        slides[slideIndex].classList.add('active');
        sliderContainer.style.marginLeft = - (slideWidth  * slideIndex ) + "px";
    }
    slider();
})();

/* ----------hide all section after active ------------- */
(()=>{
    const sections = document.querySelectorAll('.section');
    sections.forEach((section) =>{
        if(!section.classList.contains('active')){
            section.classList.add('hide');
        }
    })
})()
/* ------------- lodader ---------------- */
window.addEventListener("load",()=>{
    document.querySelector('.loader').classList.add('fade-out');
    setTimeout(()=>{
        document.querySelector('.loader').style.display = "none";
    },600);
})
