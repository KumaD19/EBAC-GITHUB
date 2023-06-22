/* Using intersecion obs API"Observe changes in the intersection between an element, conatiner or vieport
we loop over each entry, in entries array,if it is currently intersecting the viewport,
and contains either of the classes mentioned below, add one of the classes below to said entry*/
const obs = new IntersectionObserver((entries)=>{
    entries.forEach((entry)=>{
      console.log(entry)
      if(entry.isIntersecting){
        if(entry.target.classList.contains("about__card")){
          entry.target.classList.add("show-card");
        }
        else if(entry.target.classList.contains("about__img-gallery")){
          entry.target.classList.add("show-img")
         
        }
  
        else if(entry.target.classList.contains("testimonial__box-anim")){
          entry.target.classList.add("show-testimonial")
        }
      }
    });
  });
   /*Each element is passed to observe method,*/
  const hiddenObs = document.querySelectorAll(".about__card,.about__img-gallery,.testimonial__box-anim");
  hiddenObs.forEach((el)=> obs.observe(el));
  //Track gallery, no scroll bar, scrolled within parent container
  const gallery = document.getElementById("gallery"),
        imgGallery = document.querySelector(".about__img-gallery"),
        about =document.querySelector(".about");
  /* Handles, mousedown and touchstart events, we keep track of mouse or touchstart
  x position we then store the value*/
  const handleDown =(event)=>{
    if (event.type === "mousedown") {
      gallery.dataset.mouseDownAt = event.clientX;
    } else if (event.type === "touchstart") {
      gallery.dataset.mouseDownAt = event.touches[0].clientX;
    }
  }      
  //when released set back to 0 
  const handleUp =()=> {
    gallery.dataset.mouseDownAt = "0";
    gallery.dataset.prevPercentage = gallery.dataset.percentage;
  }
  /*updates gallery position,relative to distance dragged or swiped,
   */
  const handleMove =(event) =>{
  
    //if track hasnt been moved return
    if (gallery.dataset.mouseDownAt === "0") return;
  
    let clientX;
    if (event.type === "mousemove") {
      clientX = event.clientX;
    } else if (event.type === "touchmove") {
      clientX = event.touches[0].clientX;
    }
  //subtracts current position from starting point
    const mouseMovement = parseFloat(gallery.dataset.mouseDownAt) - clientX;
    const mouseMax = window.innerWidth / 2;
    // we set value to percentage so we can apply tranform property later on 
    const percentage = (mouseMovement / mouseMax) * -100;
  
    //we take current perentage moved and add it o prev percentage to keep track of gallery movement
    const nextPercentageUnconstrained = parseFloat(gallery.dataset.prevPercentage) + percentage;
    //prevents gallery from scrolling inf
    const nextPercentage = Math.max(Math.min(nextPercentageUnconstrained, 0), -100);
    //animation effect for gallery
    imgGallery.dataset.percentage = nextPercentage;
    gallery.animate(
      {
        transform: `translate(${nextPercentage}%, 0%)`
      },
      { duration: 1200, fill: "forwards" }
    );
  
    const images = gallery.getElementsByClassName("about__img");
    for (const image of images) {
      image.animate(
        {
          objectPosition: `${100 + nextPercentage}% center`
        },
        { duration: 1200, fill: "forwards" }
      );
    }
  }
  
  //event listeners
  about.addEventListener("mousedown", handleDown);
  about.addEventListener("touchstart", handleDown);
  imgGallery.addEventListener("mouseup", handleUp);
  imgGallery.addEventListener("touchend", handleUp);
  imgGallery.addEventListener("mousemove", handleMove);
  imgGallery.addEventListener("touchmove", handleMove);