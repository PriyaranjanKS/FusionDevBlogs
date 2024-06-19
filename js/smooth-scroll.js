document.addEventListener('DOMContentLoaded', function() {
  const scrollLink = document.querySelector('.hero__button');

  if (scrollLink) {
    scrollLink.addEventListener('click', function(event) {
      event.preventDefault();
      let href = scrollLink.getAttribute('href');
      
      // Log the initial href value for debugging
      console.log('Original Button href:', href);

    if (href.startsWith('/')) {
        href = href.slice(1);  // Remove the leading '/'
      }
      if (href.startsWith('#')) {
        href = href.slice(1);  // Remove the leading '#'
      }

      // Log the modified href value after removing backslashes
      console.log('Modified href after removing backslashes:', href);

      // Check if href starts with '#'
      if (href.startsWith('#')) {
        const targetId = href.substring(1);  // Remove the leading '#'
        
        // Log the target ID for debugging
        console.log('Target ID:', targetId);

        // Fetch the target element by ID
        const targetElement = document.getElementById(targetId);
        
        // Log the target element for debugging
        console.log('Target Element:', targetElement);

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
