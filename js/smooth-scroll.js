document.addEventListener('DOMContentLoaded', function() {
  const scrollLink = document.querySelector('.hero__button');

  if (scrollLink) {
    scrollLink.addEventListener('click', function(event) {
      event.preventDefault();
      let href = scrollLink.getAttribute('href');
      console.log('Button href:', href);  // Debug: Log the href value

      // Remove backslash if present and check if href starts with '#'
      href = href.replace(/\\/g, '');
      if (href && href.startsWith('#')) {
        const targetId = href.substring(1);
        console.log('Target ID:', targetId);  // Debug: Log the target ID

        const targetElement = document.getElementById(targetId);
        console.log('Target Element:', targetElement);  // Debug: Log the found target element

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
