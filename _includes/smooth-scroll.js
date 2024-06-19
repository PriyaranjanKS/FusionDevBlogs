// _includes/smooth-scroll.js

document.addEventListener('DOMContentLoaded', function() {
  const scrollLink = document.querySelector('.hero__button');

  if (scrollLink) {
    scrollLink.addEventListener('click', function(event) {
      event.preventDefault();
      const targetId = scrollLink.getAttribute('href').substring(1);
      const targetElement = document.getElementById(targetId);
      
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop,
          behavior: 'smooth'
        });
      }
    });
  }
});
