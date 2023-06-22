const navMenu = document.querySelector("nav"),
      navButton = document.querySelector(".nav__desktop ion-icon"),
      navItems = document.querySelector(".navItems");


/*Adds mobile menu when menu is toggled for mobile if not toggled delete it from the innerHtml*/      
navButton.addEventListener("click", () => {
    navMenu.classList.toggle("nav__menu");
    if (navMenu.classList.contains("nav__menu")) {
        navItems.innerHTML += `
        <section class="navItems">
            <ul>
              <li><ion-icon name="trail-sign-outline"></ion-icon><a href="#">How It Works</a></li>
              <li><ion-icon name="bag-handle-outline"></ion-icon><a href="#">Buy</a></li>
              <li><ion-icon name="chatbubbles-outline"></ion-icon><a href="#">Contact Us</a></li>
            </ul>
        </section>
        `;
    }
    else {
    navItems.innerHTML = "";
    }
});
/*When window reaches, certain width remove classes that are used for mobile "shorter width" */
window.addEventListener("resize", () => {
    if (window.innerWidth >= 758 && navMenu.classList.contains("nav__menu")) {
      navItems.innerHTML = "";
      navMenu.classList.remove("nav__menu")
    }
  
    const footer = document.querySelector(".footer__button")
    if (window.innerWidth >=774.88){
      footer.classList.remove("footer__button-toggle")
    }
  
  });
  /*Targets all elements with .footer__button class, let's us toggle class footer__show
  with an event listener. Functionality: Expands height from 0-100 creating an accordion*/
  const footer = document.querySelectorAll(".footer__button")
  footer.forEach((ele) =>{
    ele.addEventListener("click", () =>{
      const footerShow =ele.querySelector(".footer__button ul")
      footerShow.classList.toggle("footer__button-toggle")
    });
  });
