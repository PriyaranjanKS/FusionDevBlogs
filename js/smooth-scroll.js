document.addEventListener('DOMContentLoaded', function() {
  const scrollLink = document.querySelector('.hero__button');

  if (scrollLink) {
    scrollLink.addEventListener('click', function(event) {
      event.preventDefault();
      const href = scrollLink.getAttribute('href');  // Fetch href attribute
      if (href && href.startsWith('#')) {  // Check if href starts with '#'
        const targetId = href.substring(1);  // Remove the '#'
        const targetElement = document.getElementById(targetId);  // Get the element by ID

        if (targetElement) {
          window.scrollTo({
            top: targetElement.offsetTop,
            behavior: 'smooth'
          });
        } else {
          console.error(`Element with ID '${targetId}' not found.`);
        }
      } else {
        console.error('Href attribute is not valid or does not start with #');
      }
    });
  }
});
