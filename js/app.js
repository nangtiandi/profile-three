
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
            slideIndex = 0;
            popupToggle();
            popupSlideShow();
        }
    })

    closeBtn.addEventListener('click',()=>{
        popupToggle();
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

})();

// scrolling body overflow
function stopScrollingBody(){
    document.body.classList.toggle('stop-scrolling');
}