//Js carousel
//Selects all slide elements and nav container
const slides = document.querySelectorAll(".contact__slide");
const contactNav = document.querySelector(".contact__nav");

//convert slides into an array
const buttonSlides = Array.from(slides);

//Function used to create navigation indicators 
const createIndicators = () => {
  //We iterate over each slide
  buttonSlides.forEach((element, index) => {
    //We use this const to create a new button elemnt,
    //we add the corresponding class and append it to the nav container
    const newElement = document.createElement('button');
    newElement.classList.add("contact__indicator");
    contactNav.appendChild(newElement);

    //If it's the first slide, we add contact__current to higilight it and apply style
    if (index === 0) {
      newElement.classList.add("contact__current");
    }

    //We add an event lisener to the buttons
    newElement.addEventListener('click', () => {
      //We call SetActiveSlide function 
      setActiveSlide(index);
    });
  });
}

//function used to set active slide and update button indicators
const setActiveSlide = (index) => {
  const dots = document.querySelectorAll('.contact__indicator');
//We iterate over each slide
  buttonSlides.forEach((element, slideIndex) => {
    if (slideIndex === index) {
      //We add the class to highlight the active slide
      element.classList.add('contact__current');
    } else {
      //we remove the class to non active slides
      element.classList.remove('contact__current');
    }
  });

//We iterate over each indicator button and the logic is the same as the previous code
//Except it is used for the dot navigation
  dots.forEach((dot, dotIndex) => {
    if (dotIndex === index) {
      dot.classList.add('contact__current');
    } else {
      dot.classList.remove('contact__current');
    }
  });

  //We iterate over each slide if the slideIndex matches the index
  //We apply the following style if it is not then we set it to none
  slides.forEach((slide, slideIndex) => {
    if (slideIndex === index) {
      slide.style.display = 'block';
    } else {
      slide.style.display = 'none';
    }
  });
}

createIndicators();


