document.addEventListener('DOMContentLoaded', function() {
  const scrollLink = document.querySelector('.hero__button');
  const additionalContent = document.getElementById('additionalContent');

  if (scrollLink) {	  
    scrollLink.addEventListener('click', function(event) {
      event.preventDefault();
 
      // Toggle the visibility of additional content
      if (additionalContent) {
        additionalContent.classList.toggle('expanded');

        // Toggle button text
        if (additionalContent.classList.contains('expanded')) {
          scrollLink.innerHTML = '<span class="hero__button__arrow"><i class="ion ion-ios-arrow-forward"></i></span> Read Less';
        } else {
          scrollLink.innerHTML = '<span class="hero__button__arrow"><i class="ion ion-ios-arrow-forward"></i></span> Read More';
        }
      }

      // Smooth scroll to the target element
      if (additionalContent.classList.contains('expanded')) {
        smoothScrollTo(additionalContent, 800);
      }
    });
  }
});

// Function to handle smooth scrolling with a slight jerk effect
function smoothScrollTo(element, duration) {
  const elementTop = element.getBoundingClientRect().top + window.scrollY;
  const start = window.scrollY;
  const distance = elementTop - start;
  let startTime = null;

  function animation(currentTime) {
    if (startTime === null) startTime = currentTime;
    const timeElapsed = currentTime - startTime;
    const run = easeOutQuad(timeElapsed, start, distance, duration);
    window.scrollTo(0, run);
    if (timeElapsed < duration) requestAnimationFrame(animation);
  }

  function easeOutQuad(t, b, c, d) {
    t /= d;
    t--;
    return -c * (t * t * t + 1) + b;
  }

  requestAnimationFrame(animation);
}
