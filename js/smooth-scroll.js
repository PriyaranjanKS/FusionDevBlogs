document.addEventListener('DOMContentLoaded', function() {
  const scrollLink = document.querySelector('.hero__button');

  if (scrollLink) {
    scrollLink.addEventListener('click', function(event) {
      event.preventDefault();
      const href = scrollLink.getAttribute('href');
      if (href && href.startsWith('#')) {
        const targetId = href.substring(1);
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
          window.scrollTo({
            top: targetElement.offsetTop,
            behavior: 'smooth'
          });
        }
      }
    });
  }
});
