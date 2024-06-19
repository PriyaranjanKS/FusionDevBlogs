document.addEventListener('DOMContentLoaded', function() {
  const scrollLink = document.querySelector('.hero__button');

  if (scrollLink) {
    scrollLink.addEventListener('click', function(event) {
      event.preventDefault();
      let href = scrollLink.getAttribute('href');
      
      // Log the initial href value for debugging
      console.log('Original Button href:', href);

      // Remove leading '/' and '#'
      if (href.startsWith('/')) {
        href = href.slice(1);  // Remove the leading '/'
      }
      if (href.startsWith('#')) {
        href = href.slice(1);  // Remove the leading '#'
      }

      // Log the modified href value
      console.log('Modified href:', href);

      // Get the target element by the cleaned ID
      const targetElement = document.getElementById(href);

      // Log the target element for debugging
      console.log('Target Element:', targetElement);

      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop,
          behavior: 'smooth'
        });
      } else {
        console.error(`Element with ID '${href}' not found.`);
      }
    });
  }
});
